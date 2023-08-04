import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import format from "date-fns/format";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { transacId: transactionId } = req.query;
    try {
      const [result]: Array<any> = await db.query(
        "SELECT * FROM transaction WHERE id = ?",
        [transactionId]
      );
      await db.query("UPDATE account SET balance -= ? WHERE id = ?", [
        result[0].amount,
        result[0].account_id,
      ]);
      await db.query(
        "UPDATE transaction SET balance -= ? WHERE account_id = ?",
        [result[0].amount, result[0].account_id]
      );
      return res.status(200).send("Success");
    } catch (error) {
      console.log(error);
      return res.status(500).send("error");
    }
  }
}
