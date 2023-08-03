import Layout from "@/components/Layout";
import React, { useState } from "react";
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
import { CircularProgress } from "@mui/material";

const NewProjectPage = () => {
  const { projects, selectedProject, addProject } = useProjectContext();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const form = new FormData(event.currentTarget);
      const name = form.get("name");
      const description = form.get("description");
      const data = await addProject(name, description);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
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
          <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth name="name" />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              multiline
              label="Description"
            />
            {error && error}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Create Project"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default NewProjectPage;
