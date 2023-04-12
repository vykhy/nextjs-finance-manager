import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import format from "date-fns/format";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: projectId } = req.query;
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
      await db.query(`DELETE FROM transaction WHERE id = ?`, [result.insertId]);
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
}
