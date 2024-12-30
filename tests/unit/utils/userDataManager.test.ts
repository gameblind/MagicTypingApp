import {
  loadUserData,
  saveUserData,
  updateUserData,
  addPracticeRecord,
  addBattleRecord,
  unlockAchievement,
  updateSpellProgress,
  checkAndUpdateLevel,
} from '../../../src/frontend/utils/userDataManager';
import { UserData, Achievement, PracticeRecord, BattleRecord } from '../../../src/frontend/types/user';

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
  let testData: UserData;

  beforeEach(() => {
    localStorageMock.clear();
    testData = {
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
      battleHistory: [],
      currentWinStreak: 0,
      bestWinStreak: 0,
      stats: {
        totalPracticeTime: 0,
        totalPracticeCount: 0,
        averageAccuracy: 0,
        averageWpm: 0,
        bestWpm: 0,
        totalBattles: 0,
        totalWins: 0,
        totalLosses: 0,
        winRate: 0,
      },
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
  });

  test('loadUserData returns default data for new user', () => {
    const userData = loadUserData();
    expect(userData.name).toBe('新学员');
    expect(userData.level).toBe(1);
    expect(userData.exp).toBe(0);
    expect(userData.id).toMatch(/^user_/);
  });

  test('saveUserData and loadUserData work together', () => {
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

  test('addBattleRecord updates battle history and stats for win', () => {
    const record: BattleRecord = {
      id: 'battle_1',
      opponent: '对手1',
      result: 'win',
      spell: '除你武器',
      accuracy: 95,
      wpm: 60,
      date: new Date().toISOString(),
    };

    addBattleRecord(record);
    const userData = loadUserData();
    
    expect(userData.battleHistory[0]).toEqual(record);
    expect(userData.stats.totalBattles).toBe(1);
    expect(userData.stats.totalWins).toBe(1);
    expect(userData.stats.totalLosses).toBe(0);
    expect(userData.stats.winRate).toBe(100);
    expect(userData.currentWinStreak).toBe(1);
    expect(userData.bestWinStreak).toBe(1);
  });

  test('addBattleRecord updates battle history and stats for loss', () => {
    const record: BattleRecord = {
      id: 'battle_1',
      opponent: '对手1',
      result: 'lose',
      spell: '除你武器',
      accuracy: 85,
      wpm: 50,
      date: new Date().toISOString(),
    };

    addBattleRecord(record);
    const userData = loadUserData();
    
    expect(userData.battleHistory[0]).toEqual(record);
    expect(userData.stats.totalBattles).toBe(1);
    expect(userData.stats.totalWins).toBe(0);
    expect(userData.stats.totalLosses).toBe(1);
    expect(userData.stats.winRate).toBe(0);
    expect(userData.currentWinStreak).toBe(0);
  });

  test('addBattleRecord correctly tracks win streak', () => {
    const createBattleRecord = (id: string, result: 'win' | 'lose'): BattleRecord => ({
      id: `battle_${id}`,
      opponent: '对手1',
      result,
      spell: '除你武器',
      accuracy: 90,
      wpm: 55,
      date: new Date().toISOString(),
    });

    // 添加三连胜
    addBattleRecord(createBattleRecord('1', 'win'));
    addBattleRecord(createBattleRecord('2', 'win'));
    addBattleRecord(createBattleRecord('3', 'win'));

    let userData = loadUserData();
    expect(userData.currentWinStreak).toBe(3);
    expect(userData.bestWinStreak).toBe(3);

    // 添加一次失败
    addBattleRecord(createBattleRecord('4', 'lose'));

    userData = loadUserData();
    expect(userData.currentWinStreak).toBe(0);
    expect(userData.bestWinStreak).toBe(3);

    // 添加五连胜
    addBattleRecord(createBattleRecord('5', 'win'));
    addBattleRecord(createBattleRecord('6', 'win'));
    addBattleRecord(createBattleRecord('7', 'win'));
    addBattleRecord(createBattleRecord('8', 'win'));
    addBattleRecord(createBattleRecord('9', 'win'));

    userData = loadUserData();
    expect(userData.currentWinStreak).toBe(5);
    expect(userData.bestWinStreak).toBe(5);
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