import { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";
import format from "date-fns/format";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fromAccountId, toAccountId, description, date } = req.body;
  let amount = req.body.amount;
  amount = Number(amount).toFixed(2);

  try {
    // Check sender's account balance
    const [senderAccount]: any = await db.query(
      "SELECT balance FROM account WHERE id = ?",
      [fromAccountId]
    );
    console.log(senderAccount[0], amount, senderAccount[0].balance < amount);
    if (Number(senderAccount[0].balance) < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    await db.beginTransaction();

    // Insert into transfer table
    const [transferResult]: any = await db.query(
      `INSERT INTO transfer (from_account_id, to_account_id, amount, description, date)
      VALUES (?, ?, ?, ?, ?);`,
      [
        fromAccountId,
        toAccountId,
        amount,
        description,
        format(new Date(date), "yyyy-MM-dd HH:mm:ss"),
      ]
    );
    if (!transferResult.insertId) {
      await db.rollback();
      return res.status(500).json({ message: "Failed to add transfer" });
    }

    // Add transaction entries for both accounts
    const [senderTransaction]: any = await db.query(
      `INSERT INTO transaction ( account_id, amount, item, description, date, balance)
      VALUES(
         ?, ?, ?, ?, ?,
        ( SELECT balance - ? FROM account WHERE id = ?))`,
      [
        fromAccountId,
        amount * -1,
        "TRANSFER",
        description,
        format(new Date(date), "yyyy-MM-dd HH:mm:ss"),
        amount,
        fromAccountId,
      ]
    );
    if (!senderTransaction.insertId) {
      await db.rollback();
      await db.query(`DELETE FROM transfer WHERE id = ?`, [
        transferResult.insertId,
      ]);
    }
    // Add transaction entries for both accounts
    const [receiverTransaction]: any = await db.query(
      `INSERT INTO transaction (account_id, amount, item, description, date, balance)
      VALUES(
         ?, ?, ?, ?, ?,
         (SELECT balance + ? FROM account WHERE id = ?))`,
      [
        toAccountId,
        amount,
        "TRANSFER",
        description,
        format(new Date(date), "yyyy-MM-dd HH:mm:ss"),
        amount,
        toAccountId,
      ]
    );
    if (!receiverTransaction.insertId) {
      await db.rollback();
      await db.query(`DELETE FROM transaction WHERE id = ?`, [
        senderTransaction.insertId,
      ]);
      await db.query(`DELETE FROM transfer WHERE id = ?`, [
        transferResult.insertId,
      ]);
    }

    // Update sender account
    const [senderAccountResult]: any = await db.query(
      `UPDATE account SET balance = balance - ? WHERE id = ?;`,
      [amount, fromAccountId]
    );
    if (senderAccountResult.changedRows <= 0) {
      await db.rollback();
      await db.query(`DELETE FROM transaction WHERE id IN (?, ?)`, [
        senderTransaction.insertId,
        receiverTransaction.insertId,
      ]);
      await db.query(`DELETE FROM transfer WHERE id = ?`, [
        transferResult.insertId,
      ]);
      return res
        .status(500)
        .json({ message: "Failed to update sender account" });
    }

    // Update receiver account
    const [receiverAccountResult]: any = await db.query(
      `UPDATE account SET balance = balance + ? WHERE id = ?;`,
      [amount, toAccountId]
    );
    if (receiverAccountResult.changedRows <= 0) {
      await db.rollback();
      await db.query(`DELETE FROM transaction WHERE id IN (?, ?)`, [
        senderTransaction.insertId,
        receiverTransaction.insertId,
      ]);
      await db.query(`DELETE FROM transfer WHERE id = ?`, [
        transferResult.insertId,
      ]);
      await db.query(`UPDATE account SET balance = balance + ? WHERE id = ?`, [
        amount,
        fromAccountId,
      ]);
      return res
        .status(500)
        .json({ message: "Failed to update receiver account" });
    }

    await db.commit();

    // Return the transfer record
    const [transfers]: Array<any> = await db.query(
      `SELECT A.id, A.amount, A.description, A.date, B.name as sender_account, C.name as receiver_account
      FROM transfer A
      INNER JOIN account B on B.id=A.from_account_id
      INNER JOIN account C on C.id=A.to_account_id
      WHERE A.id = ${transferResult.insertId}`
    );
    res.json({ data: transfers[0] });
  } catch (error: any) {
    console.log(error.message);
    await db.rollback();
    return res.status(500).json({ message: error.message });
  }
}
