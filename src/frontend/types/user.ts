import { PracticeStats } from './practice';

export type Achievement = 
  | 'perfect_spell'   // 完美施法
  | 'speed_wizard'    // 速度大师
  | 'practice_master' // 练习达人
  | 'battle_winner'   // 对战胜利者
  | 'spell_collector' // 咒语收集者
  | 'daily_practice'; // 每日练习

export interface SpellProgress {
  [spellName: string]: {
    bestAccuracy: number;
    bestWPM: number;
    practiceCount: number;
    lastPracticeDate: string;
  };
}

export interface BattleRecord {
  opponent: string;
  result: 'win' | 'lose';
  date: string;
  spellUsed: string;
  accuracy: number;
  wpm: number;
}

export interface UserData {
  achievements: Achievement[];
  spellProgress: SpellProgress;
  battleRecords: BattleRecord[];
  stats: PracticeStats;
} 