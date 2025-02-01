import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { updateUserDetails, clearAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setSnackbar({
        open: true,
        message: 'Please fill in all the fields.',
        severity: 'error',
      });
      return;
    }

    try {
      await updateUserDetails(user.id, formData);
      dispatch({ type: 'SET_USER', payload: { ...user, ...formData } });

      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });
      setIsEditing(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to update profile. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || '',
    });
    setIsEditing(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogout = () => {
    clearAuthToken();
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/auth');
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: 'auto',
          borderRadius: 3,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Welcome, {user?.name || 'User'}!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: 'center', color: '#666', mb: 4 }}
        >
          Manage your profile information and settings.
        </Typography>

        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              variant={isEditing ? 'outlined' : 'filled'}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              variant={isEditing ? 'outlined' : 'filled'}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              variant={isEditing ? 'outlined' : 'filled'}
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              disabled
              variant="filled"
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: isEditing ? 'space-between' : 'space-between',
            mt: 3,
          }}
        >
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                sx={{
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#115293' },
                }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelEdit}
                sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#115293' },
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Paper>

      {/* Snackbar for Notifications */}
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

export default ProfilePage;
