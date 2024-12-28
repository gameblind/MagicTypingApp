import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7b1fa2', // 紫色，代表魔法
      light: '#ae52d4',
      dark: '#4a0072',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffd700', // 金色，代表金色飞贼
      light: '#ffff52',
      dark: '#c7a600',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f', // 红色，代表错误
      light: '#ef5350',
      dark: '#c62828',
    },
    success: {
      main: '#388e3c', // 绿色，代表正确
      light: '#4caf50',
      dark: '#2e7d32',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          padding: '8px 24px',
        },
        contained: {
          boxShadow: '0 3px 5px 2px rgba(123, 31, 162, .3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
