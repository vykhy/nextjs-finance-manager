import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: MysqlInsert = await db.query(
      " INSERT INTO payment_method (`name`, `user_id`) VALUES (?, ? )",
      [req.body.name, req.body.userId]
    );
    if (!result.insertId) {
      await db.end();
      return res
        .status(500)
        .json({ error: "Failed to create transaction type" });
    }
    const type: Array<any> = await db.query(
      `SELECT id, name, user_id FROM payment_method WHERE id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: type[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
