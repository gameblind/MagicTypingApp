import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
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
  BarChart,
  Bar,
} from 'recharts';

interface ChartData {
  date: string;
  wpm: number;
  accuracy: number;
  practiceTime: number;
}

const Statistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('week');
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // 模拟数据
  useEffect(() => {
    const generateData = () => {
      const data: ChartData[] = [];
      const ranges = {
        week: 7,
        month: 30,
        year: 12,
      };

      const days = ranges[timeRange as keyof typeof ranges];
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.unshift({
          date: date.toLocaleDateString(),
          wpm: 30 + Math.random() * 30,
          accuracy: 85 + Math.random() * 15,
          practiceTime: Math.round(10 + Math.random() * 50),
        });
      }
      setChartData(data);
    };

    generateData();
  }, [timeRange]);

  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeRange: string
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          练习统计
        </Typography>

        <Box sx={{ mb: 4 }}>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeRangeChange}
            aria-label="time range"
          >
            <ToggleButton value="week">最近一周</ToggleButton>
            <ToggleButton value="month">最近一月</ToggleButton>
            <ToggleButton value="year">最近一年</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={4}>
          {/* 打字速度图表 */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                打字速度趋势
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    name="WPM"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* 准确率图表 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                准确率趋势
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="准确率"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* 练习时间图表 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                练习时间分布
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="practiceTime"
                    name="练习时间(分钟)"
                    fill="#ffc658"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Statistics; 