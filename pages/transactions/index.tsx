import Layout from "@/components/Layout";
import Transaction from "@/components/Transaction";
import { useProjectContext } from "@/context/ProjectContext";
import useTransactions from "@/hooks/useTransactions";
import TransactionService from "@/services/TransactionService";
import {
  Box,
  Card,
  CardContent,
  List,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { subDays } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import React, { useMemo, useState } from "react";
import Chart from "react-google-charts";

function Transactions() {
  const [startDate, setStartDate] = useState<Dayjs | null | undefined>(
    dayjs(subDays(new Date(), 30))
  );
  const [endDate, setEndDate] = useState<Dayjs | null | undefined>(
    dayjs(new Date())
  );
  const [search, setSearch] = useState<string>("");
  const { selectedProject } = useProjectContext();
  const { transactions, triggerRefetch: fetchTransactions } = useTransactions(
    selectedProject,
    startDate,
    endDate,
    search
  );
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
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography sx={{ p: 1 }} color={"black"} variant="h4">
          Transactions
        </Typography>
        <Box style={{ width: "100%", paddingLeft: "10%", paddingRight: "10%" }}>
          <TextField
            fullWidth
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            aligntItems: "center",
            mb: 2,
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
          <Card sx={{ backgroundColor: "red" }}>
            <CardContent>
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
                {totalExpense.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "inr",
                })}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: "green" }}>
            <CardContent>
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
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
            height={"350px"}
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
            height={"350px"}
          />
        </Box>
        {transactions.length ? (
          <List
            style={{
              border: "1px solid gray",
              borderRadius: "15px",
            }}
          >
            {transactions?.map((transaction: any) => (
              <Transaction
                fetchTransactions={fetchTransactions}
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </List>
        ) : (
          <>
            {new Array(10).fill(1).map((num, idx) => (
              <Box sx={{ width: "90%", marginLeft: "5%" }} key={idx}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Skeleton
                    sx={{ mr: 2 }}
                    variant="circular"
                    height={40}
                    width={40}
                  />
                  <Box width={"100%"}>
                    <Skeleton variant="text" height={30} width={"40%"} />
                    <Skeleton
                      sx={{
                        mb: 2,
                      }}
                      variant="rounded"
                      animation="wave"
                      height={60}
                      width={"100%"}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Layout>
  );
}

export default Transactions;
