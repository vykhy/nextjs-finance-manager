import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userid = req.body.userId;
    const categories = await db.query(
      "SELECT * FROM category WHERE userid = ?",
      [userid]
    );
    const accounts = await db.query("SELECT * FROM account WHERE userid = ?", [
      userid,
    ]);
    const paymentmethods = await db.query(
      "SELECT * FROM paymentmethod WHERE userid = ?",
      [userid]
    );
    const transactiontypes = await db.query("SELECT * FROM transactiontypes");
    return res.json({
      data: {
        categories,
        accounts,
        paymentmethods,
        transactiontypes,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
