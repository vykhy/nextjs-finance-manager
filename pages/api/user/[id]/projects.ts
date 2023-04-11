import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";

interface Project {
  id: number;
  user_id: number;
  name: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const [response] = await db.query(
      "SELECT * FROM project WHERE user_id = ?",
      [id]
    );
    const projects = response as Project[];
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
