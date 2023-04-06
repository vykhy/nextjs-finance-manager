import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";
import IUser from "@/interfaces/IUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  try {
    const result: MysqlInsert = await db.query(
      " INSERT INTO user (`name`, `email`, `password`) VALUES (? ,? , ?)",
      [name, email, password]
    );
    if (!result.insertId) {
      await db.end();
      return res.status(500).json({ error: "Failed to create user" });
    }
    const user: Array<any> = await db.query(
      `SELECT id, name, email FROM user WHERE id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: user[0] as IUser });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
