import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import MysqlInsert from "@/interfaces/MysqlInsert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = req.query.id;
  const { name } = req.body;
  try {
    const [result]: any = await db.query(
      " INSERT INTO category (`name`, `project_id`) VALUES (?,?)",
      [name, projectId]
    );
    if (!result.insertId) {
      return res.status(500).json({ error: "Failed to create category" });
    }
    const [type]: Array<any> = await db.query(
      `SELECT id, name, project_id FROM category WHERE id = ${result.insertId}`
    );
    res.json({ data: type[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
