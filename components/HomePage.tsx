import { useProjectContext } from "@/context/ProjectContext";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Money from "@mui/icons-material/Money";
import useTransactions from "@/hooks/useTransactions";
import Accounts from "./Accounts";
import TransactionButtons from "./AddTransactionsSection";

const HomePage = () => {
  const { user } = useAuthContext();
  const { selectedProject } = useProjectContext();
  const { transactions } = useTransactions(selectedProject);

  return (
    <Box style={{ backgroundColor: "white", color: "black" }} p={1}>
      <h1> Hello {user.name}</h1>
      <Divider />
      <Accounts selectedProject={selectedProject} />
      <Divider />
      <TransactionButtons />
      {navItems.map((item, idx) => (
        <Link href={`/add/${item.link}`} key={idx}>
          <ListItemButton>
            <ListItem disablePadding>
              <ListItemText primary={item.text} style={{ color: "black" }} />
            </ListItem>
          </ListItemButton>
        </Link>
      ))}
      <h3>Transactions</h3>
      <List>
        {transactions?.map((transaction: any) => (
          <ListItem key={transaction.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Money />
              </ListItemIcon>
              <ListItemText
                primary={`${transaction.item}`}
                secondary={
                  <Typography
                    variant="body2"
                    component="span"
                    style={{ color: transaction.amount < 0 ? "red" : "green" }}
                  >
                    {transaction.amount < 0 ? "-" : ""}&#x20B9;{" "}
                    {Math.abs(transaction.amount)} ({transaction.account})
                  </Typography>
                }
                style={{ color: "black" }}
              />
            </ListItemButton>
          </ListItem>
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
