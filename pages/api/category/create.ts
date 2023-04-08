import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, userId, projectId } = req.body;
  try {
    const result: MysqlInsert = await db.query(
      " INSERT INTO category (`name`, `user_id`, `project_id`) VALUES (?, ?, ?)",
      [name, userId, projectId]
    );
    if (!result.insertId) {
      await db.end();
      return res.status(500).json({ error: "Failed to create category" });
    }
    const type: Array<any> = await db.query(
      `SELECT id, name, user_id, project_id FROM category WHERE id = ${result.insertId}`
    );
    await db.end();
    res.json({ data: type[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
