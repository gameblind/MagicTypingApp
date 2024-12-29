import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import {
  Keyboard as KeyboardIcon,
  EmojiEvents as TrophyIcon,
  Timeline as ProgressIcon,
  School as AcademyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "趣味练习",
      description: "通过哈利波特魔法世界场景，让打字练习变得有趣",
      icon: <KeyboardIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      color: 'rgba(156, 39, 176, 0.1)',
      path: '/practice'
    },
    {
      title: "成就系统",
      description: "完成任务获得成就，解锁新的魔法咒语和角色",
      icon: <TrophyIcon sx={{ fontSize: 40, color: '#ffc107' }} />,
      color: 'rgba(255, 193, 7, 0.1)',
      path: '/achievements'
    },
    {
      title: "进度追踪",
      description: "实时记录练习数据，直观展示进步轨迹",
      icon: <ProgressIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
      color: 'rgba(76, 175, 80, 0.1)',
      path: '/statistics'
    },
    {
      title: "魔法学院",
      description: "从新手魔法师到魔法大师的进阶之路",
      icon: <AcademyIcon sx={{ fontSize: 40, color: '#f44336' }} />,
      color: 'rgba(244, 67, 54, 0.1)',
      path: '/profile'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/images/hogwarts-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              color: '#9c27b0',
              fontFamily: '"Harry Potter", fantasy',
              textShadow: '0 0 20px rgba(156, 39, 176, 0.5)',
              mb: 2,
            }}
          >
            欢迎来到哈利波特打字冒险
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              fontWeight: 300,
            }}
          >
            在魔法世界中提升你的打字技能
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: 'rgba(20, 20, 28, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
                onClick={() => navigate(feature.path)}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: feature.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: '#fff',
                    mb: 2,
                    fontWeight: 'bold',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    flex: 1,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/practice')}
            sx={{
              backgroundColor: '#9c27b0',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: '#7b1fa2',
              },
            }}
          >
            开始练习
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 