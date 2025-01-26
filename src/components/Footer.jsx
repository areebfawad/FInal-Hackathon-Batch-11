import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Button,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0d47a1',
        color: '#fff',
        py: 4,
        mt: 5,
        textAlign: 'center',
      }}
    >
      <Container>
        {/* Footer Main Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Column 1: About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Saylani Microfinance is committed to empowering individuals and
              communities through financial solutions. Join us in building a
              brighter future.
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="text"
                color="inherit"
                href="/"
                sx={{ textAlign: 'left' }}
              >
                Home
              </Button>
              <Button
                variant="text"
                color="inherit"
                href="/loans"
                sx={{ textAlign: 'left' }}
              >
                Loans
              </Button>
              <Button
                variant="text"
                color="inherit"
                href="/profile"
                sx={{ textAlign: 'left' }}
              >
                Profile
              </Button>
              <Button
                variant="text"
                color="inherit"
                href="/contact"
                sx={{ textAlign: 'left' }}
              >
                Contact Us
              </Button>
            </Box>
          </Grid>

          {/* Column 3: Contact Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Address: Saylani Microfinance, Karachi, Pakistan
            </Typography>
            <Typography variant="body2">Phone: +92 123 456 7890</Typography>
            <Typography variant="body2">Email: info@saylani.org</Typography>
          </Grid>

          {/* Column 4: Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                aria-label="Facebook"
                color="inherit"
                href="https://facebook.com"
                target="_blank"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                color="inherit"
                href="https://twitter.com"
                target="_blank"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                color="inherit"
                href="https://instagram.com"
                target="_blank"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                color="inherit"
                href="https://linkedin.com"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Content */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            pt: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Saylani Microfinance. All Rights
            Reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Designed and developed for a better tomorrow.
          </Typography>
          <Button
            onClick={scrollToTop}
            sx={{ mt: 2, color: '#fff', textDecoration: 'underline' }}
          >
            Back to Top
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
