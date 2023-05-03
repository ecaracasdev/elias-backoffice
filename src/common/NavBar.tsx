import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Grid,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export const NavBar: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Dashboard</Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  {/* <Button variant="contained" onClick={() => navigate("login")}>
                    Login
                  </Button> */}
                  <Button variant="outlined" onClick={handleClick}>
                    Logout
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
