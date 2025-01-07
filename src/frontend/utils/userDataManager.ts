import { UserData, Achievement, SpellProgress, PracticeRecord, BattleRecord } from '../types/user';
import { PracticeRecord } from '../types/practice';

const STORAGE_KEY = 'harry_typing_user_data';

// 默认用户数据
const defaultUserData: UserData = {
  id: '',
  name: '新学员',
  avatar: '/assets/images/default-avatar.png',
  house: '',
  level: 1,
  exp: 0,
  title: '魔法新手',
  spellsUnlocked: 0,
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

// 加载用户数据
export const loadUserData = (): UserData => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      return { ...defaultUserData, id: generateUserId() };
    }
    return JSON.parse(savedData);
  } catch (error) {
    console.error('Failed to load user data:', error);
    return { ...defaultUserData, id: generateUserId() };
  }
};

// 保存用户数据
export const saveUserData = (data: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

// 更新用户数据
export const updateUserData = (updates: Partial<UserData>): UserData => {
  const currentData = loadUserData();
  const newData = { ...currentData, ...updates };
  saveUserData(newData);
  return newData;
};

// 添加练习记录
export const addPracticeRecord = (record: PracticeRecord): void => {
  const userData = loadUserData();
  userData.practiceHistory.unshift(record);
  
  // 更新统计数据
  const stats = userData.stats;
  stats.totalPracticeCount += 1;
  stats.averageAccuracy = calculateAverage(
    stats.averageAccuracy,
    record.accuracy,
    stats.totalPracticeCount
  );
  stats.averageWpm = calculateAverage(
    stats.averageWpm,
    record.wpm,
    stats.totalPracticeCount
  );
  stats.bestWpm = Math.max(stats.bestWpm, record.wpm);

  saveUserData(userData);
};

// 添加战斗记录
export const addBattleRecord = (record: BattleRecord): void => {
  const userData = loadUserData();
  userData.battleHistory.unshift(record);
  
  // 更新统计数据
  const stats = userData.stats;
  stats.totalBattles += 1;
  
  if (record.result === 'win') {
    stats.totalWins += 1;
    userData.currentWinStreak += 1;
    userData.bestWinStreak = Math.max(userData.bestWinStreak, userData.currentWinStreak);
  } else {
    stats.totalLosses += 1;
    userData.currentWinStreak = 0;
  }
  
  stats.winRate = (stats.totalWins / stats.totalBattles) * 100;

  saveUserData(userData);
};

// 解锁成就
export const unlockAchievement = (achievement: Achievement): void => {
  const userData = loadUserData();
  if (!userData.achievements.some(a => a.id === achievement.id)) {
    userData.achievements.push({
      ...achievement,
      unlockedAt: new Date().toISOString(),
    });
    saveUserData(userData);
  }
};

// 更新咒语进度
export const updateSpellProgress = (spell: string, accuracy: number, wpm: number): void => {
  const userData = loadUserData();
  const spellProgress = userData.unlockedSpells.find(s => s.name === spell);
  
  if (spellProgress) {
    spellProgress.practiceCount += 1;
    spellProgress.mastery = calculateNewMastery(spellProgress.mastery, accuracy);
    spellProgress.lastPracticedAt = new Date().toISOString();
  } else {
    userData.unlockedSpells.push({
      name: spell,
      mastery: accuracy,
      practiceCount: 1,
      lastPracticedAt: new Date().toISOString(),
    });
    userData.spellsUnlocked += 1;
  }

  saveUserData(userData);
};

// 检查和更新等级
export const checkAndUpdateLevel = (expGained: number): void => {
  const userData = loadUserData();
  userData.exp += expGained;

  // 每100经验升一级
  const newLevel = Math.floor(userData.exp / 100) + 1;
  if (newLevel > userData.level) {
    userData.level = newLevel;
    userData.title = getTitleForLevel(newLevel);
  }

  saveUserData(userData);
};

// 辅助函数
const generateUserId = (): string => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};

const calculateAverage = (oldAvg: number, newValue: number, count: number): number => {
  return ((oldAvg * (count - 1)) + newValue) / count;
};

const calculateNewMastery = (currentMastery: number, accuracy: number): number => {
  return Math.round((currentMastery * 0.7 + accuracy * 0.3) * 100) / 100;
};

const getTitleForLevel = (level: number): string => {
  if (level < 5) return '魔法新手';
  if (level < 10) return '魔法学徒';
  if (level < 15) return '魔法师';
  if (level < 20) return '高级魔法师';
  return '魔法大师';
};

/**
 * 添加练习记录
 * @param record 练习记录
 */
export const addPractice = (record: PracticeRecord) => {
  // 获取现有记录
  const practices = JSON.parse(localStorage.getItem('practices') || '[]');
  
  // 添加新记录
  practices.push(record);
  
  // 保存到本地存储
  localStorage.setItem('practices', JSON.stringify(practices));
};

/**
 * 检查练习成就
 * @param userData 用户数据
 * @param record 练习记录
 * @param unlockAchievement 解锁成就的回调函数
 */
export const checkPracticeAchievements = (
  userData: UserData,
  record: PracticeRecord,
  unlockAchievement: (achievementId: string) => void
) => {
  // 获取所有练习记录
  const practices = JSON.parse(localStorage.getItem('practices') || '[]');
  
  // 检查各种成就条件
  if (record.accuracy === 100 && !userData.achievements.includes('perfect_spell')) {
    unlockAchievement('perfect_spell');
  }
  
  if (record.wpm >= 60 && !userData.achievements.includes('speed_wizard')) {
    unlockAchievement('speed_wizard');
  }
  
  if (practices.length >= 100 && !userData.achievements.includes('practice_master')) {
    unlockAchievement('practice_master');
  }
}; 