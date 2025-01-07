export interface PracticeRecord {
  spell: string;
  accuracy: number;
  wpm: number;
  date: string;
}

export interface PracticeStats {
  totalPractices: number;
  averageAccuracy: number;
  averageWPM: number;
  lastPracticeDate: string | null;
} 