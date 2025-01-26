import React, { useState } from 'react';
import { Box, TextField, Typography, Button, MenuItem, Paper } from '@mui/material';

const CalculatorPage = () => {
  const [formData, setFormData] = useState({
    category: '',
    loanAmount: '',
    downPayment: '',
    loanPeriod: '',
  });
  const [result, setResult] = useState(null);

  const categories = ['Wedding Loans', 'Home Construction Loans', 'Business Startup Loans', 'Education Loans'];

  const calculateLoan = () => {
    const { loanAmount, downPayment, loanPeriod } = formData;
    const principal = loanAmount - downPayment;
    const interestRate = 0.08; // 8% interest per year
    const total = principal * (1 + interestRate * loanPeriod);
    const monthlyInstallment = total / (loanPeriod * 12);
    setResult({
      total: total.toFixed(2),
      monthlyInstallment: monthlyInstallment.toFixed(2),
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        p: 4,
      }}
    >
      <Paper sx={{ p: 4, width: '100%', maxWidth: 600, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Loan Calculator
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            select
            label="Loan Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            fullWidth
          >
            {categories.map((category, idx) => (
              <MenuItem key={idx} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Loan Amount (PKR)"
            type="number"
            value={formData.loanAmount}
            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
            fullWidth
          />
          <TextField
            label="Down Payment (PKR)"
            type="number"
            value={formData.downPayment}
            onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
            fullWidth
          />
          <TextField
            select
            label="Loan Period (Years)"
            value={formData.loanPeriod}
            onChange={(e) => setFormData({ ...formData, loanPeriod: e.target.value })}
            fullWidth
          >
            {[1, 2, 3, 4, 5].map((year) => (
              <MenuItem key={year} value={year}>
                {year} Year{year > 1 ? 's' : ''}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" fullWidth onClick={calculateLoan}>
            Calculate
          </Button>
        </Box>
        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">
              Total Amount: PKR {result.total}
            </Typography>
            <Typography variant="h6">
              Monthly Installment: PKR {result.monthlyInstallment}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CalculatorPage;
