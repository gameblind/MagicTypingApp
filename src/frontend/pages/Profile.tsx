import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

interface Achievement {
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '哈利·波特',
    level: '进阶巫师',
    exp: 280,
    nextLevelExp: 300,
    totalPracticeTime: 120,
    averageAccuracy: 95.5,
    averageWpm: 45,
  });

  const achievements: Achievement[] = [
    {
      title: '初级魔法师',
      description: '完成基础打字练习',
      icon: <SchoolIcon color="primary" />,
      progress: 100,
    },
    {
      title: '速度之星',
      description: '达到50WPM的打字速度',
      icon: <TimelineIcon color="secondary" />,
      progress: 90,
    },
    {
      title: '准确无误',
      description: '连续5次练习达到98%准确率',
      icon: <StarIcon color="warning" />,
      progress: 75,
    },
    {
      title: '魔法大师',
      description: '解锁所有魔法咒语',
      icon: <TrophyIcon color="error" />,
      progress: 60,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* 个人信息卡片 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    bgcolor: 'primary.main',
                  }}
                >
                  {userData.name[0]}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {userData.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {userData.level}
                </Typography>

                <Box sx={{ width: '100%', mt: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    经验值进度
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(userData.exp / userData.nextLevelExp) * 100}
                    sx={{ mt: 1, mb: 1 }}
                  />
                  <Typography variant="body2" align="right">
                    {userData.exp} / {userData.nextLevelExp}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* 统计信息卡片 */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                练习统计
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        总练习时间
                      </Typography>
                      <Typography variant="h4">
                        {userData.totalPracticeTime}
                      </Typography>
                      <Typography color="textSecondary">分钟</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        平均准确率
                      </Typography>
                      <Typography variant="h4">
                        {userData.averageAccuracy}
                      </Typography>
                      <Typography color="textSecondary">%</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        平均速度
                      </Typography>
                      <Typography variant="h4">{userData.averageWpm}</Typography>
                      <Typography color="textSecondary">WPM</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* 成就列表 */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                魔法成就
              </Typography>
              <List>
                {achievements.map((achievement, index) => (
                  <React.Fragment key={achievement.title}>
                    <ListItem>
                      <ListItemIcon>{achievement.icon}</ListItemIcon>
                      <ListItemText
                        primary={achievement.title}
                        secondary={achievement.description}
                      />
                      <Box sx={{ width: '30%', ml: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={achievement.progress}
                        />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          align="right"
                        >
                          {achievement.progress}%
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < achievements.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile; 