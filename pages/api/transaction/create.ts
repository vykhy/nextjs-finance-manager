import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: MysqlInsert = await db.query(
      "INSERT INTO transaction (`item`, `categoryid`, `amount`, `paymentmethodid`, `typeid`, `accountid`) VALUES (? ,? , ?, ?, ?, ?)",
      [
        req.body.item,
        req.body.categoryId,
        Number(req.body.amount).toFixed(2),
        req.body.paymentMethodId,
        req.body.typeId,
        req.body.accountId,
      ]
    );
    if (!result.insertId) {
      await db.end();
      return res.status(500).json({ error: "Failed to add transaction" });
    }
    const user: Array<any> = await db.query(
      `SELECT A.id, A.amount, A.item, B.name as category, C.type as transactiontype, D.name as account, E.name as paymentmethod
      FROM transaction A
      INNER JOIN category B on B.id=A.categoryid
      INNER JOIN transactiontypes C on C.id=A.typeid
      INNER JOIN account D on D.id=A.accountid
      INNER JOIN paymentmethod E on E.id=A.paymentmethodid
      WHERE A.id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: user[0] });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
