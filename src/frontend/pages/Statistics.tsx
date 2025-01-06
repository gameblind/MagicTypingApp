import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useStatistics } from '../contexts/StatisticsContext';

const Statistics: React.FC = () => {
  const { statistics, getDateRangeStats, getSpellRanking, getSummary } = useStatistics();
  
  // 获取最近7天的数据
  const last7Days = React.useMemo(() => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return getDateRangeStats(startDate, endDate);
  }, [getDateRangeStats]);

  // 获取总体统计摘要
  const summary = React.useMemo(() => getSummary(), [getSummary]);

  // 获取咒语掌握度排名
  const spellRanking = React.useMemo(() => getSpellRanking(), [getSpellRanking]);

  // 准备图表数据
  const accuracyData = last7Days.map(day => ({
    date: day.date,
    准确率: day.accuracy.toFixed(1),
    速度: day.averageSpeed.toFixed(1),
  }));

  const battleData = [
    { name: '胜利', value: statistics.battles.victories },
    { name: '失败', value: statistics.battles.defeats },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* 总体统计摘要 */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>练习统计</Typography>
              <Typography>总练习时间：{summary.totalPracticeTime} 分钟</Typography>
              <Typography>平均准确率：{summary.averageAccuracy.toFixed(1)}%</Typography>
              <Typography>已掌握咒语：{summary.spellsMastered} 个</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>战斗统计</Typography>
              <Typography>胜率：{summary.battleWinRate.toFixed(1)}%</Typography>
              <Typography>当前连胜：{summary.currentStreak}</Typography>
              <Typography>最长连胜：{summary.longestStreak}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>今日统计</Typography>
              <Typography>练习次数：{last7Days[last7Days.length - 1]?.spellsCompleted || 0}</Typography>
              <Typography>战斗次数：{
                (last7Days[last7Days.length - 1]?.battlesWon || 0) +
                (last7Days[last7Days.length - 1]?.battlesLost || 0)
              }</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 图表区域 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>最近7天练习趋势</Typography>
            <LineChart width={600} height={300} data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="准确率" stroke="#8884d8" />
              <Line type="monotone" dataKey="速度" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>战斗胜负比</Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={battleData}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {battleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>

      {/* 咒语掌握度排名 */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>咒语掌握度排名</Typography>
        <Grid container spacing={2}>
          {spellRanking.slice(0, 5).map((spell, index) => (
            <Grid item xs={12} md={4} key={spell.spellId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{index + 1}. {spell.name}</Typography>
                  <Typography>完成次数：{spell.completions}</Typography>
                  <Typography>平均准确率：{spell.avgAccuracy.toFixed(1)}%</Typography>
                  <Typography>最佳速度：{spell.bestSpeed.toFixed(1)} WPM</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Statistics; 