import React from 'react';
import { render, act } from '@testing-library/react';
import { StatisticsProvider, useStatistics } from '../../../src/frontend/contexts/StatisticsContext';

// 创建一个测试组件来使用 useStatistics hook
const TestComponent = () => {
  const { statistics, updatePractice, updateBattle } = useStatistics();
  
  return (
    <div>
      <div data-testid="total-time">{statistics.practice.totalTime}</div>
      <div data-testid="total-battles">{statistics.battles.totalBattles}</div>
      <button 
        data-testid="update-practice"
        onClick={() => updatePractice(10, 100, 90, "Lumos", true, 40)}
      >
        Update Practice
      </button>
      <button 
        data-testid="update-battle"
        onClick={() => updateBattle(true, 3, 100, 50)}
      >
        Update Battle
      </button>
    </div>
  );
};

describe('StatisticsContext', () => {
  beforeEach(() => {
    // 清除 localStorage
    localStorage.clear();
  });

  it('应该提供初始统计数据', () => {
    const { getByTestId } = render(
      <StatisticsProvider>
        <TestComponent />
      </StatisticsProvider>
    );

    expect(getByTestId('total-time').textContent).toBe('0');
    expect(getByTestId('total-battles').textContent).toBe('0');
  });

  it('应该正确更新练习数据', () => {
    const { getByTestId } = render(
      <StatisticsProvider>
        <TestComponent />
      </StatisticsProvider>
    );

    act(() => {
      getByTestId('update-practice').click();
    });

    const stats = JSON.parse(localStorage.getItem('harry_typing_statistics') || '{}');
    expect(stats.practice.totalTime).toBe(10);
    expect(stats.practice.correctChars).toBe(90);
    expect(stats.spells[0].name).toBe('Lumos');
  });

  it('应该正确更新战斗数据', () => {
    const { getByTestId } = render(
      <StatisticsProvider>
        <TestComponent />
      </StatisticsProvider>
    );

    act(() => {
      getByTestId('update-battle').click();
    });

    const stats = JSON.parse(localStorage.getItem('harry_typing_statistics') || '{}');
    expect(stats.battles.totalBattles).toBe(1);
    expect(stats.battles.victories).toBe(1);
    expect(stats.battles.damageDealt).toBe(100);
  });
}); 