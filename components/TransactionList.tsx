import Transaction from "@/components/Transaction";
import { Box, List, Skeleton } from "@mui/material";
import React, { useCallback, useMemo } from "react";

export type TransactionType = {
  id: number;
  date: Date;
  amount: number;
  item: string;
  description: string;
  category: string;
  transactiontype: string;
  account: string;
  accountbalance: number;
  paymentmethod: string;
  project: string;
  user: string;
};

type TransactionListPropType = {
  transactions: Array<TransactionType>;
  fetchTransactions: () => void;
};

const TransactionList = React.memo(
  ({ transactions, fetchTransactions }: TransactionListPropType) => {
    const emptyArray = useMemo(() => new Array(10).fill(0), []);
    const memoizedFetchTransactions = useCallback(fetchTransactions, [
      fetchTransactions,
    ]);
    return (
      <>
        {transactions.length ? (
          <List
            style={{
              border: "1px solid gray",
              borderRadius: "15px",
            }}
          >
            {transactions?.map((transaction: any) => (
              <Transaction
                fetchTransactions={memoizedFetchTransactions}
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </List>
        ) : (
          <>
            {emptyArray.map((num, idx) => (
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
      </>
    );
  }
);

export default TransactionList;
