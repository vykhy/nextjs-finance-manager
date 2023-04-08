import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, balance, projectId } = req.body;
  try {
    const result: MysqlInsert = await db.query(
      " INSERT INTO account (`name`, `balance`, `project_id`) VALUES (?, ?, ? )",
      [name, Number(balance).toFixed(2), projectId]
    );
    if (!result.insertId) {
      await db.end();
      return res.status(500).json({ error: "Failed to create category" });
    }
    const account: Array<any> = await db.query(
      `SELECT id, name, balance, project_id FROM account WHERE id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: account[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
