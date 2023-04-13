import Layout from "@/components/Layout";
import IAccount from "@/interfaces/IAccount";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useProjectContext } from "@/context/ProjectContext";
import IProject from "@/interfaces/IProject";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function transfer() {
  const [fromAccountId, setFromAccountId] = useState<any>("");
  const [toAccountId, setToAccountId] = useState<any>("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const { projects, selectedProject } = useProjectContext();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<any>(dayjs(Date.now()));

  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccounts = async () => {
      const { data } = await axios.get(
        `/api/project/${selectedProject}/account/get`
      );
      setAccounts(data.data);
    };
    try {
      getAccounts();
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message);
    }
  }, [selectedProject]);

  const handleSubmit = async () => {
    if (fromAccountId === toAccountId) {
      setError("Sender and receiver accounts can't be the same");
      return;
    }
    if (!fromAccountId || !toAccountId || !amount) {
      setError("Sender and receiver accounts are required");
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/project/${selectedProject}/transfer/create`,
        {
          item,
          amount,
          fromAccountId,
          toAccountId,
          description,
          date,
        }
      );
      console.log(data.data);
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message);
    }
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {
              projects?.find((pro: IProject) => pro.id === selectedProject)
                ?.name
            }
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={item}
              onChange={(e) => setItem(e.target.value)}
              label="Item"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Amount"
              value={amount}
              onChange={(e: any) => {
                if (
                  !RegExp(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/).test(
                    e.target.value
                  ) &&
                  e.target.value !== ""
                ) {
                  return;
                }
                setAmount(e.target.value);
              }}
            />
            <InputLabel id="demo-simple-select-label">
              Sender Account
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fromAccountId}
              label="Sender Account"
              fullWidth
              onChange={(e: any) => setFromAccountId(e.target.value)}
            >
              {accounts?.length &&
                accounts.map((account: IAccount, i) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
            </Select>
            <InputLabel id="demo-simple-select-label">
              Receiver Account
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={toAccountId}
              fullWidth
              label="Receiver account"
              onChange={(e: any) => setToAccountId(e.target.value)}
            >
              {accounts?.length &&
                accounts.map((account: IAccount, i) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
            </Select>
            <Box>
              <Typography>Date: </Typography>
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </Box>

            {error && error}
            <Button
              type="button"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Transfer
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default transfer;
