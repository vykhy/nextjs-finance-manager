import React, { useState, useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useAccounts from "@/hooks/useAccounts";
import IAccount from "@/interfaces/IAccount";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box, IconButton, Typography } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { List } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import Account from "./Account";

function Accounts({ selectedProject }: { selectedProject: number }) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showTotal, setShowTotal] = useState<boolean>(false);
  const {
    accounts,
    loading: loadingAccounts,
    error,
  } = useAccounts(selectedProject);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const toggleShowTotal = () => {
    setShowTotal((prev) => !prev);
  };

  const totalBalance = useMemo(() => {
    return accounts?.reduce(
      (total: number, account: IAccount) => (total += Number(account.balance)),
      Number(0)
    );
  }, [accounts]);

  if (error) {
    return <div>Error loading accounts.</div>;
  }
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="h6">
          Accounts: &#x20B9; {showTotal ? `${totalBalance}` : `------------`}
          <IconButton onClick={toggleShowTotal}>
            {showTotal ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Typography>
        <IconButton
          component={Link}
          href="/add/account"
          aria-label="add account"
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {loadingAccounts ? (
        "Loading accounts..."
      ) : accounts.length ? (
        <>
          <List>
            {showAll
              ? accounts.map((account: IAccount) => (
                  <Account account={account} key={account.id} />
                ))
              : accounts
                  .sort((a: IAccount, b: IAccount) => +b.balance - +a.balance) // convert balance to number and sort
                  .slice(0, 2) // take only the first two accounts after sorting
                  .map((account: IAccount) => (
                    <Account account={account} key={account.id} />
                  ))}
          </List>
          <Box style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <IconButton aria-label="Toggle" onClick={toggleShowAll}>
              {showAll ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
        </>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary={`There are no accounts in this project`}
                style={{ color: "black", fontWeight: "bold" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </>
  );
}

export default Accounts;
