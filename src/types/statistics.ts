export interface PracticeStats {
  totalTime: number;
  totalChars: number;
  correctChars: number;
  wrongChars: number;
  totalSpells: number;
  completedSpells: number;
  completed?: boolean;
  time?: number;
  accuracy?: number;
}

export interface SpellStats {
  attempts: number;
  completions: number;
  totalTime: number;
  bestTime: number;
  averageAccuracy: number;
}

export interface UserStatistics {
  practice: PracticeStats;
  spells: { [key: string]: SpellStats };
  daily: { [key: string]: PracticeStats };
} 