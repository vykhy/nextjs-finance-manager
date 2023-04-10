import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

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
    const result: MysqlInsert = await db.query(
      `INSERT INTO transaction (account_id, category_id, transaction_type_id, item, amount, description, payment_method_id, project_id, user_id, balance, date)
VALUES 
    (?, ?, ?, ?, ?, ? ,?,?,
      (SELECT user_id FROM project WHERE id =  ?),
      (SELECT balance FROM account WHERE id = ?) - ?,
    ?);`,
      [
        accountId,
        categoryId,
        transactionTypeId,
        item,
        amount,
        description,
        paymentMethodId,
        projectId,
        projectId,
        accountId,
        amount,
        date,
      ]
    );
    console.log(result);
    if (!result.insertId) {
      await db.end();
      return res.status(500).json({ error: "Failed to add transaction" });
    }
    const transaction: Array<any> = await db.query(
      `SELECT A.id, A.amount, A.item, A.description, B.name as category, C.name as transactiontype, D.name as account, E.name as paymentmethod, F.name as project, G.name as user
      FROM transaction A
      INNER JOIN category B on B.id=A.category_id
      INNER JOIN transaction_type C on C.id=A.transaction_type_id
      INNER JOIN account D on D.id=A.account_id
      INNER JOIN payment_method E on E.id=A.payment_method_id
      INNER JOIN project F ON F.id=A.project_id
      INNER JOIN user G ON G.id = A.user_id
      WHERE A.id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: transaction[0] });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
