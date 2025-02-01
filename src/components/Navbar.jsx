import React, { useState, useEffect } from 'react';
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
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Modal,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = ({ role, userName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Check Auth State
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  }, [location]);

  const toggleMobileMenu = (open) => {
    setMobileMenuOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    setIsLoggedIn(false);
    navigate('/auth');
  };

  const openProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const closeProfileMenu = () => {
    setProfileMenuAnchor(null);
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
    closeProfileMenu();
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
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

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        backgroundColor: '#1976d2',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Brand Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Saylani Microfinance
        </Typography>

        {/* Desktop Links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {links.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                sx={{
                  color: isActive(link.path) ? '#ffffff' : '#f0f0f0',
                  fontWeight: isActive(link.path) ? 'bold' : 'normal',
                  backgroundColor: isActive(link.path)
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            {isLoggedIn ? (
              <>
                <IconButton color="inherit" onClick={openProfileMenu}>
                  <Avatar alt={userName || 'User'} sx={{ bgcolor: 'secondary.main' }}>
                    {userName?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={closeProfileMenu}
                >
                  <MenuItem onClick={openProfileModal}>
                    <EditIcon sx={{ mr: 1 }} />
                    Edit Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/auth')}
                sx={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={() => toggleMobileMenu(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => toggleMobileMenu(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#1976d2',
            color: '#ffffff',
            width: '70%',
          },
        }}
      >
        <Box sx={{ width: '100%', p: 2 }}>
          <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
            Navigation
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <List>
            {links.map((link) => (
              <ListItem
                button
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => toggleMobileMenu(false)}
                sx={{
                  color: isActive(link.path) ? 'secondary.main' : '#ffffff',
                  backgroundColor: isActive(link.path)
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          {isLoggedIn && (
            <Button fullWidth color="secondary" variant="contained" onClick={handleLogout} sx={{ mt: 2 }}>
              Logout
            </Button>
          )}
        </Box>
      </Drawer>

      {/* Profile Modal */}
      <Modal open={profileModalOpen} onClose={closeProfileModal}>
        <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, width: 400, margin: 'auto', mt: '10%' }}>
          <Typography variant="h6" gutterBottom>
            Edit Profile (Coming Soon)
          </Typography>
          <Button variant="contained" color="secondary" onClick={closeProfileModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Navbar;
