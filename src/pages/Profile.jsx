import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const Profile = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Name: John Doe
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Email: john.doe@example.com
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Role: User
        </Typography>
        <Button variant="contained" color="primary">
          Edit Profile
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
