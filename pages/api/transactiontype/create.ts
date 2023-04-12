import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [result]: any = await db.query(
      " INSERT INTO transaction_type (`name`, is_negative) VALUES (?, ? )",
      [req.body.name, req.body.isNegative || false]
    );
    if (!result.insertId) {
      return res
        .status(500)
        .json({ error: "Failed to create transaction type" });
    }
    const [type]: Array<any> = await db.query(
      `SELECT id, name, is_negative FROM transaction_type WHERE id = ${result.insertId}`
    );
    res.json({ data: type[0] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
