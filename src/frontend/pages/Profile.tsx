import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  LinearProgress,
  Chip,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Speed as SpeedIcon,
  Grade as StarIcon,
  Timeline as ProgressIcon,
} from '@mui/icons-material';

const Profile: React.FC = () => {
  // 模拟用户数据
  const userData = {
    name: "哈利·波特",
    level: 15,
    title: "格兰芬多学院",
    avatar: "/src/assets/images/avatars/harry.jpg",
    experience: 75,
    stats: {
      totalPracticeTime: "24小时",
      averageSpeed: "45 WPM",
      accuracy: "95%",
      completedSpells: 42,
    },
    achievements: [
      {
        title: "初级魔法师",
        description: "完成所有基础课程",
        icon: "🏆",
        date: "2024-01-15"
      },
      {
        title: "速度之星",
        description: "达到50 WPM的打字速度",
        icon: "⚡",
        date: "2024-01-20"
      },
      {
        title: "完美施法者",
        description: "连续10次无错误完成咒语",
        icon: "✨",
        date: "2024-01-25"
      }
    ],
    recentActivities: [
      {
        spell: "阿拉霍洞开",
        accuracy: "98%",
        speed: "42 WPM",
        date: "2024-02-01"
      },
      {
        spell: "羽加迪姆勒维奥萨",
        accuracy: "95%",
        speed: "38 WPM",
        date: "2024-02-01"
      },
      {
        spell: "除你武器",
        accuracy: "92%",
        speed: "45 WPM",
        date: "2024-01-31"
      }
    ]
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/src/assets/images/profile-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pt: 4,
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 个人信息卡片 */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'rgba(20, 20, 28, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  src={userData.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    border: '4px solid #9c27b0',
                    boxShadow: '0 0 20px rgba(156, 39, 176, 0.3)',
                  }}
                />
                <Typography variant="h5" sx={{ color: '#fff', mt: 2, mb: 1 }}>
                  {userData.name}
                </Typography>
                <Chip
                  label={userData.title}
                  sx={{
                    backgroundColor: 'rgba(156, 39, 176, 0.2)',
                    color: '#9c27b0',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                  等级 {userData.level}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={userData.experience}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#9c27b0',
                    }
                  }}
                />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {userData.experience}% 到下一级
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    练习时长
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {userData.stats.totalPracticeTime}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    平均速度
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {userData.stats.averageSpeed}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    准确率
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {userData.stats.accuracy}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    已掌握咒语
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {userData.stats.completedSpells}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* 成就和最近活动 */}
          <Grid item xs={12} md={8}>
            {/* 成就 */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                backgroundColor: 'rgba(20, 20, 28, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
                最近成就
              </Typography>
              <Grid container spacing={3}>
                {userData.achievements.map((achievement, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        backgroundColor: 'rgba(156, 39, 176, 0.1)',
                        borderRadius: 2,
                        height: '100%',
                      }}
                    >
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {achievement.icon}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1 }}>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {achievement.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', mt: 1, display: 'block' }}>
                        {achievement.date}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* 最近活动 */}
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
                最近练习
              </Typography>
              {userData.recentActivities.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: index !== userData.recentActivities.length - 1 ? 2 : 0,
                    backgroundColor: 'rgba(156, 39, 176, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography sx={{ color: '#fff' }}>
                        {activity.spell}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        速度: {activity.speed}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        准确率: {activity.accuracy}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {activity.date}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile; 