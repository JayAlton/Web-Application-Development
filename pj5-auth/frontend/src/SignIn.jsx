import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after sign-in

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to be sent in the POST request
    const userData = {
      user_name, // Use username instead of email
      password,
    };

    axios
      .post("http://localhost:3000/auth/login", userData) // Ensure the endpoint is correct
      .then(response => {
        // Handle successful login
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_name", user_name); // Store username or any other user info
        navigate('/home'); // Redirect to home or another page
        window.location.reload();
      })
      .catch(err => {
        console.log(err.response.data);
        setError(err.response.data); // Set the error message from the response
      });
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center">
          Sign In
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={user_name}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="user_name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate('/signup')} // Navigate to Sign Up page
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;