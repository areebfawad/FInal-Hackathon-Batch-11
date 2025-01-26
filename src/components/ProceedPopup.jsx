import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const ProceedPopup = ({ open, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({ cnic: '', email: '', name: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          margin: 'auto',
          marginTop: '15%',
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Proceed with Application
        </Typography>
        <TextField
          fullWidth
          label="CNIC"
          name="cnic"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default ProceedPopup;
