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
    const result: Array<any> = await db.query(
      " INSERT INTO user (`name`, `email`, `password`) VALUES (? ,? , ?)",
      [name, email, password]
    );
    console.log(result[0]);
    if (!result[0]?.insertId) {
      return res.status(500).json({ error: "Failed to create user" });
    }
    const [user]: Array<any> = await db.query(
      `SELECT id, name, email FROM user WHERE id = ${result[0].insertId}`
    );
    res.json({ data: user[0] as IUser });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
