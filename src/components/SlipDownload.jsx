import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Import the QRCodeCanvas component
import { Box, Typography, Button, Alert } from '@mui/material';

const SlipDownload = ({ slipDetails }) => {
  // Validate slip details
  if (!slipDetails || !slipDetails.token || !slipDetails.date || !slipDetails.location) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          border: '1px solid #ddd',
          borderRadius: 2,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Alert severity="error">Invalid slip details provided!</Alert>
      </Box>
    );
  }

  const downloadQRCode = () => {
    try {
      const canvas = document.getElementById('qr-code');
      if (!canvas) throw new Error('QR code not found');
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `slip-${slipDetails.token}.png`;
      downloadLink.click();
    } catch (err) {
      console.error('Error downloading QR code:', err);
      alert('Failed to download the QR code. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: 4,
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        maxWidth: '400px',
        margin: 'auto',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Slip Details
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Token Number:
        </Typography>
        <Typography variant="body2">{slipDetails.token}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Date:
        </Typography>
        <Typography variant="body2">{slipDetails.date}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Location:
        </Typography>
        <Typography variant="body2">{slipDetails.location}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <QRCodeCanvas
          id="qr-code"
          value={`Token: ${slipDetails.token}, Date: ${slipDetails.date}, Location: ${slipDetails.location}`}
          size={200}
          style={{ border: '1px solid #ddd', borderRadius: '8px' }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          backgroundColor: '#1976d2',
          '&:hover': { backgroundColor: '#115293' },
        }}
        onClick={downloadQRCode}
      >
        Download Slip
      </Button>
    </Box>
  );
};

export default SlipDownload;
