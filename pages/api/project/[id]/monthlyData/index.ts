import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/server/helpers/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id: projectId } = req.query;
    const [data]: Array<any> = await db.query(
      `
       SELECT * FROM
        (
            SELECT 
                SUM(CASE WHEN A.amount > 0 THEN A.amount ELSE 0 END) as inflow, 
                SUM(CASE WHEN A.amount < 0 THEN (A.amount * -1) ELSE 0 END) as outflow, 
                DATE_FORMAT(A.date, '%Y-%m') as month
            FROM 
                transaction A
                INNER JOIN account B ON A.account_id = B.id 
            WHERE 
                B.project_id = ? AND 
                A.item != 'TRANSFER'
            GROUP BY 
                DATE_FORMAT(A.date, '%Y-%m')
            ORDER BY 
                DATE_FORMAT(A.date, '%Y-%m') DESC
            LIMIT 12
          ) AS B
          ORDER BY B.month ASC;
        `,
      [projectId]
    );
    res.json({ data: data });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
