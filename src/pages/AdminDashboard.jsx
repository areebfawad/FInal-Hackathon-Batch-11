import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Grid,
  Modal,
  Fade,
  Backdrop,
  Pagination,
  Snackbar,
  Alert,
} from '@mui/material';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'John Doe',
      category: 'Business Startup Loans',
      subcategory: 'Shop Assets',
      purpose: 'Buy new equipment for shop',
      amount: 500000,
      status: 'Pending',
      guarantors: [
        { name: 'Jane Doe', phone: '03012345678', cnic: '12345-6789012-3' },
        { name: 'Ali Raza', phone: '03098765432', cnic: '12345-9876543-2' },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      category: 'Education Loans',
      subcategory: 'University Fees',
      purpose: 'Pay tuition for final semester',
      amount: 300000,
      status: 'Approved',
      guarantors: [
        { name: 'Ahmed Khan', phone: '03123456789', cnic: '12345-6789012-4' },
        { name: 'Sara Ali', phone: '03219876543', cnic: '12345-6789012-5' },
      ],
    },
  ]);

  const [filters, setFilters] = useState({ status: '', category: '', search: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const categories = [
    'Wedding Loans',
    'Home Construction Loans',
    'Business Startup Loans',
    'Education Loans',
  ];

  const rowsPerPage = 5;

  // Filter applications
  const filteredApplications = applications
    .filter(
      (app) =>
        (filters.status ? app.status === filters.status : true) &&
        (filters.category ? app.category === filters.category : true) &&
        (filters.search ? app.name.toLowerCase().includes(filters.search.toLowerCase()) : true)
    )
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleAction = (id, action) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: action } : app
      )
    );
    setSnackbar({
      open: true,
      message: `Application ${action === 'Approved' ? 'approved' : 'rejected'} successfully!`,
      severity: action === 'Approved' ? 'success' : 'error',
    });
  };

  const handleModalOpen = (app) => {
    setModalData(app);
  };

  const handleModalClose = () => {
    setModalData(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const exportDetails = () => {
    if (modalData) {
      const data = JSON.stringify(modalData, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LoanDetails_${modalData.id}.json`;
      a.click();
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Filter by Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Filter by Category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Name"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Applications Table */}
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount (PKR)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((app) => (
              <TableRow key={app.id} hover>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.category}</TableCell>
                <TableCell>{app.amount}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  {app.status === 'Pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAction(app.id, 'Approved')}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleAction(app.id, 'Rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outlined"
                    sx={{ ml: 1 }}
                    onClick={() => handleModalOpen(app)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(applications.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Paper>

      {/* Details Modal */}
      <Modal
        open={!!modalData}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!modalData}>
          <Paper sx={{ p: 4, mx: 'auto', maxWidth: 600, mt: '10%' }}>
            <Typography variant="h6" gutterBottom>
              Application Details
            </Typography>
            {modalData && (
              <>
                <Typography><strong>Name:</strong> {modalData.name}</Typography>
                <Typography><strong>Category:</strong> {modalData.category}</Typography>
                <Typography><strong>Subcategory:</strong> {modalData.subcategory}</Typography>
                <Typography><strong>Purpose:</strong> {modalData.purpose}</Typography>
                <Typography><strong>Amount:</strong> PKR {modalData.amount}</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>Guarantors:</Typography>
                {modalData.guarantors.map((g, i) => (
                  <Typography key={i}>
                    {g.name} - {g.phone} - {g.cnic}
                  </Typography>
                ))}
              </>
            )}
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" onClick={exportDetails} sx={{ mr: 2 }}>
                Export Details
              </Button>
              <Button variant="contained" onClick={handleModalClose}>
                Close
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
