import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";
import IAccount from "@/interfaces/IAccount";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const accounts: Array<IAccount> = await db.query(
      `SELECT * FROM account WHERE userid=?`,
      [req.body.userId]
    );
    await db.end();
    res.json({ data: accounts });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
