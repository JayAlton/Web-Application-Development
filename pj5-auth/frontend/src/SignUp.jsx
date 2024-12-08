import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [user_name, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to be sent in the POST request
    const userData = {
      user_name, // Use username instead of email
      password,
    };

    axios
      .post("http://localhost:3000/auth/users", userData) // Ensure the endpoint is correct
      .then(response => {
        // Handle successful registration
        let { user } = response.data;
        localStorage.setItem("user_name", `${user.user_name}`);
        navigate('/home'); // Redirect to home or another page
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
          Sign Up
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User Name" // Changed label to Username
            value={user_name} // Use username state
            onChange={(e) => setUsername(e.target.value)} // Update username state
            autoComplete="user_name" // Optional: Change this if needed
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
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
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

export default SignUp;