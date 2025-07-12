import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
  Container,
  Paper,
  Button,
} from '@mui/material';
import Carousel from './carousel/Carousel';
import Gallery from './gallery/Gallery';

const Home = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', bgcolor: theme.palette.background.default }}>
      {/* Carousel Section */}
      <Carousel />

      {/* Programs Section */}
      <Box sx={{ py: 6, bgcolor: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            color="text.primary"
            fontWeight={700}
          >
            Our Programs
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {['Elementary Department', 'Middle Department', 'High Department'].map((program, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={3} sx={{ borderRadius: 2, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 4,
                      bgcolor: theme.palette.background.default,
                      boxShadow: theme.shadows[5],
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        align="center"
                        color="primary"
                        fontWeight={600}
                      >
                        {program}
                      </Typography>
                      <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                        Discover the unique opportunities and experiences our {program.toLowerCase()} offers to students.
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" color="primary" sx={{ '&:hover': { bgcolor: 'primary.dark' } }}>
                          More Info
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Box sx={{ py: 6, bgcolor: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            color="text.primary"
            fontWeight={700}
          >
            Registered Departments
          </Typography>
          <Gallery />
        </Container>
      </Box>

      {/* Future Testimonials Section (if needed)
      <Box sx={{ py: 5, textAlign: 'center', bgcolor: '#f9f9f9' }}>
        <Typography variant="h4" gutterBottom>
          What Parents Say
        </Typography>
        <Box maxWidth="600px" mx="auto" mt={2}>
          <Typography variant="body1" color="text.secondary">
            "This Department has been a fantastic experience for my children. The faculty is supportive, and the programs are enriching!"
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            - Parent of Grade 3 Student
          </Typography>
        </Box>
      </Box>
      */}
    </Box>
  );
};

export default Home;
