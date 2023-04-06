import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import IProject from "@/interfaces/IProject";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }
    const projects: Array<any> = await db.query(
      `SELECT user_id, name, description FROM project WHERE id = ${user_id}`
    );
    await db.end();
    res.json({ data: projects as Array<IProject> });
  } else {
    res.status(405).end();
  }
}
