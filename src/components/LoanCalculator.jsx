import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Paper, Grid } from '@mui/material';

const LoanCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    loanPeriod: '',
    downPayment: '',
    category: '',
    subcategory: '',
  });
  const [calculatedInstallment, setCalculatedInstallment] = useState(null);

  const loanCategories = {
    'Wedding Loans': ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
    'Home Construction Loans': ['Structure', 'Finishing', 'Loan'],
    'Business Startup Loans': ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
    'Education Loans': ['University Fees', 'Child Fees Loan'],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateInstallment = () => {
    const { loanAmount, loanPeriod, downPayment } = formData;
    const principal = loanAmount - downPayment;
    const interestRate = 0.08; // 8% annual interest
    const installment =
      (principal * (1 + interestRate * loanPeriod)) / (loanPeriod * 12);
    setCalculatedInstallment(installment.toFixed(2));
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Advanced Loan Calculator
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          select
          label="Loan Category"
          name="category"
          variant="outlined"
          fullWidth
          value={formData.category}
          onChange={handleChange}
        >
          {Object.keys(loanCategories).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        {formData.category && (
          <TextField
            select
            label="Subcategory"
            name="subcategory"
            variant="outlined"
            fullWidth
            value={formData.subcategory}
            onChange={handleChange}
          >
            {loanCategories[formData.category].map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          label="Loan Amount (PKR)"
          name="loanAmount"
          variant="outlined"
          fullWidth
          type="number"
          value={formData.loanAmount}
          onChange={handleChange}
        />
        <TextField
          select
          label="Loan Period (Years)"
          name="loanPeriod"
          variant="outlined"
          fullWidth
          value={formData.loanPeriod}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((year) => (
            <MenuItem key={year} value={year}>
              {year} Year{year > 1 ? 's' : ''}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Down Payment (PKR)"
          name="downPayment"
          variant="outlined"
          fullWidth
          type="number"
          value={formData.downPayment}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={calculateInstallment}>
          Calculate
        </Button>
      </Box>
      {calculatedInstallment && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Monthly Installment: PKR {calculatedInstallment}
        </Typography>
      )}
    </Paper>
  );
};

export default LoanCalculator;
