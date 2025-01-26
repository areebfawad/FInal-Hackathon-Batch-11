import React, { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser, registerUser } from '../services/api';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('AppContext is not defined. Please ensure the AppProvider is properly set up.');
  }

  const { dispatch } = context;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0); // 0 for Login, 1 for Register
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFormData({ email: '', password: '', name: '' }); // Reset form
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for missing fields
    if (!formData.email || !formData.password || (activeTab === 1 && !formData.name)) {
      setError('All fields are required.');
      setSnackbar({ open: true, message: 'Please fill in all fields.', severity: 'error' });
      return;
    }

    try {
      if (activeTab === 0) {
        // Login
        const response = await loginUser({ email: formData.email, password: formData.password });
        dispatch({ type: 'SET_USER', payload: response.data.user });
        navigate('/dashboard');
      } else {
        // Register
        const response = await registerUser(formData);
        dispatch({ type: 'SET_USER', payload: response.data.user });
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(errorMessage);
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8f5e9',
        padding: 2,
      }}
    >
      <Paper elevation={5} sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {activeTab === 0 ? 'Login' : 'Register'}
        </Typography>

        {/* Tabs for Login and Register */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Login/Register Form */}
        <form onSubmit={handleSubmit}>
          {activeTab === 1 && (
            <TextField
              fullWidth
              label="Name"
              name="name"
              margin="normal"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordVisibilityToggle}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, py: 1 }}
          >
            {activeTab === 0 ? 'Login' : 'Register'}
          </Button>
        </form>
      </Paper>

      {/* Snackbar for Alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthPage;
