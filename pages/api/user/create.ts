import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result: MysqlInsert = await db.query(
      " INSERT INTO users (`name`, `email`, `password`) VALUES (? ,? , ?)",
      [req.body.name, req.body.email, req.body.password]
    );
    if (!result.insertId) {
      await db.end();
      return res.status(500).json({ error: "Failed to create user" });
    }
    const user: Array<any> = await db.query(
      `SELECT id, name, email FROM users WHERE id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: user[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
