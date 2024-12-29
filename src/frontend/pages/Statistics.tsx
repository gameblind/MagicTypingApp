import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Timer as TimerIcon,
  Check as AccuracyIcon,
  TrendingUp as TrendIcon,
} from '@mui/icons-material';

// 这里可以添加图表库的导入，比如 recharts
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Statistics: React.FC = () => {
  // 模拟统计数据
  const stats = {
    overview: {
      totalTime: "48小时",
      averageSpeed: "45 WPM",
      accuracy: "95%",
      improvement: "+15%",
    },
    dailyProgress: [
      { date: "2024-01-25", speed: 42, accuracy: 93 },
      { date: "2024-01-26", speed: 44, accuracy: 94 },
      { date: "2024-01-27", speed: 43, accuracy: 95 },
      { date: "2024-01-28", speed: 45, accuracy: 94 },
      { date: "2024-01-29", speed: 46, accuracy: 96 },
      { date: "2024-01-30", speed: 47, accuracy: 95 },
      { date: "2024-01-31", speed: 48, accuracy: 97 },
    ],
    spellStats: [
      {
        name: "阿拉霍洞开",
        attempts: 25,
        bestSpeed: 52,
        averageAccuracy: 96,
        progress: 85,
      },
      {
        name: "羽加迪姆勒维奥萨",
        attempts: 20,
        bestSpeed: 48,
        averageAccuracy: 94,
        progress: 75,
      },
      {
        name: "除你武器",
        attempts: 18,
        bestSpeed: 45,
        averageAccuracy: 92,
        progress: 70,
      },
      {
        name: "呼神护卫",
        attempts: 15,
        bestSpeed: 42,
        averageAccuracy: 90,
        progress: 65,
      },
    ],
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/assets/images/hogwarts-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pt: 4,
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* 概览卡片 */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 28, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(156, 39, 176, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <TimerIcon sx={{ fontSize: 30, color: '#9c27b0' }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
                {stats.overview.totalTime}
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                总练习时长
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 28, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 193, 7, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <SpeedIcon sx={{ fontSize: 30, color: '#ffc107' }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
                {stats.overview.averageSpeed}
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                平均速度
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 28, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <AccuracyIcon sx={{ fontSize: 30, color: '#4caf50' }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
                {stats.overview.accuracy}
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                平均准确率
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 28, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <TrendIcon sx={{ fontSize: 30, color: '#f44336' }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
                {stats.overview.improvement}
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                进步幅度
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 咒语统计 */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: 'rgba(20, 20, 28, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            mb: 4,
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
            咒语掌握度
          </Typography>
          <Grid container spacing={3}>
            {stats.spellStats.map((spell, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#fff' }}>
                      {spell.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {spell.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={spell.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      mb: 1,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#9c27b0',
                      }
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.875rem',
                    }}
                  >
                    <span>尝试次数: {spell.attempts}</span>
                    <span>最佳速度: {spell.bestSpeed} WPM</span>
                    <span>平均准确率: {spell.averageAccuracy}%</span>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* 每日进度图表 */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: 'rgba(20, 20, 28, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
            每日进度
          </Typography>
          {/* 这里可以添加图表组件 */}
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              图表区域 - 可以使用 Recharts 等库实现
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Statistics; 