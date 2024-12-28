import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

// 导入页面组件
import Home from './pages/Home';
import Practice from './pages/Practice';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';

// 导入布局组件
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
