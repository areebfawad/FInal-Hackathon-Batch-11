import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  TextField,
} from '@mui/material';
import Footer from '../components/Footer';

const loanCategories = [
  {
    name: 'Education Loans',
    description: 'Support for educational fees, tuition, and more.',
    link: '/loans/education',
    icon: '🎓',
  },
  {
    name: 'Wedding Loans',
    description: 'Financial help for wedding-related expenses.',
    link: '/loans/wedding',
    icon: '💍',
  },
  {
    name: 'Business Startup Loans',
    description: 'Kickstart your small business with flexible loans.',
    link: '/loans/startup',
    icon: '📈',
  },
  {
    name: 'Home Construction Loans',
    description: 'Loans for building or renovating your dream home.',
    link: '/loans/home',
    icon: '🏠',
  },
];

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmFYs5C8YTQ2WJD9ZjHl4mJfJ7gjih9ydwXQ&s)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Container>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            }}
          >
            Welcome to Saylani Microfinance
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            Empowering communities through financial support.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#115293' },
            }}
          >
            Apply Now
          </Button>
        </Container>
      </Box>

      {/* Loan Categories */}
      <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            Our Loan Categories
          </Typography>
          <Grid container spacing={4}>
            {loanCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    cursor: 'pointer',
                    height: '100%',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ mb: 2, color: '#1976d2' }}
                  >
                    {category.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {category.name}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{category.description}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={category.link}
                  >
                    Explore
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Loan Calculator */}
      <Box sx={{ py: 6 }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            Calculate Your Loan
          </Typography>
          <Paper
            sx={{
              p: 4,
              mx: 'auto',
              maxWidth: 600,
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Loan Amount (PKR)"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Loan Period (Years)"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    py: 1.5,
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#115293' },
                  }}
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* About Us */}
      <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}
          >
            Saylani Microfinance is committed to empowering individuals and
            communities by providing accessible financial solutions. Our mission
            is to enable economic growth and stability for everyone. Join us in
            building a brighter tomorrow.
          </Typography>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: 6 }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            Why Choose Saylani Microfinance?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
              mb: 4,
            }}
          >
            We offer customized loan options tailored to your specific needs.
            Our team of experts is here to guide you every step of the way,
            ensuring transparency and affordability. Join the thousands of
            satisfied clients who have benefited from our financial services.
          </Typography>
        </Container>
      </Box>

      
      {/* <Footer /> */}
    </Box>
  );
};

export default LandingPage;
