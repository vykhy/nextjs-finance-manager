import Layout from "@/components/Layout";
import Transaction from "@/components/Transaction";
import { useProjectContext } from "@/context/ProjectContext";
import useTransactions from "@/hooks/useTransactions";
import TransactionService from "@/services/TransactionService";
import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { subDays } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import Chart from "react-google-charts";

function Transactions() {
  const [startDate, setStartDate] = useState<Dayjs | null | undefined>(
    dayjs(subDays(new Date(), 30))
  );
  const [endDate, setEndDate] = useState<Dayjs | null | undefined>(
    dayjs(new Date())
  );
  const { selectedProject } = useProjectContext();
  const { transactions } = useTransactions(selectedProject, startDate, endDate);
  const transactionService = new TransactionService(transactions);
  const [incomes, expenses] = transactionService.getCategoryData();
  const totalExpense: number = useMemo(() => {
    return transactions?.reduce(
      (total: number, transaction: any) =>
        (total +=
          transaction.amount < 0
            ? transaction.transactiontype &&
              transaction.transactiontype.toLowerCase() !== "correction" &&
              transaction.transactiontype.toLowerCase() !== "transfer"
              ? Number(transaction.amount)
              : 0
            : 0),
      Number(0)
    );
  }, [transactions]);
  const totalIncome: number = useMemo(() => {
    return transactions?.reduce(
      (total: number, transaction: any) =>
        (total +=
          transaction.amount > 0
            ? transaction.transactiontype &&
              transaction.transactiontype.toLowerCase() !== "correction" &&
              transaction.transactiontype.toLowerCase() !== "transfer"
              ? Number(transaction.amount)
              : 0
            : 0),
      Number(0)
    );
  }, [transactions]);
  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >
        <Typography color={"black"} variant="h4">
          Transactions
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            aligntItems: "center",
          }}
        >
          <Box>
            <Typography>Date: </Typography>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </Box>
          <Box>
            <Typography>Date: </Typography>
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            aligntItems: "center",
          }}
        >
          <Card>
            <CardContent>
              <Typography>Expenses</Typography>
              <Typography>
                {totalExpense.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "inr",
                })}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography>Income</Typography>
              <Typography>
                {totalIncome.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "inr",
                })}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box style={{ display: "flex", flexWrap: "wrap" }}>
          <Chart
            chartType="PieChart"
            data={
              incomes
                ? [
                    ["Category", "Amount"],
                    ...incomes.map((item) => [
                      item.category,
                      Math.abs(item.amount),
                    ]),
                  ]
                : ["Category", "Amount"]
            }
            options={{
              title: "Income Categories",
            }}
            width={"400px"}
            height={"400px"}
          />
          <Chart
            chartType="PieChart"
            data={
              expenses
                ? [
                    ["Category", "Amount"],
                    ...expenses.map((item) => [
                      item.category,
                      Math.abs(item.amount),
                    ]),
                  ]
                : ["Category", "Amount"]
            }
            options={{
              title: "Expense Categories",
            }}
            width={"400px"}
            height={"400px"}
          />
        </Box>
        <List
          style={{
            border: "1px solid gray",
            borderRadius: "15px",
          }}
        >
          {transactions?.map((transaction: any) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </List>
      </Box>
    </Layout>
  );
}

export default Transactions;
