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

interface CorrectionFormData {
  accountId: number | "";
  endBalance: number;
  date: any;
}

export default function CorrectionPage() {
  const { projects, selectedProject } = useProjectContext();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [formData, setFormData] = useState<CorrectionFormData>({
    accountId: "",
    endBalance: 0,
    date: dayjs(Date.now()),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await axios.get(
          `/api/project/${selectedProject}/account/get`
        );
        setAccounts(response.data.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to fetch accounts");
      }
    }
    fetchAccounts();
  }, [selectedProject]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(
        `/api/project/${selectedProject}/correction`,
        formData
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to submit correction");
    }
  }

  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  }

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
          <TextField
            margin="normal"
            required
            fullWidth
            label="New End Balance"
            type="number"
            id="endBalance"
            name="endBalance"
            value={formData.endBalance}
            onChange={handleInputChange}
          />
          <InputLabel id="demo-simple-select-label">Select Account</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.accountId}
            label="Sender Account"
            fullWidth
            onChange={(e: any) =>
              setFormData((prev) => ({ ...prev, accountId: e.target.value }))
            }
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
              value={formData.date}
              onChange={(newValue) =>
                setFormData((prev) => ({ ...prev, date: newValue }))
              }
            />
          </Box>

          {errorMessage && errorMessage}
          <Button
            type="button"
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Make Correction
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}
