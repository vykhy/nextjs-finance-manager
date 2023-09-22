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
