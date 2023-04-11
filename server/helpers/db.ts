import mysql from "mysql2/promise";

const db = async () => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  return connection;
};

const conn = await db();

export default conn;
