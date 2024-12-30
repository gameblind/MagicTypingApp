import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  EmojiEvents as TrophyIcon,
  Timeline as StatsIcon,
  SportsKabaddi as BattleIcon,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // 模拟最近练习数据
  const recentPractices = [
    { spell: '除你武器', accuracy: 95, wpm: 45, date: '2023-12-30' },
    { spell: '昏昏倒地', accuracy: 88, wpm: 42, date: '2023-12-29' },
    { spell: '盔甲护身', accuracy: 92, wpm: 40, date: '2023-12-28' },
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 4,
      px: 2,
    }}>
      <Container maxWidth="lg">
        {/* 欢迎区域 */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: 'rgba(20, 20, 28, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" component="h1" sx={{ color: '#ffd700', mb: 2 }}>
            欢迎来到霍格沃茨打字学院
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
            通过打字练习掌握魔法咒语，成为最优秀的巫师
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayIcon />}
            onClick={() => navigate('/practice')}
            sx={{
              backgroundColor: '#ffd700',
              color: '#14141C',
              '&:hover': {
                backgroundColor: '#ffed4a',
              },
              px: 4,
              py: 1.5,
            }}
          >
            开始练习
          </Button>
        </Paper>

        {/* 功能卡片 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{
              backgroundColor: 'rgba(20, 20, 28, 0.7)',
              backdropFilter: 'blur(10px)',
              height: '100%',
            }}>
              <CardContent>
                <Box sx={{ color: '#ffd700', mb: 2 }}>
                  <TrophyIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#ffd700', mb: 1 }}>
                  每日目标
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  完成今日练习目标，获得特殊奖励
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ color: '#ffd700' }}>查看详情</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{
              backgroundColor: 'rgba(20, 20, 28, 0.7)',
              backdropFilter: 'blur(10px)',
              height: '100%',
            }}>
              <CardContent>
                <Box sx={{ color: '#ffd700', mb: 2 }}>
                  <BattleIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#ffd700', mb: 1 }}>
                  魔法对决
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  通过打字施放魔法，击败你的对手
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  sx={{ color: '#ffd700' }}
                  onClick={() => navigate('/battle')}
                >
                  开始对决
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{
              backgroundColor: 'rgba(20, 20, 28, 0.7)',
              backdropFilter: 'blur(10px)',
              height: '100%',
            }}>
              <CardContent>
                <Box sx={{ color: '#ffd700', mb: 2 }}>
                  <StatsIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#ffd700', mb: 1 }}>
                  进度统计
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  查看你的练习数据和进步趋势
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  sx={{ color: '#ffd700' }}
                  onClick={() => navigate('/statistics')}
                >
                  查看统计
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* 最近练习记录 */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: 'rgba(20, 20, 28, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
          }}
        >
          <Typography variant="h6" sx={{ color: '#ffd700', mb: 3 }}>
            最近练习记录
          </Typography>
          <Grid container spacing={2}>
            {recentPractices.map((practice, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}>
                  <Typography variant="h6" sx={{ color: '#ffd700' }}>
                    {practice.spell}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    准确率: {practice.accuracy}%
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    速度: {practice.wpm} WPM
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {practice.date}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home; 