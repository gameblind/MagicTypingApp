import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../src/frontend/theme';
import Layout from '../../../src/frontend/components/Layout';

const renderWithProviders = () => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('Layout Component', () => {
  test('renders app title', () => {
    renderWithProviders();
    expect(screen.getByText('哈利打字')).toBeInTheDocument();
  });

  test('renders navigation menu items', () => {
    renderWithProviders();
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('练习')).toBeInTheDocument();
    expect(screen.getByText('战斗')).toBeInTheDocument();
    expect(screen.getByText('个人资料')).toBeInTheDocument();
    expect(screen.getByText('统计')).toBeInTheDocument();
  });

  test('drawer opens and closes', () => {
    renderWithProviders();
    
    // 初始状态下抽屉是关闭的
    const drawer = screen.getByRole('presentation');
    expect(drawer).toHaveStyle({ transform: 'translateX(-240px)' });

    // 点击菜单按钮打开抽屉
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);
    expect(drawer).toHaveStyle({ transform: 'none' });

    // 点击关闭按钮关闭抽屉
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    expect(drawer).toHaveStyle({ transform: 'translateX(-240px)' });
  });

  test('navigation links are working', () => {
    renderWithProviders();

    // 点击练习链接
    const practiceLink = screen.getByText('练习');
    fireEvent.click(practiceLink);
    expect(window.location.pathname).toBe('/practice');

    // 点击战斗链接
    const battleLink = screen.getByText('战斗');
    fireEvent.click(battleLink);
    expect(window.location.pathname).toBe('/battle');

    // 点击个人资料链接
    const profileLink = screen.getByText('个人资料');
    fireEvent.click(profileLink);
    expect(window.location.pathname).toBe('/profile');

    // 点击统计链接
    const statsLink = screen.getByText('统计');
    fireEvent.click(statsLink);
    expect(window.location.pathname).toBe('/statistics');

    // 点击首页链接
    const homeLink = screen.getByText('首页');
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe('/');
  });
}); 