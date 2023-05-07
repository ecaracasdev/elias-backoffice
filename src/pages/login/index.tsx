import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// import { useNotification } from "../../context/notification.context";
// import { LoginValidate } from "../../utils/validate.form";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

type LoginType = {
  email: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  const { login } = useAuth();
  // const { getError, getSuccess } = useNotification();
  const [loginData, setLoginData] = React.useState<LoginType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    await login(loginData.email, loginData.password);
    navigate("/")
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                name="email"
                margin="normal"
                type="email"
                fullWidth
                label="Email"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={dataLogin}
              />
              <TextField
                name="password"
                margin="normal"
                type="password"
                fullWidth
                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={dataLogin}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Confirm
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
