// lightTheme.js
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6D00',       // Vibrant orange
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#263238',       // Deep gray/blackish
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFAFA',    // Light gray background
      paper: '#FFFFFF',      // Card/Component white
    },
    text: {
      primary: '#212121',    // Dark for readability
      secondary: '#555555',  // Slightly lighter
    },
    divider: '#E0E0E0',       // Subtle dividers
  },

  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Arial', sans-serif`,
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      color: '#212121',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.9rem',
      color: '#555',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#E65100', // Darker orange on hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CCC',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF6D00',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF6D00',
            borderWidth: 2,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#666',
          '&.Mui-focused': {
            color: '#FF6D00',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1: 'p',
          body2: 'span',
        },
      },
    },
  },
});

export default lightTheme;
