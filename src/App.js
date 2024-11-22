import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Sidebar from './components/Sidebar';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionManagement from './components/PermissionManagement';
import LandingPage from './components/LandingPage';
import theme from './theme';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const appliedTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode: darkMode ? 'dark' : 'light',
      background: {
        ...theme.palette.background,
        default: darkMode ? '#121212' : '#F5F5F5',
        paper: darkMode ? '#1E1E1E' : '#FFFFFF',
      },
      text: {
        ...theme.palette.text,
        primary: darkMode ? '#E0E0E0' : '#212121',
        secondary: darkMode ? '#BDBDBD' : '#4A4A4A',
      },
    },
  });

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', position: 'relative' }}>
            {/* Dark Mode Toggle */}
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                color="inherit"
                sx={{
                  background: darkMode ? '#444' : '#EEE',
                  borderRadius: '50%',
                  padding: '10px',
                }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>

            {/* Dynamic Routes */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/permissions" element={<PermissionManagement />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
