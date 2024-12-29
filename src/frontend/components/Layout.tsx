import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  SportsEsports as GameIcon,
  Person as PersonIcon,
  Timeline as StatsIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  SportsKabaddi as SportsKabaddiIcon,
} from '@mui/icons-material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/', icon: <HomeIcon />, text: '首页' },
    { path: '/practice', icon: <GameIcon />, text: '练习' },
    { path: '/battle', icon: <SportsKabaddiIcon />, text: '战斗' },
    { path: '/profile', icon: <PersonIcon />, text: '个人资料' },
    { path: '/statistics', icon: <StatsIcon />, text: '统计' },
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#14141C',
      backgroundImage: 'url(/assets/images/background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      {/* 左侧导航栏 */}
      <Paper
        elevation={3}
        sx={{
          width: isCollapsed ? 60 : 200,
          backgroundColor: 'rgba(20, 20, 28, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          zIndex: 1000,
        }}
      >
        {/* Logo和收缩按钮 */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
          }}
        >
          {!isCollapsed && (
            <>
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                style={{ width: 32, height: 32 }}
              />
              <Box
                sx={{
                  color: '#ffd700',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  flex: 1,
                  ml: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                哈利波特打字
              </Box>
            </>
          )}
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{ 
              color: '#ffd700',
              p: 0.5,
              minWidth: 32,
            }}
          >
            {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        {/* 导航菜单 */}
        <List sx={{ flex: 1, pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#ffd700' : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: location.pathname === item.path ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                },
                borderRadius: 1,
                mb: 1,
                mx: 1,
                px: isCollapsed ? 1 : 2,
                minHeight: 48,
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#ffd700' : 'rgba(255, 255, 255, 0.7)',
                  minWidth: isCollapsed ? 32 : 40,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '1rem',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 主内容区域 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isCollapsed ? '60px' : '200px',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 