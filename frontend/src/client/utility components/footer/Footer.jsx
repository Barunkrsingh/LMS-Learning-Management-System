// src/Footer.js
import React from 'react';
import { Box, Typography, Container, Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LinkedinIcon from '@mui/icons-material/Linkedin';
import GithubIcon from '@mui/icons-material/Github';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        py: 4,
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 600 }}>
          Learning Management System
        </Typography>
       {/* Social Media Icons */}
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 2 }}>
          <EmailIcon fontSize="medium" sx={{ cursor: 'pointer', '&:hover': { color: '#3b5998' } }} />
          <LinkedinIcon fontSize="medium" sx={{ cursor: 'pointer', '&:hover': { color: '#00acee' } }} />
          <GithubIcon fontSize="medium" sx={{ cursor: 'pointer', '&:hover': { color: '#e1306c' } }} />
        </Stack>

        <Typography variant="body2" align="center" color="text.secondary">
          &copy; {new Date().getFullYear()} Barun Kumar Singh. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
