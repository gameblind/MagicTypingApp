import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Keyboard as KeyboardIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: '趣味练习',
      description: '通过哈利波特魔法世界场景，让打字练习变得有趣',
      icon: <KeyboardIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: '成就系统',
      description: '完成任务获得成就，解锁新的魔法咒语和角色',
      icon: <TrophyIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
    },
    {
      title: '进度追踪',
      description: '实时记录练习数据，直观展示进步轨迹',
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
    },
    {
      title: '魔法学院',
      description: '从新手魔法师到魔法大师的进阶之路',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.error.main,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            color: theme.palette.primary.main,
          }}
        >
          欢迎来到哈利波特打字冒险
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          sx={{ mb: 6 }}
        >
          在魔法世界中提升你的打字技能
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '50%',
                        backgroundColor: `${feature.color}20`,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </Box>
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/practice')}
            startIcon={<KeyboardIcon />}
          >
            开始练习
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/profile')}
            startIcon={<SchoolIcon />}
          >
            查看资料
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 