import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import Money from "@mui/icons-material/Money";
import { format } from "date-fns";
import { ArrowDropDown, ArrowDropUp, MoreVert } from "@mui/icons-material";

function Transaction({ transaction }: any) {
  const [showDescription, setShowDescription] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const toggleShowDescription = () => {
    setShowDescription((prev) => !prev);
  };
  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setTimeout(() => {
      setAnchorEl(null);
      setIsDeleting(false);
    }, 1500);
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
              <Box>
                <Typography
                  variant="body2"
                  component="span"
                  style={{
                    color: transaction.amount < 0 ? "red" : "green",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  &#x20B9; {Math.abs(transaction.amount)}
                </Typography>
                <IconButton onClick={handlePopover}>
                  <MoreVert />
                </IconButton>
              </Box>
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
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          <MenuItem>
            <Button
              onClick={handleDelete}
              size="small"
              variant="contained"
              color="error"
            >
              {isDeleting ? (
                <CircularProgress size={22} sx={{ color: "white " }} />
              ) : (
                "Delete"
              )}
            </Button>
          </MenuItem>
        </MenuList>
      </Popover>
    </ListItem>
  );
}

export default Transaction;
