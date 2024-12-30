export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface SpellProgress {
  name: string;
  mastery: number;
  practiceCount: number;
  lastPracticedAt?: string;
}

export interface PracticeRecord {
  spell: string;
  accuracy: number;
  wpm: number;
  date: string;
}

export interface BattleRecord {
  id: string;
  opponent: string;
  result: 'win' | 'lose';
  spell: string;
  accuracy: number;
  wpm: number;
  date: string;
}

export interface UserData {
  id: string;
  name: string;
  avatar: string;
  house: string;
  level: number;
  exp: number;
  title: string;
  spellsUnlocked: number;
  totalSpells: number;
  achievements: Achievement[];
  unlockedSpells: SpellProgress[];
  practiceHistory: PracticeRecord[];
  battleHistory: BattleRecord[];
  currentWinStreak: number;
  bestWinStreak: number;
  stats: {
    totalPracticeTime: number;
    totalPracticeCount: number;
    averageAccuracy: number;
    averageWpm: number;
    bestWpm: number;
    totalBattles: number;
    totalWins: number;
    totalLosses: number;
    winRate: number;
  };
  createdAt: string;
  lastLoginAt: string;
} 