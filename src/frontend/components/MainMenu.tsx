import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  SportsEsports as PracticeIcon,
  Person as ProfileIcon,
  BarChart as StatsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

interface MainMenuProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ isCollapsed, onCollapse }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <HomeIcon />, text: '首页' },
    { path: '/practice', icon: <PracticeIcon />, text: '练习' },
    { path: '/profile', icon: <ProfileIcon />, text: '个人资料' },
    { path: '/statistics', icon: <StatsIcon />, text: '统计' },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: isCollapsed ? '60px' : '200px',
        backgroundColor: 'rgba(20, 20, 28, 0.3)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 0,
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      <Box sx={{ 
        position: 'absolute',
        right: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1001,
      }}>
        <IconButton
          onClick={() => onCollapse(!isCollapsed)}
          sx={{
            width: '20px',
            height: '60px',
            borderRadius: '0 4px 4px 0',
            backgroundColor: 'rgba(20, 20, 28, 0.3)',
            backdropFilter: 'blur(12px)',
            color: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(30, 30, 38, 0.4)',
            },
          }}
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
        <img
          src="/assets/images/logo.png"
          alt="Logo"
          style={{
            width: isCollapsed ? '32px' : '40px',
            height: 'auto',
            transition: 'width 0.3s ease',
          }}
        />
        {!isCollapsed && (
          <Box
            component="span"
            sx={{
              ml: 2,
              color: 'rgba(255, 215, 0, 0.9)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              opacity: isCollapsed ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            哈利波特打字
          </Box>
        )}
      </Box>

      <List sx={{ flexGrow: 1, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            sx={{
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              color: location.pathname === item.path ? 'rgba(255, 215, 0, 0.9)' : 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {item.icon}
            {!isCollapsed && (
              <Box
                component="span"
                sx={{
                  ml: 2,
                  opacity: isCollapsed ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {item.text}
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MainMenu; 