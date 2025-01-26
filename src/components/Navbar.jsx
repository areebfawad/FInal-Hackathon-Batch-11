import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ role }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = (open) => {
    setMobileMenuOpen(open);
  };

  const handleLogout = () => {
    alert('Logged Out');
    navigate('/auth');
  };

  const userLinks = [
    { label: 'Home', path: '/' },
    { label: 'Loan Request', path: '/loan-request' },
    { label: 'Loan Slips', path: '/loan-slips' },
    { label: 'Profile', path: '/profile' },
  ];

  const adminLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Appointments', path: '/admin/appointments' },
    { label: 'Profile', path: '/admin/profile' },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* Brand Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
          }}
        >
          Saylani Microfinance
        </Typography>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {links.map((link) => (
            <Button
              key={link.path}
              color="inherit"
              component={Link}
              to={link.path}
            >
              {link.label}
            </Button>
          ))}
          <IconButton color="inherit" onClick={handleLogout}>
            <AccountCircleIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => toggleMobileMenu(true)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => toggleMobileMenu(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Navigation
          </Typography>
          <List>
            {links.map((link) => (
              <ListItem
                button
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => toggleMobileMenu(false)}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Button
            fullWidth
            color="error"
            variant="contained"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
