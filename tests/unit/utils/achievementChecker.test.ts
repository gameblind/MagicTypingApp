import {
  checkAchievements,
  checkPracticeAchievements,
  checkLevelAchievements,
  checkSpellAchievements,
  checkBattleAchievements,
} from '../../../src/frontend/utils/achievementChecker';
import { UserData, PracticeRecord } from '../../../src/frontend/types/user';

describe('Achievement Checker', () => {
  let mockUserData: UserData;
  let mockUnlockCallback: jest.Mock;

  beforeEach(() => {
    mockUserData = {
      id: 'test_user',
      name: '测试用户',
      avatar: '/test.png',
      house: '赫奇帕奇',
      level: 1,
      exp: 0,
      title: '魔法新手',
      spellsUnlocked: 0,
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

    mockUnlockCallback = jest.fn();
  });

  test('checkPracticeAchievements unlocks initial achievements', () => {
    const practiceRecord: PracticeRecord = {
      spell: '测试咒语',
      accuracy: 100,
      wpm: 60,
      date: new Date().toISOString(),
    };

    checkPracticeAchievements(mockUserData, practiceRecord, mockUnlockCallback);

    // 应该解锁：初次施法、速度之星、完美施法
    expect(mockUnlockCallback).toHaveBeenCalledWith(1); // 初次施法
    expect(mockUnlockCallback).toHaveBeenCalledWith(2); // 速度之星
    expect(mockUnlockCallback).toHaveBeenCalledWith(3); // 完美施法
  });

  test('checkLevelAchievements unlocks level-based achievements', () => {
    mockUserData.level = 5;
    checkLevelAchievements(mockUserData, mockUnlockCallback);

    // 应该解锁：魔法学徒
    expect(mockUnlockCallback).toHaveBeenCalledWith(5);
  });

  test('checkSpellAchievements unlocks spell-based achievements', () => {
    mockUserData.spellsUnlocked = 20;
    mockUserData.unlockedSpells = Array(20).fill({
      name: '测试咒语',
      mastery: 85,
      practiceCount: 10,
      lastPracticedAt: new Date().toISOString(),
    });

    checkSpellAchievements(mockUserData, mockUnlockCallback);

    // 应该解锁：咒语大师、咒语收藏家
    expect(mockUnlockCallback).toHaveBeenCalledWith(6);
    expect(mockUnlockCallback).toHaveBeenCalledWith(10);
  });

  test('checkBattleAchievements unlocks battle-based achievements', () => {
    // TODO: 实现战斗相关成就的测试
    checkBattleAchievements(mockUserData, true, mockUnlockCallback);
    expect(mockUnlockCallback).not.toHaveBeenCalled();
  });

  test('checkAchievements checks all achievements', () => {
    mockUserData.level = 5;
    mockUserData.stats.bestWpm = 55;
    mockUserData.practiceHistory = [{
      spell: '测试咒语',
      accuracy: 100,
      wpm: 55,
      date: new Date().toISOString(),
    }];

    checkAchievements(mockUserData, mockUnlockCallback);

    // 应该解锁：初次施法、速度之星、完美施法、魔法学徒
    expect(mockUnlockCallback).toHaveBeenCalledWith(1);
    expect(mockUnlockCallback).toHaveBeenCalledWith(2);
    expect(mockUnlockCallback).toHaveBeenCalledWith(3);
    expect(mockUnlockCallback).toHaveBeenCalledWith(5);
  });
}); 