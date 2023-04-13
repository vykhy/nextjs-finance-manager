import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function CreatePaymentMethod() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async () => {
    const { user } = useAuthContext();
    if (name.length < 3) {
      setError("Name should be more than 2 characters");
      return;
    }
    const { data } = await axios.post(
      `/api/user/${user.id}/paymentmethod/create`,
      {
        name: `${name.split("")[0].toUpperCase()}${name.substring(1)}`,
        userId: user.id,
      }
    );
    console.log(data);
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
              {user.name}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Payment method"
              />
              {error && error}
              <Button
                type="button"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Payment Method
              </Button>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
}

export default CreatePaymentMethod;
