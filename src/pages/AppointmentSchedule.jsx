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
  Modal,
  Fade,
  Backdrop,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

const AppointmentSchedule = () => {
  const [approvedRequests, setApprovedRequests] = useState([
    {
      id: 1,
      name: 'John Doe',
      category: 'Business Startup Loans',
      amount: 500000,
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      category: 'Education Loans',
      amount: 300000,
      status: 'Pending',
    },
  ]);
  const [modalData, setModalData] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleModalOpen = (request) => {
    setModalData(request);
  };

  const handleModalClose = () => {
    setModalData(null);
    setAppointmentDate('');
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleScheduleAppointment = () => {
    if (!appointmentDate) {
      setSnackbar({
        open: true,
        message: 'Please select a date and time for the appointment.',
        severity: 'error',
      });
      return;
    }

    setApprovedRequests((prev) =>
      prev.map((req) =>
        req.id === modalData.id
          ? { ...req, status: 'Scheduled', appointmentDate }
          : req
      )
    );

    setSnackbar({
      open: true,
      message: 'Appointment scheduled successfully!',
      severity: 'success',
    });

    handleModalClose();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Appointment Schedule
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount (PKR)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvedRequests.map((request) => (
              <TableRow key={request.id} hover>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.category}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        request.status === 'Pending'
                          ? 'warning.main'
                          : 'success.main',
                    }}
                  >
                    {request.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  {request.appointmentDate || 'Not Scheduled'}
                </TableCell>
                <TableCell>
                  {request.status === 'Pending' && (
                    <Button
                      variant="outlined"
                      onClick={() => handleModalOpen(request)}
                    >
                      Schedule Appointment
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal for Scheduling Appointment */}
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
          <Paper sx={{ p: 4, mx: 'auto', maxWidth: 500, mt: '10%' }}>
            <Typography variant="h6" gutterBottom>
              Schedule Appointment
            </Typography>
            {modalData && (
              <>
                <Typography sx={{ mb: 2 }}>
                  <strong>Name:</strong> {modalData.name}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <strong>Category:</strong> {modalData.category}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <strong>Amount:</strong> PKR {modalData.amount}
                </Typography>
                <TextField
                  type="datetime-local"
                  fullWidth
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  label="Appointment Date & Time"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleScheduleAppointment}
                  >
                    Confirm
                  </Button>
                  <Button variant="contained" onClick={handleModalClose}>
                    Cancel
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>

      {/* Snackbar for Notifications */}
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
    </Box>
  );
};

export default AppointmentSchedule;
