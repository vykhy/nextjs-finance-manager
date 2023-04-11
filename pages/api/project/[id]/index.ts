import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import IProject from "@/interfaces/IProject";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "project_id is required" });
    }
    const [project]: Array<any> = await db.query(
      `SELECT user_id, name, description FROM project WHERE id = ?`,
      [id]
    );
    res.json({ data: project[0] as IProject });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
