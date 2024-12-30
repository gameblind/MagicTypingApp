import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Statistics: React.FC = () => {
  // 模拟练习数据
  const practiceData = [
    { date: '12-24', wpm: 35, accuracy: 88 },
    { date: '12-25', wpm: 38, accuracy: 90 },
    { date: '12-26', wpm: 42, accuracy: 92 },
    { date: '12-27', wpm: 40, accuracy: 89 },
    { date: '12-28', wpm: 45, accuracy: 91 },
    { date: '12-29', wpm: 43, accuracy: 93 },
    { date: '12-30', wpm: 48, accuracy: 94 },
  ];

  // 模拟咒语使用数据
  const spellUsageData = [
    { name: '除你武器', value: 30 },
    { name: '昏昏倒地', value: 25 },
    { name: '盔甲护身', value: 20 },
    { name: '统统石化', value: 15 },
    { name: '钻心剜骨', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 4,
      px: 2,
    }}>
      <Container maxWidth="lg">
        {/* 标题 */}
        <Typography variant="h4" sx={{ color: '#ffd700', mb: 4 }}>
          练习统计
        </Typography>

        {/* 概览卡片 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 28, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
            }}>
              <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
                平均速度
              </Typography>
              <Typography variant="h3" sx={{ color: '#fff' }}>
                42 <Typography component="span" variant="h6">WPM</Typography>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 28, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
            }}>
              <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
                平均准确率
              </Typography>
              <Typography variant="h3" sx={{ color: '#fff' }}>
                91<Typography component="span" variant="h6">%</Typography>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              backgroundColor: 'rgba(20, 20, 28, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
            }}>
              <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
                总练习时间
              </Typography>
              <Typography variant="h3" sx={{ color: '#fff' }}>
                3.5<Typography component="span" variant="h6">小时</Typography>
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 进步趋势图 */}
        <Paper sx={{
          p: 3,
          mb: 4,
          backgroundColor: 'rgba(20, 20, 28, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
        }}>
          <Typography variant="h6" sx={{ color: '#ffd700', mb: 3 }}>
            进步趋势
          </Typography>
          <Box sx={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <LineChart data={practiceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.5)"
                />
                <YAxis 
                  yAxisId="left"
                  stroke="rgba(255,255,255,0.5)"
                  domain={[0, 'dataMax + 10']}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="rgba(255,255,255,0.5)"
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(20, 20, 28, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="wpm"
                  stroke="#ffd700"
                  name="打字速度 (WPM)"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#4dabf5"
                  name="准确率 (%)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* 咒语使用统计 */}
        <Paper sx={{
          p: 3,
          backgroundColor: 'rgba(20, 20, 28, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
        }}>
          <Typography variant="h6" sx={{ color: '#ffd700', mb: 3 }}>
            咒语使用统计
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={spellUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {spellUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Statistics; 