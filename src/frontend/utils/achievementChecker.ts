import { UserData, PracticeRecord } from '../types/user';
import { ACHIEVEMENTS } from '../constants/achievements';

// 检查所有成就
export const checkAchievements = (
  userData: UserData,
  unlockCallback: (achievementId: number) => void
) => {
  ACHIEVEMENTS.forEach(achievement => {
    if (!userData.achievements.some(a => a.id === achievement.id)) {
      if (shouldUnlockAchievement(achievement.id, userData)) {
        unlockCallback(achievement.id);
      }
    }
  });
};

// 检查单个成就是否应该解锁
const shouldUnlockAchievement = (achievementId: number, userData: UserData): boolean => {
  switch (achievementId) {
    case 1: // 初次施法
      return userData.practiceHistory.length > 0;

    case 2: // 速度之星
      return userData.stats.bestWpm >= 50;

    case 3: // 完美施法
      return userData.practiceHistory.some(record => record.accuracy === 100);

    case 4: // 决斗高手
      return countBattleWins(userData) >= 10;

    case 5: // 魔法学徒
      return userData.level >= 5;

    case 6: // 咒语大师
      return userData.spellsUnlocked === userData.totalSpells;

    case 7: // 练习达人
      return userData.stats.totalPracticeTime >= 36000; // 10小时 = 36000秒

    case 8: // 精准施法
      return userData.stats.averageAccuracy >= 95;

    case 9: // 连胜王者
      return hasWinningStreak(userData, 5);

    case 10: // 咒语收藏家
      return userData.unlockedSpells.every(spell => spell.mastery >= 80);

    default:
      return false;
  }
};

// 计算决斗胜利次数
const countBattleWins = (userData: UserData): number => {
  // TODO: 实现决斗胜利次数统计
  return 0;
};

// 检查是否有连胜
const hasWinningStreak = (userData: UserData, streakCount: number): boolean => {
  // TODO: 实现连胜检查
  return false;
};

// 在练习结束时检查成就
export const checkPracticeAchievements = (
  userData: UserData,
  practiceRecord: PracticeRecord,
  unlockCallback: (achievementId: number) => void
) => {
  // 初次施法
  if (userData.practiceHistory.length === 0) {
    unlockCallback(1);
  }

  // 速度之星
  if (practiceRecord.wpm >= 50) {
    unlockCallback(2);
  }

  // 完美施法
  if (practiceRecord.accuracy === 100) {
    unlockCallback(3);
  }

  // 精准施法
  if (userData.stats.averageAccuracy >= 95) {
    unlockCallback(8);
  }
};

// 在等级提升时检查成就
export const checkLevelAchievements = (
  userData: UserData,
  unlockCallback: (achievementId: number) => void
) => {
  // 魔法学徒
  if (userData.level >= 5) {
    unlockCallback(5);
  }
};

// 在解锁咒语时检查成就
export const checkSpellAchievements = (
  userData: UserData,
  unlockCallback: (achievementId: number) => void
) => {
  // 咒语大师
  if (userData.spellsUnlocked === userData.totalSpells) {
    unlockCallback(6);
  }

  // 咒语收藏家
  if (userData.unlockedSpells.every(spell => spell.mastery >= 80)) {
    unlockCallback(10);
  }
};

// 在战斗结束时检查成就
export const checkBattleAchievements = (
  userData: UserData,
  isWin: boolean,
  unlockCallback: (achievementId: number) => void
) => {
  if (isWin) {
    // 决斗高手
    if (countBattleWins(userData) >= 10) {
      unlockCallback(4);
    }

    // 连胜王者
    if (hasWinningStreak(userData, 5)) {
      unlockCallback(9);
    }
  }
}; 