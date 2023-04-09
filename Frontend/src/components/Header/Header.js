import React from "react";
import { AppBar , Container, Toolbar, Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Header() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <AccountBalanceIcon />
            <Typography > short URL </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
