import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import * as path from 'path';
import { app } from 'electron';
import { PracticeStats, SpellStats, UserStatistics } from '../../types/statistics';

// 定义数据库结构
interface DatabaseSchema {
  statistics: {
    practice: PracticeStats;
    spells: { [key: string]: SpellStats };
    daily: { [key: string]: PracticeStats };
  };
}

class DatabaseManager {
  private db: Low<DatabaseSchema>;
  private static instance: DatabaseManager;

  private constructor() {
    const dbPath = path.join(app.getPath('userData'), 'database.json');
    const adapter = new JSONFile<DatabaseSchema>(dbPath);
    this.db = new Low(adapter, {
      statistics: {
        practice: {
          totalTime: 0,
          totalChars: 0,
          correctChars: 0,
          wrongChars: 0,
          totalSpells: 0,
          completedSpells: 0
        },
        spells: {},
        daily: {}
      }
    });
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async initialize(): Promise<void> {
    await this.db.read();
    // 确保数据结构完整
    if (!this.db.data) {
      this.db.data = {
        statistics: {
          practice: {
            totalTime: 0,
            totalChars: 0,
            correctChars: 0,
            wrongChars: 0,
            totalSpells: 0,
            completedSpells: 0
          },
          spells: {},
          daily: {}
        }
      };
      await this.db.write();
    }
  }

  public async getStatistics(): Promise<UserStatistics> {
    await this.db.read();
    return {
      practice: this.db.data.statistics.practice,
      spells: this.db.data.statistics.spells,
      daily: this.db.data.statistics.daily
    };
  }

  public async updatePracticeStats(stats: Partial<PracticeStats>, spellId?: string): Promise<void> {
    await this.db.read();
    
    // 更新总体练习统计
    Object.assign(this.db.data.statistics.practice, stats);
    
    // 更新特定咒语统计
    if (spellId) {
      if (!this.db.data.statistics.spells[spellId]) {
        this.db.data.statistics.spells[spellId] = {
          attempts: 0,
          completions: 0,
          totalTime: 0,
          bestTime: Infinity,
          averageAccuracy: 0
        };
      }
      
      const spellStats = this.db.data.statistics.spells[spellId];
      spellStats.attempts = (spellStats.attempts || 0) + 1;
      if (stats.completed) {
        spellStats.completions = (spellStats.completions || 0) + 1;
      }
      if (stats.time) {
        spellStats.totalTime = (spellStats.totalTime || 0) + stats.time;
        if (stats.completed && stats.time < spellStats.bestTime) {
          spellStats.bestTime = stats.time;
        }
      }
      if (stats.accuracy) {
        const totalAttempts = spellStats.attempts || 1;
        spellStats.averageAccuracy = 
          ((spellStats.averageAccuracy || 0) * (totalAttempts - 1) + stats.accuracy) / totalAttempts;
      }
    }
    
    // 更新每日统计
    const today = new Date().toISOString().split('T')[0];
    if (!this.db.data.statistics.daily[today]) {
      this.db.data.statistics.daily[today] = {
        totalTime: 0,
        totalChars: 0,
        correctChars: 0,
        wrongChars: 0,
        totalSpells: 0,
        completedSpells: 0
      };
    }
    Object.assign(this.db.data.statistics.daily[today], stats);
    
    await this.db.write();
  }
}

export const db = DatabaseManager.getInstance(); 