import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../../../src/frontend/pages/Profile';

describe('Profile Page', () => {
  beforeEach(() => {
    render(<Profile />);
  });

  test('renders user basic info', () => {
    expect(screen.getByText('哈利·波特')).toBeInTheDocument();
    expect(screen.getByText('格兰芬多')).toBeInTheDocument();
    expect(screen.getByText('魔法学徒')).toBeInTheDocument();
  });

  test('renders level and progress', () => {
    expect(screen.getByText(/等级 5/)).toBeInTheDocument();
    expect(screen.getByText(/已解锁 12\/20 个咒语/)).toBeInTheDocument();
  });

  test('renders achievements section', () => {
    expect(screen.getByText('成就')).toBeInTheDocument();
    expect(screen.getByText('初次施法')).toBeInTheDocument();
    expect(screen.getByText('速度之星')).toBeInTheDocument();
    expect(screen.getByText('完美施法')).toBeInTheDocument();
    expect(screen.getByText('决斗高手')).toBeInTheDocument();
  });

  test('renders unlocked spells section', () => {
    expect(screen.getByText('已掌握咒语')).toBeInTheDocument();
    expect(screen.getByText('除你武器')).toBeInTheDocument();
    expect(screen.getByText('昏昏倒地')).toBeInTheDocument();
    expect(screen.getByText('盔甲护身')).toBeInTheDocument();
    expect(screen.getByText('统统石化')).toBeInTheDocument();
  });

  test('displays spell mastery percentages', () => {
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
  });
}); 