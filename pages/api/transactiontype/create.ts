import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: MysqlInsert = await db.query(
      " INSERT INTO transactiontypes (`type`) VALUES (? )",
      [req.body.type]
    );
    if (!result.insertId) {
      await db.end();
      return res
        .status(500)
        .json({ error: "Failed to create transaction type" });
    }
    const type: Array<any> = await db.query(
      `SELECT id, type FROM transactiontypes WHERE id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: type[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
