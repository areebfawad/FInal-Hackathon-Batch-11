import React from 'react';
import { TextField, MenuItem, Box, Button } from '@mui/material';

const AdminFilters = ({ onApplyFilters }) => {
  const [filters, setFilters] = React.useState({
    status: '',
    category: '',
    dateRange: '',
  });

  const loanCategories = [
    'Wedding Loans',
    'Home Construction Loans',
    'Business Startup Loans',
    'Education Loans',
  ];

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        select
        label="Status"
        name="status"
        value={filters.status}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </TextField>
      <TextField
        select
        label="Category"
        name="category"
        value={filters.category}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="">All Categories</MenuItem>
        {loanCategories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="date"
        label="Date Range"
        name="dateRange"
        value={filters.dateRange}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={applyFilters}>
        Apply
      </Button>
    </Box>
  );
};

export default AdminFilters;
