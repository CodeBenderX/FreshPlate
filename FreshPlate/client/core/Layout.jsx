import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-container">
      <AppBar position="static">
        <Toolbar>
          <Typography>
            <Button component="a" href="/">
              FreshPlate
            </Button>
          </Typography>
          <Button component="a" href="/">
            Home
          </Button>
          <Button component="a" href="/about">
            My Account
          </Button>
          <Button component="a" href="/recipes">
            Recipes
          </Button>
          <Button component="a" href="/about">
            About Us
          </Button>
          <Button component="a" href="/contact">
            Contact
          </Button>
          <Button component="a" href="/logout">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
