import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import IProject from "@/interfaces/IProject";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user_id, name, description } = req.body as IProject;
    const [result]: any = await db.query(
      "INSERT INTO project (user_id, name, description) VALUES (?, ?, ?)",
      [user_id, name, description]
    );
    if (!result?.insertId) {
      return res.status(500).json({ error: "Failed to create project" });
    }
    const [project]: Array<any> = await db.query(
      `SELECT user_id, name, description FROM project WHERE id = ${result.insertId}`
    );
    res.json({ data: project[0] as IProject });
  } else {
    res.status(405).end();
  }
}
