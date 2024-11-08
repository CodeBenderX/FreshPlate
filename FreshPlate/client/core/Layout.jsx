import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../lib/auth-helper';
import "./Layout.css";

const isActive = (location, path) => {
  return location.pathname === path ? { color: '#ff4081' } : { color: '#ffffff' };
};

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-container">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Button component={Link} to="/" color="inherit">
              FreshPlate
            </Button>
          </Typography>
          <IconButton component={Link} to="/" color="inherit" aria-label="Home" style={isActive(location, "/")}>
            <HomeIcon />
          </IconButton>
          <Button component={Link} to="/recipes" style={isActive(location, "/recipes")}>
            Recipes
          </Button>
          <Button component={Link} to="/users" style={isActive(location, "/users")}>
            Users
          </Button>
          {!auth.isAuthenticated() && (
            <>
              <Button component={Link} to="/signup" style={isActive(location, "/signup")}>
                Sign up
              </Button>
              <Button component={Link} to="/signin" style={isActive(location, "/signin")}>
                Sign In
              </Button>
            </>
          )}
          {auth.isAuthenticated() && (
            <>
              <Button
                component={Link}
                to={`/user/${auth.isAuthenticated().user._id}`}
                style={isActive(location, `/user/${auth.isAuthenticated().user._id}`)}
              >
                My Profile
              </Button>
              <Button
                component={Link}
                to="/about"
                style={isActive(location, "/about")}
              >
                About Us
              </Button>
              <Button
                component={Link}
                to="/contact"
                style={isActive(location, "/contact")}
              >
                Contact
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => navigate('/'));
                }}
              >
                Sign out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}