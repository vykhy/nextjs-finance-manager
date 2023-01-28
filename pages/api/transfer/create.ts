import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: MysqlInsert = await db.query(
      `INSERT INTO transfer (item, amount, toaccountid, fromaccountid) 
      VALUES (?,?,?,? )`,
      [
        req.body.item,
        Number(req.body.amount).toFixed(2),
        req.body.toAccountId,
        req.body.fromAccountId,
      ]
    );
    if (!result.insertId) {
      await db.end();
      return res.status(500).json({ error: "Failed to transfer" });
    }
    const type: Array<any> = await db.query(
      `SELECT * FROM transfer WHERE id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: type[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
