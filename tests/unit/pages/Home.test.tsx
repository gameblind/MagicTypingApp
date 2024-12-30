import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../../src/frontend/pages/Home';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test('renders welcome message', () => {
    expect(screen.getByText('欢迎来到霍格沃茨打字学院')).toBeInTheDocument();
  });

  test('renders feature cards', () => {
    expect(screen.getByText('每日目标')).toBeInTheDocument();
    expect(screen.getByText('魔法对决')).toBeInTheDocument();
    expect(screen.getByText('进度统计')).toBeInTheDocument();
  });

  test('renders recent practice records', () => {
    expect(screen.getByText('最近练习记录')).toBeInTheDocument();
    expect(screen.getByText('除你武器')).toBeInTheDocument();
    expect(screen.getByText('昏昏倒地')).toBeInTheDocument();
    expect(screen.getByText('盔甲护身')).toBeInTheDocument();
  });

  test('navigates to practice page when clicking start button', () => {
    fireEvent.click(screen.getByText('开始练习'));
    expect(mockNavigate).toHaveBeenCalledWith('/practice');
  });

  test('navigates to battle page when clicking battle button', () => {
    fireEvent.click(screen.getByText('开始对决'));
    expect(mockNavigate).toHaveBeenCalledWith('/battle');
  });

  test('navigates to statistics page when clicking stats button', () => {
    fireEvent.click(screen.getByText('查看统计'));
    expect(mockNavigate).toHaveBeenCalledWith('/statistics');
  });
}); 