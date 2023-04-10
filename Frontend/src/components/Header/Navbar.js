import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import HttpIcon from '@mui/icons-material/Http';

export default function Navbar() {
  const navbarItems = ["Home", "Make new short Url"];
  const links = ["/", "/generateShortUrl"];

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container maxWidth="sm">
        <Toolbar>
          <HttpIcon />
          <Typography display={'inline-block'}>  shortenUrl </Typography>
          <Box  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" , marginLeft: "10px" } }}>
            {navbarItems.map((item, index) => (
              <Link key={index} to={links[index]}>
                <Button key={item}
                  sx={{border: '1px solid black', my: 2, color: "white", display: "block", 
                  "&:hover": {backgroundColor: "primary.main", opacity: [0.9, 0.8, 0.7]}, mx: 2}}
                >
                  {item}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
