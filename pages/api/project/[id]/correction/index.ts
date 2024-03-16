import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import { format } from "date-fns";

type CorrectionRequestData = {
  accountId: number;
  endBalance: number;
  date: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id: projectId } = req.query;
    const { accountId, endBalance, date }: CorrectionRequestData = req.body;

    // Validate input
    if (!accountId || !endBalance || !date) {
      return res.status(400).json({ message: "Missing input fields" });
    }

    try {
      // Update transaction table with correction entry
      const [transactionResult]: any = await db.query(
        `INSERT INTO transaction ( account_id, item, amount, balance, description, date)
      VALUES ( ?, 'CORRECTION', (SELECT (? - balance) FROM account WHERE id = ? ), ?,
        'Balance correction', ?);`,
        [
          accountId,
          endBalance,
          accountId,
          endBalance,
          format(new Date(date), "yyyy-MM-dd HH:mm:ss"),
        ]
      );
      if (!transactionResult.insertId) {
        return res.status(500).json({ message: "Failed to add correction" });
      }
      // Update account balance
      const [accountResult]: any = await db.query(
        `UPDATE account SET balance = ? WHERE id = ?`,
        [endBalance, accountId]
      );
      if (accountResult.changedRows <= 0) {
        await db.query(`DELETE FROM transaction WHERE id = ?`, [
          transactionResult.insertId,
        ]);
        return res.status(500).json({ message: "Failed to update account" });
      }

      return res.status(200).json({
        message: `Balance for account with ID ${accountId} has been corrected to ${endBalance}`,
        data: { accountId, balance: endBalance },
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}
