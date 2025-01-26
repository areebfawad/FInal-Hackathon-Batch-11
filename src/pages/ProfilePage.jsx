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
import { updateUserDetails } from '../services/api';

const ProfilePage = () => {
  const { user } = useAppState();
  const dispatch = useAppDispatch();

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
    try {
      // Call API to save changes
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

  return (
    <Box sx={{ p: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: 'auto',
          borderRadius: 3,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Profile
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
            justifyContent: isEditing ? 'space-between' : 'flex-end',
            mt: 3,
          }}
        >
          {isEditing ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
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
