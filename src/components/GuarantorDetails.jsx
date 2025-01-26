import React from 'react';
import { Box, Typography, TextField, Paper, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const GuarantorDetails = ({ guarantor, index, onChange }) => {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 4,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Guarantor {index} Details
        </Typography>
        <Tooltip title="Please provide accurate details for this guarantor">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TextField
        fullWidth
        label="Full Name"
        value={guarantor.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
        sx={{ mb: 2 }}
        required
        helperText="Enter the full legal name of the guarantor."
      />
      <TextField
        fullWidth
        label="Email Address"
        value={guarantor.email}
        onChange={(e) => onChange(index, 'email', e.target.value)}
        type="email"
        sx={{ mb: 2 }}
        required
        helperText="Enter a valid email address (e.g., example@gmail.com)."
      />
      <TextField
        fullWidth
        label="CNIC"
        value={guarantor.cnic}
        onChange={(e) => onChange(index, 'cnic', e.target.value)}
        sx={{ mb: 2 }}
        required
        helperText="Enter the CNIC without dashes (e.g., 1234567890123)."
      />
      <TextField
        fullWidth
        label="Phone Number"
        value={guarantor.phone}
        onChange={(e) => onChange(index, 'phone', e.target.value)}
        type="tel"
        sx={{ mb: 2 }}
        required
        helperText="Enter a valid phone number (e.g., 03012345678)."
      />
    </Paper>
  );
};

export default GuarantorDetails;
