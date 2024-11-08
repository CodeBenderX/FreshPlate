import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { create } from './api-user.js';

const useStyles = {
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: 5,
    paddingBottom: 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: 2,
    color: '#ff4081'
  },
  textField: {
    marginLeft: 1,
    marginRight: 1,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: 2
  }
};

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    open: false
  });

  const navigate = useNavigate();

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    if (values.password !== values.confirmPassword) {
      setValues({ ...values, error: "Passwords don't match" });
      return;
    }

    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '', open: true });
      }
    });
  };

  return (
    <Card sx={useStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={useStyles.title}>
          Sign Up
        </Typography>
        <TextField
          id="name"
          label="Name"
          sx={useStyles.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          sx={useStyles.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          sx={useStyles.textField}
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <br />
        <TextField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          sx={useStyles.textField}
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          margin="normal"
        />
        <br />
        {values.error && (
          <Typography component="p" color="error">
            {values.error}
          </Typography>
        )}
        <Button color="primary" variant="contained" onClick={clickSubmit} sx={useStyles.submit}>
          Submit
        </Button>
      </CardContent>
      {values.open && (
        <Typography component="p" color="primary">
          New account successfully created. <Link to="/signin">Sign In</Link>
        </Typography>
      )}
    </Card>
  );
}