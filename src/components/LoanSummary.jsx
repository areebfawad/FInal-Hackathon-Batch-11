import React from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';

const LoanSummary = ({ category, subcategory, amount, onChange, onSubmit }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Loan Summary
      </Typography>
      <Typography>
        <strong>Category:</strong> {category || 'Not Selected'}
      </Typography>
      <Typography>
        <strong>Subcategory:</strong> {subcategory || 'Not Selected'}
      </Typography>
      <TextField
        fullWidth
        label="Loan Amount (PKR)"
        type="number"
        value={amount}
        onChange={(e) => onChange(e.target.value)}
        sx={{ my: 3 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onSubmit}
        disabled={!category || !subcategory || !amount}
      >
        Submit Loan Request
      </Button>
    </Paper>
  );
};

export default LoanSummary;
