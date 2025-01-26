import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Use the named export QRCodeCanvas
import { Box, Typography, Button } from '@mui/material';

const SlipDownload = ({ slipDetails }) => {
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `slip-${slipDetails.token}.png`;
    downloadLink.click();
  };

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
      <Typography variant="h6" gutterBottom>
        Slip Details
      </Typography>
      <Typography variant="body1">Token Number: {slipDetails.token}</Typography>
      <Typography variant="body1">Date: {slipDetails.date}</Typography>
      <Typography variant="body1">Location: {slipDetails.location}</Typography>
      <Box sx={{ mt: 2 }}>
        <QRCodeCanvas
          id="qr-code"
          value={`Token: ${slipDetails.token}, Date: ${slipDetails.date}, Location: ${slipDetails.location}`}
          size={200}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={downloadQRCode}
      >
        Download Slip
      </Button>
    </Box>
  );
};

export default SlipDownload;
