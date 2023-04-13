import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
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

function CreateAccount() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("0");
  const { projects, selectedProject } = useProjectContext();
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (name.length < 4) {
      setError("Name should be more than 3 characters");
      return;
    }
    if (!selectedProject) {
      setError("Project is required");
      return;
    }
    const { data } = await axios.post(
      `/api/project/${selectedProject}/account/create`,
      {
        name,
        balance,
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
              {
                projects?.find((pro: IProject) => pro.id === selectedProject)
                  .name
              }
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Account name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Initial balance"
                value={balance}
                onChange={(e: any) => {
                  if (
                    !RegExp(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/).test(
                      e.target.value
                    ) &&
                    e.target.value != ""
                  ) {
                    return;
                  }
                  setBalance(e.target.value);
                }}
              />
              {error && error}
              <Button
                type="button"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Account
              </Button>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
}

export default CreateAccount;
