import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const LoanCard = ({ title, description, max }) => {
  return (
    <Card sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
          Max Loan: {max}
        </Typography>
      </CardContent>
      <Button variant="contained" color="primary" sx={{ m: 2 }}>
        Apply Now
      </Button>
    </Card>
  );
};

export default LoanCard;
