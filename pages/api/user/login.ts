import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [result]: Array<any> = await db.execute(
      "SELECT * FROM user WHERE email=?",
      [req.body.email]
    );
    if (!result[0]) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }
    if (result[0].password !== req.body.password) {
      return res.status(400).json({ message: "Wrong password" });
    }
    res.json({
      data: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        created_at: result[0].created_at,
        modified_at: result[0].modified_at,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}
