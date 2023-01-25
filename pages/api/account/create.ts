import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: MysqlInsert = await db.query(
      " INSERT INTO account (`name`, `balance`, `userid`) VALUES (?, ?, ? )",
      [req.body.name, Number(req.body.balance).toFixed(2), req.body.userId]
    );
    if (!result.insertId) {
      await db.end();
      return res.status(500).json({ error: "Failed to create category" });
    }
    const type: Array<any> = await db.query(
      `SELECT id, name, balance, userid FROM account WHERE id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: type[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
