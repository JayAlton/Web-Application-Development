import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './Home';
import Tasks from './Tasks';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function App() {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [user, setUser ] = useState(null); // State to manage user info

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser (true); // User is logged in
    } else {
      setUser (false); // User is logged out
    }
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/auth/logout", { withCredentials: true }) // Update with your API URL
      .then(response => {
        localStorage.clear("user_name");
        localStorage.clear("token");
        setUser (false); // Clear user state
        navigate('/signin'); // Redirect to sign-in page
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <AppBar component="nav" className="AppBar">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user ? (
              <>
                <Link to={`home`}>
                  <Button color="inherit">Home</Button>
                </Link>
                <Link to={`tasks`}>
                  <Button color="inherit">Tasks</Button>
                </Link>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link to={`signin`}>
                <Button color="inherit">Sign In</Button>
              </Link>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default App;