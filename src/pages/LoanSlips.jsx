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
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getLoanSlips, downloadSlip } from '../services/api';
import SlipDownload from '../components/SlipDownload';

const LoanSlips = () => {
  const [loanSlips, setLoanSlips] = useState([]); // Ensuring it's an array
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '', date: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch Loan Slips
  useEffect(() => {
    fetchLoanSlips();
  }, []);

  const fetchLoanSlips = async () => {
    setLoading(true);
    try {
      const response = await getLoanSlips();
      setLoanSlips(response.data || []); // Ensure it defaults to an array
    } catch (err) {
      console.error('Failed to fetch loan slips:', err);
      setSnackbar({
        open: true,
        message: 'Failed to fetch loan slips. Please try again later.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Filter Change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle Download Slip
  const handleDownload = async (loanId) => {
    try {
      const response = await downloadSlip(loanId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `LoanSlip_${loanId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSnackbar({
        open: true,
        message: 'Loan slip downloaded successfully!',
        severity: 'success',
      });

      fetchLoanSlips(); // Refresh the list after download
    } catch (err) {
      console.error('Failed to download loan slip:', err);
      setSnackbar({
        open: true,
        message: 'Failed to download loan slip. Please try again later.',
        severity: 'error',
      });
    }
  };

  // Open Dialog for Slip Preview
  const handleViewSlip = (slip) => {
    setSelectedSlip(slip);
    setDialogOpen(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setSelectedSlip(null);
    setDialogOpen(false);
  };

  // Filtered Slips with Safety Check
  const filteredSlips = Array.isArray(loanSlips)
    ? loanSlips.filter(
        (slip) =>
          (filters.type ? slip.type === filters.type : true) &&
          (filters.date ? slip.date.includes(filters.date) : true)
      )
    : [];

  // Snackbar Close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Loan Slips
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
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

      {/* Loan Slip Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 2, overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Loan ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount (PKR)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
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
                      <IconButton color="primary" onClick={() => handleViewSlip(slip)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="primary" onClick={() => handleDownload(slip.id)}>
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

      {/* Snackbar for Alerts */}
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

      {/* Slip Preview Dialog */}
      {selectedSlip && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Slip Details</DialogTitle>
          <DialogContent>
            <SlipDownload slipDetails={selectedSlip} />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default LoanSlips;
