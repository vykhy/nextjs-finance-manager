import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import format from "date-fns/format";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      accountId,
      transactionTypeId,
      item,
      amount,
      categoryId,
      paymentMethodId,
      description,
      date,
    } = req.body;
    try {
      const [result]: any = await db.query(
        ` INSERT INTO transaction (account_id, category_id, transaction_type_id, item, amount, description, 
        payment_method_id, balance, date)
        VALUES 
        (?, ?, ?, ?, ?, ? ,?,
          (SELECT balance FROM account WHERE id = ?) + ?,
        ?);`,
        [
          accountId,
          categoryId,
          transactionTypeId,
          item,
          amount,
          description,
          paymentMethodId,
          accountId,
          amount,
          format(new Date(date), "yyyy-MM-dd HH:mm:ss"),
        ]
      );
      if (!result.insertId) {
        return res.status(500).json({ error: "Failed to add transaction" });
      }
      const [account]: any = await db.query(
        `UPDATE account SET balance = balance + ? WHERE id = ? ;`,
        [amount, accountId]
      );
      if (account.changedRows <= 0) {
        await db.query(`DELETE FROM transaction WHERE id = ?`, [
          result.insertId,
        ]);
        return res.status(500).json({ error: "Failed to add transaction" });
      }
      const [transactions]: Array<any> = await db.query(
        `SELECT A.id, A.amount, A.item, A.description, B.name as category, C.name as transactiontype, D.name as account, D.balance as accountbalance, E.name as paymentmethod, F.name as project, G.name as user
      FROM transaction A
      INNER JOIN category B on B.id=A.category_id
      INNER JOIN transaction_type C on C.id=A.transaction_type_id
      INNER JOIN account D on D.id=A.account_id
      INNER JOIN payment_method E on E.id=A.payment_method_id
      INNER JOIN project F ON F.id=D.project_id
      INNER JOIN user G ON G.id = F.user_id
      WHERE A.id = ${result.insertId}`
      );
      res.json({ data: transactions[0] });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const { id: projectId } = req.query;
    const startDate = req.query.startDate as string | number;
    const endDate = req.query.endDate as string | number;
    const search = (req.query.search || "") as string;
    try {
      if (startDate != "undefined") {
        const [transactions]: Array<any> = await db.query(
          `SELECT 
            B.id, B.date, B.amount, B.item, B.description, C.name as category,
              D.name as transactiontype, A.name as account, B.balance as accountbalance, 
              E.name as paymentmethod, F.name as project, G.name as user
        FROM 
          account A
          INNER JOIN transaction B ON B.account_id=A.id
          LEFT JOIN category C ON C.id = B.category_id
          LEFT JOIN transaction_type D ON D.id = B.transaction_type_id
          LEFT JOIN payment_method E ON E.id = B.payment_method_id
          INNER JOIN project F ON F.id = A.project_id
          INNER JOIN user G on G.id = F.user_id
        WHERE 
          A.project_id = ?
          AND DATE(B.date) BETWEEN ? AND ? 
          AND CONCAT(B.id, B.amount, B.item, B.description, COALESCE(C.name, "")) LIKE CONCAT('%', ?, '%')
          ORDER BY B.date DESC;
        ;
      `,
          [
            projectId,
            format(new Date(startDate), "yyyy-MM-dd"),
            format(new Date(endDate), "yyyy-MM-dd"),
            search,
          ]
        );
        return res.json({ data: transactions });
      } else {
        // summary only -> no search or date range filter
        const [transactions]: Array<any> = await db.query(
          `SELECT
             B.id, B.date, B.amount, B.item, B.amount, B.description, C.name as category,
              D.name as transactiontype, A.name as account, B.balance as accountbalance,
              E.name as paymentmethod, F.name as project, G.name as user
            FROM 
              account A
              INNER JOIN transaction B ON B.account_id=A.id
              LEFT JOIN category C ON C.id = B.category_id
              LEFT JOIN transaction_type D ON D.id = B.transaction_type_id
              LEFT JOIN payment_method E ON E.id = B.payment_method_id
              INNER JOIN project F ON F.id = A.project_id
              INNER JOIN user G on G.id = F.user_id
            WHERE
              A.project_id = ?
              ORDER BY B.date DESC LIMIT 30;
      `,
          [projectId]
        );
        return res.json({ data: transactions });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
