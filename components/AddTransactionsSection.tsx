import { Button, Grid, Typography, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useMemo } from "react";

function TransactionButtons({ transactions }: any) {
  const totalExpense = useMemo(() => {
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
  const totalIncome = useMemo(() => {
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
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Link href={"/add/transaction?type=debit"}>
          <Button variant="contained" color="error" fullWidth>
            <Box>
              <Typography
                style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}
              >
                <IconButton
                  style={{
                    fontSize: 14,
                  }}
                  disableRipple
                >
                  <Add
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                    }}
                  />
                </IconButton>
                Expenses
              </Typography>
              <Typography
                style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
              >
                {totalExpense.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </Typography>
            </Box>
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link href={"/add/transaction?type=credit"}>
          <Button variant="contained" color="success" fullWidth>
            <Box>
              <Typography
                style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}
              >
                <IconButton
                  style={{
                    fontSize: 14,
                  }}
                  disableRipple
                >
                  <Add
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                    }}
                  />
                </IconButton>
                Income
              </Typography>
              <Typography
                style={{ fontSize: 12, color: "#fff", fontWeight: "bold" }}
              >
                {totalIncome.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </Typography>
            </Box>
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Link href={"/add/transfer"}>
          <Button variant="contained" color="primary" fullWidth>
            Transfer
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default TransactionButtons;
