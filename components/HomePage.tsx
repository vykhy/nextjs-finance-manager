import { useProjectContext } from "@/context/ProjectContext";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import useTransactions from "@/hooks/useTransactions";
import Accounts from "./Accounts";
import TransactionButtons from "./AddTransactionsSection";
import Transaction from "./Transaction";
import TransactionService from "./../services/TransactionService";
import Chart from "react-google-charts";

const HomePage = () => {
  const { user } = useAuthContext();
  const { selectedProject } = useProjectContext();
  const { transactions } = useTransactions(selectedProject);
  const transactionService = new TransactionService(transactions);
  const [incomes, expenses] = transactionService.getCategoryData();

  return (
    <Box style={{ backgroundColor: "white", color: "black" }} p={1}>
      <Typography variant="h4" fontWeight={"bold"}>
        {" "}
        Hello {user.name}!
      </Typography>
      <Divider />
      <Accounts selectedProject={selectedProject} />
      <Divider />
      <TransactionButtons transactions={transactions} />
      {navItems.map((item, idx) => (
        <Link href={`/add/${item.link}`} key={idx}>
          <ListItemButton>
            <ListItem disablePadding>
              <ListItemText primary={item.text} style={{ color: "black" }} />
            </ListItem>
          </ListItemButton>
        </Link>
      ))}
      <Divider />
      <Typography variant="h6">Categories</Typography>
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
      <Link href={`/transactions`}>
        <Typography variant="h6">Transactions</Typography>
      </Link>

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
  );
};

export default HomePage;

const navItems = [
  {
    link: "category",
    text: "Add Category",
  },
  {
    link: "project",
    text: "Add Project",
  },
  {
    link: "paymentmethod",
    text: "Add Payment Method",
  },
  {
    link: "transactiontype",
    text: "Add Transaction Type",
  },
  {
    link: "correction",
    text: "Make Correction",
  },
];
