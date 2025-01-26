import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <IconButton color="inherit" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => navigate('/loans')}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="My Loans" />
          </ListItem>
          <ListItem button onClick={() => navigate('/repayments')}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Repayments" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
