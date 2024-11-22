import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Default mode, dynamically toggled
    primary: {
      main: '#0D47A1', // Bright blue for buttons and accents
    },
    secondary: {
      main: '#1565C0', // Medium blue for active states
    },
    background: {
      default: '#F5F5F5', // Light gray for main content background
      paper: '#FFFFFF', // Card or panel background
    },
    text: {
      primary: '#212121', // Main content text
      secondary: '#4A4A4A', // Secondary content text
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E3A8A', // Sidebar background
          color: '#FFFFFF', // Sidebar text color
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#1565C0', // Active item background
            color: '#FFFFFF', // Active item text
          },
          '&:hover': {
            backgroundColor: '#283593', // Hover background
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase for buttons
          '&:hover': {
            backgroundColor: '#1976D2', // Button hover color
          },
        },
      },
    },
  },
});

export default theme;
