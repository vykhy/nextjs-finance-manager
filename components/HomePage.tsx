import { useProjectContext } from "@/context/ProjectContext";
import useAccounts from "@/hooks/useAccounts";
import IAccount from "@/interfaces/IAccount";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import { Divider, List, Typography } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

const HomePage = () => {
  const { user } = useAuthContext();
  const { selectedProject } = useProjectContext();
  const {
    accounts,
    loading: loadingAccounts,
    error,
  } = useAccounts(selectedProject);

  if (error) {
    return <div>Error loading accounts.</div>;
  }

  return (
    <div style={{ backgroundColor: "white", color: "black" }}>
      <h1> Hello {user.name}</h1>
      <Divider />
      <h3>Accounts</h3>
      <List>
        {loadingAccounts ? (
          "Loading accounts..."
        ) : accounts.length ? (
          accounts.map((account: IAccount) => (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${account.name}`}
                  secondary={
                    <Typography variant="body2" component="span">
                      &#x20B9; {account.balance}
                    </Typography>
                  }
                  style={{ color: "black" }}
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary={`There are no accounts in this project`}
                style={{ color: "black" }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      {navItems.map((item, idx) => (
        <Link href={`/add/${item.link}`} key={idx}>
          <ListItemButton>
            <ListItem disablePadding>
              <ListItemText primary={item.text} style={{ color: "black" }} />
            </ListItem>
          </ListItemButton>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;

const navItems = [
  {
    link: "account",
    text: "Add Account",
  },
  {
    link: "category",
    text: "Add Category",
  },
  {
    link: "transaction",
    text: "Add Transaction",
  },
  {
    link: "transfer",
    text: "Transfer",
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
