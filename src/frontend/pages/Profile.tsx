import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Badge,
} from '@mui/material';
import {
  School as SchoolIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  AutoStories as SpellIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const Profile: React.FC = () => {
  // 模拟用户数据
  const [userData] = useState({
    name: '哈利·波特',
    avatar: '/assets/images/harry.png',
    house: '格兰芬多',
    level: 5,
    exp: 75,
    title: '魔法学徒',
    spellsUnlocked: 12,
    totalSpells: 20,
    achievements: [
      { id: 1, name: '初次施法', description: '完成第一次打字练习', icon: '🎯' },
      { id: 2, name: '速度之星', description: '达到50WPM', icon: '⚡' },
      { id: 3, name: '完美施法', description: '100%准确率完成练习', icon: '✨' },
      { id: 4, name: '决斗高手', description: '赢得10场决斗', icon: '🏆' },
    ],
    unlockedSpells: [
      { name: '除你武器', mastery: 80 },
      { name: '昏昏倒地', mastery: 65 },
      { name: '盔甲护身', mastery: 90 },
      { name: '统统石化', mastery: 45 },
    ],
  });

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 4,
      px: 2,
    }}>
      <Container maxWidth="lg">
        {/* 基本信息卡片 */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            backgroundColor: 'rgba(20, 20, 28, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Avatar
                    sx={{
                      bgcolor: '#ffd700',
                      width: 22,
                      height: 22,
                      border: '2px solid rgba(20, 20, 28, 0.7)',
                    }}
                  >
                    <EditIcon sx={{ fontSize: 14 }} />
                  </Avatar>
                }
              >
                <Avatar
                  src={userData.avatar}
                  sx={{ width: 120, height: 120, border: '3px solid #ffd700' }}
                />
              </Badge>
            </Grid>
            <Grid item xs={12} sm>
              <Typography variant="h4" sx={{ color: '#ffd700', mb: 1 }}>
                {userData.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ color: '#ffd700', mr: 1 }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {userData.house}
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
                  等级 {userData.level} - {userData.title}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={userData.exp}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#ffd700',
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                已解锁 {userData.spellsUnlocked}/{userData.totalSpells} 个咒语
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4}>
          {/* 成就展示 */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                backgroundColor: 'rgba(20, 20, 28, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrophyIcon sx={{ color: '#ffd700', mr: 1 }} />
                <Typography variant="h6" sx={{ color: '#ffd700' }}>
                  成就
                </Typography>
              </Box>
              <List>
                {userData.achievements.map((achievement) => (
                  <ListItem
                    key={achievement.id}
                    sx={{
                      mb: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                    }}
                  >
                    <ListItemIcon sx={{ color: '#ffd700', fontSize: '24px' }}>
                      {achievement.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ color: '#ffd700' }}>
                          {achievement.name}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          {achievement.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* 已解锁咒语 */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                backgroundColor: 'rgba(20, 20, 28, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SpellIcon sx={{ color: '#ffd700', mr: 1 }} />
                <Typography variant="h6" sx={{ color: '#ffd700' }}>
                  已掌握咒语
                </Typography>
              </Box>
              <List>
                {userData.unlockedSpells.map((spell, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      mb: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ color: '#ffd700', mb: 1 }}>
                          {spell.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                              熟练度
                            </Typography>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                              {spell.mastery}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={spell.mastery}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: '#ffd700',
                              },
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile; 