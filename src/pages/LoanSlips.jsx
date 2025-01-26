import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  IconButton,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { getLoanSlips, downloadSlip } from '../services/api'; // Mock these API calls

const LoanSlips = () => {
  const [loanSlips, setLoanSlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '', date: '' });

  useEffect(() => {
    // Fetch Loan Slips Data
    const fetchLoanSlips = async () => {
      try {
        const response = await getLoanSlips(); // Mock API
        setLoanSlips(response.data); // Assuming API response is an array of slips
      } catch (err) {
        console.error('Failed to fetch loan slips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanSlips();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDownload = async (loanId) => {
    try {
      const response = await downloadSlip(loanId); // Mock API for downloading
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `LoanSlip_${loanId}.pdf`); // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download loan slip:', err);
    }
  };

  const filteredSlips = loanSlips.filter(
    (slip) =>
      (filters.type ? slip.type === filters.type : true) &&
      (filters.date ? slip.date.includes(filters.date) : true)
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Slips
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Filter by Loan Type"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          fullWidth
          sx={{ maxWidth: 300 }}
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Education Loan">Education Loan</MenuItem>
          <MenuItem value="Wedding Loan">Wedding Loan</MenuItem>
          <MenuItem value="Home Construction Loan">Home Construction Loan</MenuItem>
          <MenuItem value="Business Startup Loan">Business Startup Loan</MenuItem>
        </TextField>
        <TextField
          label="Filter by Date"
          name="date"
          type="date"
          value={filters.date}
          onChange={handleFilterChange}
          fullWidth
          sx={{ maxWidth: 300 }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Loading State */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loan ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount (PKR)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSlips.length > 0 ? (
                filteredSlips.map((slip) => (
                  <TableRow key={slip.id}>
                    <TableCell>{slip.id}</TableCell>
                    <TableCell>{slip.type}</TableCell>
                    <TableCell>{slip.date}</TableCell>
                    <TableCell>{slip.amount}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleDownload(slip.id)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Loan Slips Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default LoanSlips;
