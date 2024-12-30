import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Layout from './components/Layout';
import { UserDataProvider } from './contexts/UserDataContext';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserDataProvider>
        <Router>
          <Layout />
        </Router>
      </UserDataProvider>
    </ThemeProvider>
  );
};

export default App;
