import React from 'react';
import { render, act } from '@testing-library/react';
import { UserDataProvider, useUserData } from '../../../src/frontend/contexts/UserDataContext';
import { PracticeRecord, Achievement } from '../../../src/frontend/types/user';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 测试组件
const TestComponent: React.FC = () => {
  const {
    userData,
    updateUser,
    addPractice,
    unlockNewAchievement,
    updateSpell,
    gainExperience,
  } = useUserData();

  return (
    <div>
      <div data-testid="user-name">{userData.name}</div>
      <div data-testid="user-level">{userData.level}</div>
      <button
        onClick={() => updateUser({ name: '新名字' })}
        data-testid="update-name-btn"
      >
        更新名字
      </button>
      <button
        onClick={() => {
          const record: PracticeRecord = {
            spell: '测试咒语',
            accuracy: 90,
            wpm: 50,
            date: new Date().toISOString(),
          };
          addPractice(record);
        }}
        data-testid="add-practice-btn"
      >
        添加练习记录
      </button>
      <button
        onClick={() => {
          const achievement: Achievement = {
            id: 1,
            name: '测试成就',
            description: '测试描述',
            icon: '🎯',
          };
          unlockNewAchievement(achievement);
        }}
        data-testid="unlock-achievement-btn"
      >
        解锁成就
      </button>
      <button
        onClick={() => updateSpell('测试咒语', 85, 45)}
        data-testid="update-spell-btn"
      >
        更新咒语进度
      </button>
      <button
        onClick={() => gainExperience(100)}
        data-testid="gain-exp-btn"
      >
        获得经验
      </button>
    </div>
  );
};

describe('UserDataContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('provides initial user data', () => {
    const { getByTestId } = render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

    expect(getByTestId('user-name')).toHaveTextContent('新学员');
    expect(getByTestId('user-level')).toHaveTextContent('1');
  });

  test('updates user data', () => {
    const { getByTestId } = render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

    act(() => {
      getByTestId('update-name-btn').click();
    });

    expect(getByTestId('user-name')).toHaveTextContent('新名字');
  });

  test('adds practice record', () => {
    const { getByTestId } = render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

    act(() => {
      getByTestId('add-practice-btn').click();
    });

    // 验证 localStorage 中的数据
    const savedData = JSON.parse(localStorageMock.getItem('harry_typing_user_data')!);
    expect(savedData.practiceHistory).toHaveLength(1);
    expect(savedData.practiceHistory[0].spell).toBe('测试咒语');
  });

  test('unlocks achievement', () => {
    const { getByTestId } = render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

    act(() => {
      getByTestId('unlock-achievement-btn').click();
    });

    const savedData = JSON.parse(localStorageMock.getItem('harry_typing_user_data')!);
    expect(savedData.achievements).toHaveLength(1);
    expect(savedData.achievements[0].name).toBe('测试成就');
  });

  test('updates spell progress', () => {
    const { getByTestId } = render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

    act(() => {
      getByTestId('update-spell-btn').click();
    });

    const savedData = JSON.parse(localStorageMock.getItem('harry_typing_user_data')!);
    expect(savedData.unlockedSpells).toHaveLength(1);
    expect(savedData.unlockedSpells[0].name).toBe('测试咒语');
    expect(savedData.unlockedSpells[0].mastery).toBe(85);
  });

  test('gains experience and levels up', () => {
    const { getByTestId } = render(
      <UserDataProvider>
        <TestComponent />
      </UserDataProvider>
    );

    act(() => {
      getByTestId('gain-exp-btn').click();
    });

    const savedData = JSON.parse(localStorageMock.getItem('harry_typing_user_data')!);
    expect(savedData.exp).toBe(100);
    expect(savedData.level).toBe(2);
  });
}); 