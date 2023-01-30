import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DeGrowFa
          </Typography>
          
         <Link to="/"> <Button color="inherit" >Home</Button></Link>
         <Link to="/data"> <Button color="inherit" >Data</Button></Link>
         <Link to="/uploadcsv"> <Button color="inherit" >Upload CSV</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}