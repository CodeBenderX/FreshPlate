import React from "react";
import { AppBar, Toolbar, Typography, Button} from "@mui/material";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../lib/auth-helper';
import "./Layout.css";

const isActive = (location, path) => {
  return location.pathname === path ? { color: '#FF6E1C' } : { color: '#000000' };
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
          <Button component={Link} to="/" color="inherit" style={isActive(location, "/")}>
            Home
          </Button>
          <Button component={Link} to="/recipes" color="inherit" style={isActive(location, "/recipes")}>
            Recipes
          </Button>
          <Button component={Link} to="/about" color="inherit" style={isActive(location, "/about")}>
            About Us
          </Button>
          {!auth.isAuthenticated() && (
            <>
              
              <Button component={Link} to="/signin" color="inherit" style={isActive(location, "/signin")}>
                Sign In
              </Button>
              <Button component={Link} to="/signup" color="inherit" style={isActive(location, "/signup")}>
                Register
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