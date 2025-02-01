import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  TextField,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from 'react-material-ui-carousel';
import LoanCalculator from '../components/LoanCalculator'; // Import LoanCalculator component
import { sendContactForm } from '../services/api'; // Backend API for "Get in Touch" form

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

const testimonials = [
  {
    name: 'Ali Khan',
    message:
      'Saylani Microfinance helped me kickstart my business. Their team was supportive, and the process was seamless.',
    image: 'https://livingwatersdownunder.com/wp-content/uploads/2018/08/profile-image-emeal-zwayne-1x1.jpg',
  },
  {
    name: 'Sara Ahmed',
    message:
      'The education loan allowed me to complete my degree without financial stress. Highly recommended!',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Usman Farooq',
    message:
      'I was able to renovate my home with their home construction loan. The process was transparent and quick!',
    image: 'https://via.placeholder.com/150',
  },
];

const LandingPage = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState({ success: null, error: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      await sendContactForm(contactForm); // API call to send contact form data
      setSubmissionStatus({ success: true, error: '' });
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmissionStatus({ success: false, error: 'Failed to submit. Please try again later.' });
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            'url(https://media.istockphoto.com/id/1017183652/photo/team-teamwork-business-join-hand-together-concept-power-of-volunteer-charity-work-stack-of.jpg?s=612x612&w=0&k=20&c=HjuuqwkDKxQ3Y1cRtra7iYTpjQVoMmG2szbse6BMA_k=)',
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
          <Typography
            variant="h5"
            sx={{ mb: 3, textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
          >
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
            href="/loan-request"
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
                  <Typography variant="h3" sx={{ mb: 2, color: '#1976d2' }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {category.name}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{category.description}</Typography>
                  <Button variant="outlined" color="primary" href={category.link}>
                    Explore
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Loan Calculator */}
      <Box sx={{ py: 12 }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            Calculate Your Loan
          </Typography>
          <LoanCalculator />
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            What Our Clients Say
          </Typography>
          <Carousel>
            {testimonials.map((testimonial, index) => (
              <Paper
                key={index}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                  borderRadius: '10px',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {testimonial.message}
                </Typography>
              </Paper>
            ))}
          </Carousel>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            Get in Touch
          </Typography>
          <Paper
            sx={{
              p: 4,
              mx: 'auto',
              maxWidth: 600,
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              variant="outlined"
              value={contactForm.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Your Email"
              name="email"
              variant="outlined"
              value={contactForm.email}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Your Message"
              name="message"
              variant="outlined"
              multiline
              rows={4}
              value={contactForm.message}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit}>
              Send Message
            </Button>
            {submissionStatus.success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Message sent successfully!
              </Alert>
            )}
            {submissionStatus.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {submissionStatus.error}
              </Alert>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
