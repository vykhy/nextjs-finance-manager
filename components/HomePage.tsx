import { useProjectContext } from "@/context/ProjectContext";
import React, { useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  Divider,
  IconButton,
  List,
  Skeleton,
  Typography,
} from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import useTransactions from "@/hooks/useTransactions";
import Accounts from "./Accounts";
import TransactionButtons from "./AddTransactionsSection";
import Transaction from "./Transaction";
import { ArrowRightAlt } from "@mui/icons-material";
import { useAccountsContext } from "@/context/AccountContext";
import TransactionList from "./TransactionList";

const HomePage = () => {
  const { user } = useAuthContext();
  const { selectedProject } = useProjectContext();
  const { triggerRefetch: fetchAccounts } = useAccountsContext();
  const { transactions, triggerRefetch: fetchTransactions } =
    useTransactions(selectedProject);

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Box style={{ backgroundColor: "white", color: "black" }} p={1}>
      <Typography variant="h4" fontWeight={"bold"}>
        {" "}
        Hello {user.name}!
      </Typography>
      <Divider />
      <Accounts />
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
      <Link href={"/test/colorpicker"}>
        <ListItemButton>
          <ListItem disablePadding>
            <ListItemText primary="Color picker" style={{ color: "black" }} />
          </ListItem>
        </ListItemButton>
      </Link>
      <Divider />

      <Link href={`/transactions`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Transactions</Typography>
          <IconButton>
            <ArrowRightAlt />
          </IconButton>
        </Box>
      </Link>

      <TransactionList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
      />
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
