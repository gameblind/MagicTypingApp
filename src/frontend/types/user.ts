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
  stats: {
    totalPracticeTime: number;
    totalPracticeCount: number;
    averageAccuracy: number;
    averageWpm: number;
    bestWpm: number;
  };
  createdAt: string;
  lastLoginAt: string;
} 