import React, { useState } from 'react';
import { Box } from '@mui/material';
import MainMenu from './MainMenu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#14141C',
      backgroundImage: 'url(/src/assets/images/background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      <MainMenu isCollapsed={isMenuCollapsed} onCollapse={setIsMenuCollapsed} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMenuCollapsed ? '60px' : '200px',
          transition: 'margin-left 0.3s ease',
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 