import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { UserDataProvider } from './contexts/UserDataContext';
import { StatisticsProvider } from './contexts/StatisticsContext';
import theme from './theme';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserDataProvider>
        <StatisticsProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </StatisticsProvider>
      </UserDataProvider>
    </ThemeProvider>
  );
};

export default App;
