import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import InputLabel from "@mui/material/InputLabel";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

function CreateTransactionType() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isNegative, setIsNegative] = useState("false");

  const handleSubmit = async () => {
    if (name.length < 3) {
      setError("Name should be more than 3 characters");
      return;
    }
    const { data } = await axios.post("/api/transactiontype/create", {
      name: `${name.split("")[0].toUpperCase()}${name.substring(1)}`,
      isNegative: isNegative === "true",
    });
    console.log(data);
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
            Add Transaction Type
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Transaction type"
            />{" "}
            <InputLabel id="demo-simple-select-label">Is Negative</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isNegative}
              label="Is Negative"
              fullWidth
              onChange={(e: any) => setIsNegative(e.target.value)}
            >
              <MenuItem selected value={"false"}>
                False
              </MenuItem>
              <MenuItem value={"true"}>True</MenuItem>
            </Select>
            <FormHelperText>
              Is negative (whether this transaction reduces account balance){" "}
            </FormHelperText>
            {error && error}
            <Button
              type="button"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Transaction Type
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default CreateTransactionType;
