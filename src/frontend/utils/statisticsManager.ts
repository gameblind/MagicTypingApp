import { UserStatistics, PracticeStats, SpellStats, BattleStats, DailyStats } from '../types/statistics';

const STATS_STORAGE_KEY = 'harry_typing_statistics';

// 初始化统计数据
const initializeStats = (): UserStatistics => ({
  practice: {
    totalTime: 0,
    totalChars: 0,
    correctChars: 0,
    wrongChars: 0,
    totalSpells: 0,
    completedSpells: 0,
  },
  spells: [],
  battles: {
    totalBattles: 0,
    victories: 0,
    defeats: 0,
    spellsUsed: 0,
    damageDealt: 0,
    damageTaken: 0,
    longestStreak: 0,
    currentStreak: 0,
  },
  dailyStats: [],
  lastUpdated: new Date(),
});

// 加载统计数据
export const loadStatistics = (): UserStatistics => {
  const storedStats = localStorage.getItem(STATS_STORAGE_KEY);
  if (!storedStats) {
    return initializeStats();
  }
  const stats = JSON.parse(storedStats);
  stats.lastUpdated = new Date(stats.lastUpdated);
  stats.spells.forEach((spell: SpellStats) => {
    spell.lastPracticed = new Date(spell.lastPracticed);
  });
  return stats;
};

// 保存统计数据
export const saveStatistics = (stats: UserStatistics): void => {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
};

// 更新练习统计
export const updatePracticeStats = (
  duration: number,
  totalChars: number,
  correctChars: number,
  spellName: string,
  completed: boolean,
  speed: number
): void => {
  const stats = loadStatistics();
  const today = new Date().toISOString().split('T')[0];

  // 更新总体练习统计
  stats.practice.totalTime += duration;
  stats.practice.totalChars += totalChars;
  stats.practice.correctChars += correctChars;
  stats.practice.wrongChars += (totalChars - correctChars);
  stats.practice.totalSpells += 1;
  if (completed) {
    stats.practice.completedSpells += 1;
  }

  // 更新咒语统计
  const spellIndex = stats.spells.findIndex(s => s.name === spellName);
  const accuracy = (correctChars / totalChars) * 100;

  if (spellIndex === -1) {
    stats.spells.push({
      spellId: spellName.toLowerCase().replace(/\s+/g, '_'),
      name: spellName,
      attempts: 1,
      completions: completed ? 1 : 0,
      avgAccuracy: accuracy,
      avgSpeed: speed,
      bestAccuracy: accuracy,
      bestSpeed: speed,
      lastPracticed: new Date(),
    });
  } else {
    const spell = stats.spells[spellIndex];
    spell.attempts += 1;
    if (completed) {
      spell.completions += 1;
    }
    spell.avgAccuracy = ((spell.avgAccuracy * (spell.attempts - 1)) + accuracy) / spell.attempts;
    spell.avgSpeed = ((spell.avgSpeed * (spell.attempts - 1)) + speed) / spell.attempts;
    spell.bestAccuracy = Math.max(spell.bestAccuracy, accuracy);
    spell.bestSpeed = Math.max(spell.bestSpeed, speed);
    spell.lastPracticed = new Date();
  }

  // 更新每日统计
  const dailyIndex = stats.dailyStats.findIndex(d => d.date === today);
  if (dailyIndex === -1) {
    stats.dailyStats.push({
      date: today,
      practiceTime: duration,
      spellsCompleted: completed ? 1 : 0,
      accuracy: accuracy,
      averageSpeed: speed,
      battlesWon: 0,
      battlesLost: 0,
    });
  } else {
    const daily = stats.dailyStats[dailyIndex];
    daily.practiceTime += duration;
    if (completed) {
      daily.spellsCompleted += 1;
    }
    daily.accuracy = ((daily.accuracy * daily.spellsCompleted) + accuracy) / (daily.spellsCompleted + 1);
    daily.averageSpeed = ((daily.averageSpeed * daily.spellsCompleted) + speed) / (daily.spellsCompleted + 1);
  }

  stats.lastUpdated = new Date();
  saveStatistics(stats);
};

// 更新战斗统计
export const updateBattleStats = (
  victory: boolean,
  spellsUsed: number,
  damageDealt: number,
  damageTaken: number
): void => {
  const stats = loadStatistics();
  const today = new Date().toISOString().split('T')[0];

  // 更新战斗统计
  stats.battles.totalBattles += 1;
  if (victory) {
    stats.battles.victories += 1;
    stats.battles.currentStreak += 1;
    stats.battles.longestStreak = Math.max(stats.battles.longestStreak, stats.battles.currentStreak);
  } else {
    stats.battles.defeats += 1;
    stats.battles.currentStreak = 0;
  }
  stats.battles.spellsUsed += spellsUsed;
  stats.battles.damageDealt += damageDealt;
  stats.battles.damageTaken += damageTaken;

  // 更新每日统计
  const dailyIndex = stats.dailyStats.findIndex(d => d.date === today);
  if (dailyIndex === -1) {
    stats.dailyStats.push({
      date: today,
      practiceTime: 0,
      spellsCompleted: 0,
      accuracy: 0,
      averageSpeed: 0,
      battlesWon: victory ? 1 : 0,
      battlesLost: victory ? 0 : 1,
    });
  } else {
    const daily = stats.dailyStats[dailyIndex];
    if (victory) {
      daily.battlesWon += 1;
    } else {
      daily.battlesLost += 1;
    }
  }

  stats.lastUpdated = new Date();
  saveStatistics(stats);
};

// 获取指定时间范围的统计数据
export const getStatsInRange = (startDate: string, endDate: string): DailyStats[] => {
  const stats = loadStatistics();
  return stats.dailyStats.filter(
    daily => daily.date >= startDate && daily.date <= endDate
  );
};

// 获取咒语掌握度排名
export const getSpellMasteryRanking = (): SpellStats[] => {
  const stats = loadStatistics();
  return [...stats.spells].sort((a, b) => {
    // 根据完成率、准确率和速度计算掌握度
    const masteryA = (a.completions / a.attempts) * a.avgAccuracy * a.avgSpeed;
    const masteryB = (b.completions / b.attempts) * b.avgAccuracy * b.avgSpeed;
    return masteryB - masteryA;
  });
};

// 获取总体统计摘要
export const getStatsSummary = () => {
  const stats = loadStatistics();
  const totalAccuracy = stats.practice.totalChars === 0 ? 0 :
    (stats.practice.correctChars / stats.practice.totalChars) * 100;
  const winRate = stats.battles.totalBattles === 0 ? 0 :
    (stats.battles.victories / stats.battles.totalBattles) * 100;

  return {
    totalPracticeTime: stats.practice.totalTime,
    averageAccuracy: totalAccuracy,
    spellsMastered: stats.spells.filter(s => s.completions > 0).length,
    battleWinRate: winRate,
    currentStreak: stats.battles.currentStreak,
    longestStreak: stats.battles.longestStreak,
  };
}; 