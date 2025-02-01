import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Countdown timer state

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (countdown === 0) {
      navigate('/');
    }

    return () => clearInterval(interval);
  }, [countdown, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #6D83F2, #86A8E7, #91EAE4)',
        color: '#fff',
        p: 4,
      }}
    >
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            mb: 3,
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            textShadow: '2px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          Uh-oh! The page you’re looking for doesn’t exist.
        </Typography>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Typography variant="body1" sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.2rem' } }}>
          Redirecting to the homepage in <strong>{countdown} seconds</strong>.
        </Typography>
      </motion.div>

      {/* Call to Action Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              borderRadius: 8,
              px: 4,
              backgroundColor: '#ff6f61',
              '&:hover': { backgroundColor: '#e05a50' },
            }}
          >
            Go Back Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              borderRadius: 8,
              px: 4,
              color: '#fff',
              borderColor: '#fff',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: '#fff' },
            }}
          >
            Contact Support
          </Button>
        </Stack>
      </motion.div>

      {/* Additional Animated Graphics (Optional) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
    </Box>
  );
};

export default NotFound;
