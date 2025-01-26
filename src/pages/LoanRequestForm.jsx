import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
  Container,
  Alert,
  InputLabel,
} from '@mui/material';

const loanCategories = {
  education: {
    title: 'Education Loans',
    subcategories: ['University Fees', 'Child Fees Loan'],
  },
  wedding: {
    title: 'Wedding Loans',
    subcategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
  },
  startup: {
    title: 'Business Startup Loans',
    subcategories: [
      'Buy Stall',
      'Advance Rent for Shop',
      'Shop Assets',
      'Shop Machinery',
    ],
  },
  home: {
    title: 'Home Construction Loans',
    subcategories: ['Structure', 'Finishing', 'Loan'],
  },
};

const LoanRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    subcategory: '',
    purpose: '',
    loanDuration: '',
    guarantor1: { name: '', email: '', phone: '', cnic: '' },
    guarantor2: { name: '', email: '', phone: '', cnic: '' },
    bankStatement: null,
    salarySheet: null,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuarantorChange = (index, field, value) => {
    const guarantorKey = `guarantor${index}`;
    setFormData({
      ...formData,
      [guarantorKey]: { ...formData[guarantorKey], [field]: value },
    });
  };

  const handleFileChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.category ||
      !formData.subcategory ||
      !formData.purpose ||
      !formData.loanDuration ||
      !formData.guarantor1.name ||
      !formData.guarantor1.email ||
      !formData.guarantor1.phone ||
      !formData.guarantor1.cnic ||
      !formData.guarantor2.name ||
      !formData.guarantor2.email ||
      !formData.guarantor2.phone ||
      !formData.guarantor2.cnic
    ) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setSuccessMessage('Loan Request Submitted Successfully!');
    console.log('Form Data:', formData);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
      >
        Loan Request Form
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      <Grid container spacing={4}>
        {/* Personal Information and Loan Information Side by Side */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={4}>
              {/* Personal Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              {/* Loan Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Loan Information
                </Typography>
                <TextField
                  select
                  fullWidth
                  label="Loan Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                >
                  {Object.keys(loanCategories).map((key) => (
                    <MenuItem key={key} value={key}>
                      {loanCategories[key].title}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Loan Subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  disabled={!formData.category}
                >
                  {formData.category &&
                    loanCategories[formData.category].subcategories.map(
                      (subcategory, index) => (
                        <MenuItem key={index} value={subcategory}>
                          {subcategory}
                        </MenuItem>
                      )
                    )}
                </TextField>
                <TextField
                  fullWidth
                  label="Purpose of Loan"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Loan Duration (in months)"
                  name="loanDuration"
                  value={formData.loanDuration}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                >
                  {[6, 12, 18, 24, 36, 48, 60].map((months) => (
                    <MenuItem key={months} value={months}>
                      {months} months
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Guarantor Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Guarantor Information
            </Typography>
            <Grid container spacing={2}>
              {[1, 2].map((index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Typography variant="subtitle1" gutterBottom>
                    Guarantor {index}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData[`guarantor${index}`]?.name || ''}
                    onChange={(e) =>
                      handleGuarantorChange(index, 'name', e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={formData[`guarantor${index}`]?.email || ''}
                    onChange={(e) =>
                      handleGuarantorChange(index, 'email', e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData[`guarantor${index}`]?.phone || ''}
                    onChange={(e) =>
                      handleGuarantorChange(index, 'phone', e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="CNIC"
                    value={formData[`guarantor${index}`]?.cnic || ''}
                    onChange={(e) =>
                      handleGuarantorChange(index, 'cnic', e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel>Bank Statement (Optional)</InputLabel>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'bankStatement')}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel>Salary Sheet (Optional)</InputLabel>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'salarySheet')}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit Loan Request
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoanRequestForm;
