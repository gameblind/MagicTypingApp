export interface PracticeStats {
  totalTime: number;  // 总练习时间（分钟）
  totalChars: number;  // 总字符数
  correctChars: number;  // 正确字符数
  wrongChars: number;  // 错误字符数
  totalSpells: number;  // 总咒语数
  completedSpells: number;  // 完成的咒语数
}

export interface SpellStats {
  spellId: string;
  name: string;
  attempts: number;  // 尝试次数
  completions: number;  // 完成次数
  avgAccuracy: number;  // 平均准确率
  avgSpeed: number;  // 平均速度（WPM）
  bestAccuracy: number;  // 最佳准确率
  bestSpeed: number;  // 最佳速度
  lastPracticed: Date;  // 最后练习时间
}

export interface BattleStats {
  totalBattles: number;  // 总战斗次数
  victories: number;  // 胜利次数
  defeats: number;  // 失败次数
  spellsUsed: number;  // 使用的咒语数
  damageDealt: number;  // 造成的伤害
  damageTaken: number;  // 受到的伤害
  longestStreak: number;  // 最长连胜
  currentStreak: number;  // 当前连胜
}

export interface DailyStats {
  date: string;  // YYYY-MM-DD 格式
  practiceTime: number;  // 练习时间（分钟）
  spellsCompleted: number;  // 完成的咒语数
  accuracy: number;  // 准确率
  averageSpeed: number;  // 平均速度
  battlesWon: number;  // 获胜的战斗数
  battlesLost: number;  // 失败的战斗数
}

export interface UserStatistics {
  practice: PracticeStats;
  spells: SpellStats[];
  battles: BattleStats;
  dailyStats: DailyStats[];
  lastUpdated: Date;
} 