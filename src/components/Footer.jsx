import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SendIcon from '@mui/icons-material/Send';

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
        pt: 6,
        pb: 4,
        mt: 5,
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
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
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
                sx={{ justifyContent: 'flex-start' }}
              >
                Home
              </Button>
              <Button
                variant="text"
                color="inherit"
                href="/loan-request"
                sx={{ justifyContent: 'flex-start' }}
              >
                Loans
              </Button>
              
              <Button
                variant="text"
                color="inherit"
                href="/contact"
                sx={{ justifyContent: 'flex-start' }}
              >
                Contact Us
              </Button>
            </Box>
          </Grid>

          {/* Column 3: Newsletter Subscription */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 2 }}>
              Stay updated with the latest news and offers. Subscribe now!
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                size="small"
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  flexGrow: 1,
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ minWidth: '48px', height: '40px' }}
              >
                <SendIcon />
              </Button>
            </Box>
          </Grid>

          {/* Column 4: Contact & Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 2 }}>
              Connect with us on social media for the latest updates.
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
              <IconButton
                aria-label="YouTube"
                color="inherit"
                href="https://youtube.com"
                target="_blank"
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Content */}
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Saylani Microfinance. All Rights
            Reserved.
          </Typography>
          <Button
            onClick={scrollToTop}
            sx={{
              color: '#fff',
              textDecoration: 'underline',
              fontWeight: 'bold',
            }}
          >
            Back to Top
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
