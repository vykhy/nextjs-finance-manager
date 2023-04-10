import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import IProject from "@/interfaces/IProject";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id: projectId } = req.query;
    const entities: Array<any> = await db.query(
      `SELECT
    (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', id, 'name', name)), ']') FROM transaction_type) AS transaction_types,
    (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', id, 'name', name)), ']') FROM category WHERE project_id = ?) AS categories,
    (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', id, 'name', name)), ']') FROM payment_method WHERE user_id = (SELECT user_id FROM project WHERE id = ?)) AS payment_methods,
    (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', id, 'name', name)), ']') FROM account WHERE project_id = ?) AS accounts;`,
      [projectId, projectId, projectId, projectId]
    );
    await db.end();
    res.json({ data: entities[0] });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
