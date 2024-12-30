import React from 'react';
import { render, screen } from '@testing-library/react';
import Statistics from '../../../src/frontend/pages/Statistics';

// Mock recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  LineChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Line: () => <div>Line</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  Tooltip: () => <div>Tooltip</div>,
  Legend: () => <div>Legend</div>,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Pie: () => <div>Pie</div>,
  Cell: () => <div>Cell</div>,
}));

describe('Statistics Page', () => {
  beforeEach(() => {
    render(<Statistics />);
  });

  test('renders page title', () => {
    expect(screen.getByText('练习统计')).toBeInTheDocument();
  });

  test('renders overview cards', () => {
    expect(screen.getByText('平均速度')).toBeInTheDocument();
    expect(screen.getByText('平均准确率')).toBeInTheDocument();
    expect(screen.getByText('总练习时间')).toBeInTheDocument();
  });

  test('renders progress trend section', () => {
    expect(screen.getByText('进步趋势')).toBeInTheDocument();
  });

  test('renders spell usage statistics', () => {
    expect(screen.getByText('咒语使用统计')).toBeInTheDocument();
  });

  test('displays correct overview statistics', () => {
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('91')).toBeInTheDocument();
    expect(screen.getByText('3.5')).toBeInTheDocument();
  });
}); 