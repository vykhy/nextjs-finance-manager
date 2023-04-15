import { Button, Grid, Typography, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/system";
import Link from "next/link";

function TransactionButtons() {
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
              <Typography style={{ fontSize: 10, color: "#fff" }}>
                Add new expense
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
              <Typography style={{ fontSize: 10, color: "#fff" }}>
                Add new income
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
