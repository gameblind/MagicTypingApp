import {
  loadUserData,
  saveUserData,
  updateUserData,
  addPracticeRecord,
  unlockAchievement,
  updateSpellProgress,
  checkAndUpdateLevel,
} from '../../../src/frontend/utils/userDataManager';
import { UserData, Achievement, PracticeRecord } from '../../../src/frontend/types/user';

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

describe('User Data Manager', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('loadUserData returns default data for new user', () => {
    const userData = loadUserData();
    expect(userData.name).toBe('新学员');
    expect(userData.level).toBe(1);
    expect(userData.exp).toBe(0);
    expect(userData.id).toMatch(/^user_/);
  });

  test('saveUserData and loadUserData work together', () => {
    const testData: UserData = {
      id: 'test_user',
      name: '测试用户',
      avatar: '/test.png',
      house: '赫奇帕奇',
      level: 2,
      exp: 150,
      title: '魔法学徒',
      spellsUnlocked: 5,
      totalSpells: 20,
      achievements: [],
      unlockedSpells: [],
      practiceHistory: [],
      stats: {
        totalPracticeTime: 0,
        totalPracticeCount: 0,
        averageAccuracy: 0,
        averageWpm: 0,
        bestWpm: 0,
      },
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    saveUserData(testData);
    const loadedData = loadUserData();
    expect(loadedData).toEqual(testData);
  });

  test('updateUserData correctly updates partial data', () => {
    const initialData = loadUserData();
    const updates = {
      name: '新名字',
      house: '斯莱特林',
    };

    const updatedData = updateUserData(updates);
    expect(updatedData.name).toBe('新名字');
    expect(updatedData.house).toBe('斯莱特林');
    expect(updatedData.id).toBe(initialData.id);
  });

  test('addPracticeRecord updates practice history and stats', () => {
    const record: PracticeRecord = {
      spell: '除你武器',
      accuracy: 95,
      wpm: 60,
      date: new Date().toISOString(),
    };

    addPracticeRecord(record);
    const userData = loadUserData();
    
    expect(userData.practiceHistory[0]).toEqual(record);
    expect(userData.stats.totalPracticeCount).toBe(1);
    expect(userData.stats.averageAccuracy).toBe(95);
    expect(userData.stats.averageWpm).toBe(60);
    expect(userData.stats.bestWpm).toBe(60);
  });

  test('unlockAchievement adds new achievement', () => {
    const achievement: Achievement = {
      id: 1,
      name: '测试成就',
      description: '测试描述',
      icon: '🎯',
    };

    unlockAchievement(achievement);
    const userData = loadUserData();
    
    expect(userData.achievements).toHaveLength(1);
    expect(userData.achievements[0].name).toBe('测试成就');
    expect(userData.achievements[0].unlockedAt).toBeDefined();
  });

  test('updateSpellProgress updates existing spell', () => {
    // 首先添加一个咒语
    updateSpellProgress('除你武器', 80, 50);
    // 然后更新它
    updateSpellProgress('除你武器', 90, 55);

    const userData = loadUserData();
    const spell = userData.unlockedSpells.find(s => s.name === '除你武器');
    
    expect(spell).toBeDefined();
    expect(spell?.practiceCount).toBe(2);
    expect(spell?.mastery).toBeGreaterThan(80);
  });

  test('checkAndUpdateLevel updates level and title', () => {
    // 添加足够的经验以升级
    checkAndUpdateLevel(150);
    const userData = loadUserData();
    
    expect(userData.level).toBe(2);
    expect(userData.exp).toBe(150);
    expect(userData.title).toBe('魔法新手');
  });
}); 