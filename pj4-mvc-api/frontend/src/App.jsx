import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './Home';
import Tasks from './Tasks';

import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Outlet, Link } from "react-router-dom";

function App() {
return (
   <>
     <AppBar component="nav">
       <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to={`home`} ><Button color="inherit">Home</Button></Link>
          <Link to={`tasks`}><Button color="inherit">Tasks</Button></Link>
        </Typography>
         <Button color="inherit">Home</Button>
       </Toolbar>
    </AppBar>
    <Box>
        <Outlet />
    </Box>
   </>
 );
}

export default App;