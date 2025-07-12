import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Typography, Box, Button, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const carouselItems = [
  {
    image: 'https://bcetdgp.ac.in/HTML/CSE/images/blog/lab5.jpg',
    title: 'Department',
    description: 'Engaging and inspiring environments for every student.',
  },
  {
    image: 'https://media.collegedekho.com/media/img/institute/crawled_images/13015_BCET_New.jpg?width=1080',
    title: 'Empowering Students',
    description: 'We believe in fostering the potential of each child.',
  },
  {
    image: 'https://bcetdgp.ac.in/wp-content/uploads/2024/03/home-slide-1-1.jpg',
    title: 'Learning Tools',
    description: 'Providing the right tools for effective learning.',
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const handleBack = () => {
    setActiveIndex((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <SwipeableViews index={activeIndex} onChangeIndex={setActiveIndex}>
        {carouselItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              textAlign: 'center',
              overflow: 'hidden',
              fontFamily: theme.typography.fontFamily,
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: '100%',
                height: { xs: '60vh', md: '70vh' },
                minHeight: 400,
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 30,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: theme.palette.background.paper,
                px: 4,
                py: 2,
                borderRadius: 2,
                maxWidth: '80%',
                boxShadow: theme.shadows[3],
              }}
            >
              <Typography
                variant="h5"
                fontWeight={600}
                color={theme.palette.text.primary}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.text.secondary}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </SwipeableViews>

      {/* Navigation Buttons */}
      <Button
        onClick={handleBack}
        aria-label="Previous Slide"
        sx={{
          position: 'absolute',
          top: '50%',
          left: 10,
          transform: 'translateY(-50%)',
          zIndex: 2,
          minWidth: 40,
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 18 }} />
      </Button>

      <Button
        onClick={handleNext}
        aria-label="Next Slide"
        sx={{
          position: 'absolute',
          top: '50%',
          right: 10,
          transform: 'translateY(-50%)',
          zIndex: 2,
          minWidth: 40,
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
      </Button>

      {/* Pagination Dots */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {carouselItems.map((_, index) => (
          <Box
            key={index}
            sx={{
              height: 10,
              width: 10,
              mx: 0.6,
              borderRadius: '50%',
              backgroundColor:
                index === activeIndex
                  ? theme.palette.primary.main
                  : theme.palette.grey[500],
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
