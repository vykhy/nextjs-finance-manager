import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IAccount from "@/interfaces/IAccount";
import InboxIcon from "@mui/icons-material/Inbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Box, IconButton, Typography } from "@mui/material";

function Account({ account }: { account: IAccount }) {
  const [showBalance, setShowBalance] = useState<boolean>(false);

  const toggleShowBalance = () => {
    setShowBalance((prev) => !prev);
  };
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText
          primary={`${account.name}`}
          secondary={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={1}
            >
              <Typography variant="body1">
                <Typography
                  fontWeight={"bold"}
                  variant="body2"
                  component="span"
                >
                  &#x20B9; {showBalance ? account.balance : `------------`}
                </Typography>
              </Typography>

              <IconButton onClick={toggleShowBalance}>
                {showBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Box>
          }
          style={{ color: "black" }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default Account;
