import Layout from "@/components/Layout";
import { useProjectContext } from "@/context/ProjectContext";
import IAccount from "@/interfaces/IAccount";
import ICategory from "@/interfaces/ICategory";
import IProject from "@/interfaces/IProject";
import IPaymentMethod from "@/interfaces/IPaymentMethod";
import ITransactionType from "@/interfaces/ITransactionType";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

function AddTransaction() {
  const { projects, selectedProject } = useProjectContext();
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [transactionTypeId, setTransactionTypeId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState(0);
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));

  const [categories, setCategories] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getEntities = async () => {
      try {
        const { data } = await axios.get(
          `/api/project/${selectedProject}/entities`
        );
        setTransactionTypes(JSON.parse(data.data.transaction_types));
        setCategories(JSON.parse(data.data.categories));
        setAccounts(JSON.parse(data.data.accounts));
        setPaymentMethods(JSON.parse(data.data.payment_methods));
      } catch (error: any) {
        setError(error?.response?.data?.message);
      }
    };
    getEntities();
  }, [selectedProject]);

  const handleSubmit = async () => {
    setError("");
    try {
      const type: any = transactionTypes.find(
        (type: ITransactionType) =>
          Number(type.id) === Number(transactionTypeId)
      );
      const total = type.is_negative ? Number(amount) * -1 : amount;
      const { data } = await axios.post(
        `/api/project/${selectedProject}/transaction`,
        {
          item,
          amount: total,
          categoryId,
          description,
          paymentMethodId,
          transactionTypeId,
          accountId,
          date,
        }
      );
      console.log(data.data);
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message);
    }
  };
  return (
    <>
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
                value={amount}
                onChange={(e: any) => {
                  if (
                    !RegExp(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/).test(
                      e.target.value
                    ) &&
                    e.target.value != ""
                  ) {
                    return;
                  }
                  setAmount(e.target.value);
                }}
                label="Amount"
              />
              <TextField
                margin="normal"
                multiline
                fullWidth
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                label="Description"
              />
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Category"
                fullWidth
                onChange={(e: any) => setCategoryId(e.target.value)}
              >
                {categories?.map((category: ICategory, i) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id="demo-simple-select-label">
                Select Account
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={accountId}
                label="Account"
                fullWidth
                onChange={(e: any) => setAccountId(e.target.value)}
              >
                {accounts?.map((account: IAccount, i) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
              </Select>{" "}
              <InputLabel id="demo-simple-select-label">
                Select Transaction Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={transactionTypeId}
                label="Transaction Type"
                fullWidth
                onChange={(e: any) => setTransactionTypeId(e.target.value)}
              >
                {transactionTypes?.map((type: ITransactionType, i) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel id="demo-simple-select-label">
                Payment method
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentMethodId}
                label="Payment Method"
                fullWidth
                onChange={(e: any) => setPaymentMethodId(e.target.value)}
              >
                {paymentMethods?.map((method: IPaymentMethod, i) => (
                  <MenuItem key={method.id} value={method.id}>
                    {method.name}
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
                Add Transaction
              </Button>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
}

export default AddTransaction;
