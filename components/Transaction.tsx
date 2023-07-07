import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, IconButton, Typography } from "@mui/material";
import Money from "@mui/icons-material/Money";
import { format } from "date-fns";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

function Transaction({ transaction }: any) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleShowDescription = () => {
    setShowDescription((prev) => !prev);
  };
  return (
    <ListItem
      disablePadding
      style={{
        borderBottom: "1px solid gray",
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <Money />
        </ListItemIcon>
        <ListItemText
          primary={
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="body1">{transaction.item}</Typography>
              <Typography
                variant="body2"
                component="span"
                style={{
                  color: transaction.amount < 0 ? "red" : "green",
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                &#x20B9; {Math.abs(transaction.amount)}
              </Typography>
            </Box>
          }
          secondary={
            <>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="caption" color={"gray"}>
                  {format(new Date(transaction.date), "dd-MM-yyyy HH:mm a")} (
                  {transaction.account})
                </Typography>

                <IconButton onClick={toggleShowDescription}>
                  {showDescription ? (
                    <ArrowDropUp
                      style={{
                        height: 15,
                        width: 15,
                      }}
                    />
                  ) : (
                    <ArrowDropDown
                      style={{
                        height: 15,
                        width: 15,
                      }}
                    />
                  )}
                </IconButton>
              </Box>

              {showDescription && (
                <Typography variant="body2">
                  {transaction.category}
                  {transaction.description && ` - ${transaction.description}`}
                </Typography>
              )}
            </>
          }
          style={{ color: "black" }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default Transaction;
