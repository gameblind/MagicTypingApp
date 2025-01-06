import { db } from './index';
import { UserStatistics } from '../../frontend/types/statistics';

export class DatabaseMigration {
  async migrateFromLocalStorage(): Promise<void> {
    try {
      // 从 localStorage 获取数据
      const oldData = localStorage.getItem('harry_typing_statistics');
      if (!oldData) {
        console.log('没有找到需要迁移的数据');
        return;
      }

      const stats: UserStatistics = JSON.parse(oldData);

      // 使用事务进行数据迁移
      await db.transaction(async () => {
        // 迁移练习记录
        if (stats.practice) {
          const run = promisify(db.run.bind(db));
          await run(`
            INSERT INTO practice_records (
              spell_name,
              duration,
              total_chars,
              correct_chars,
              speed,
              completed,
              practice_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
          `, [
            stats.practice.spellName,
            stats.practice.duration,
            stats.practice.totalChars,
            stats.practice.correctChars,
            stats.practice.speed,
            stats.practice.completed,
            new Date()
          ]);
        }

        // 迁移咒语进度
        if (stats.spells && stats.spells.length > 0) {
          for (const spell of stats.spells) {
            await db.run(`
              INSERT INTO spell_progress (
                spell_id,
                name,
                grade,
                attempts,
                completions,
                best_accuracy,
                best_speed,
                last_practice
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [
              spell.spellId,
              spell.name,
              spell.grade,
              spell.attempts,
              spell.completions,
              spell.bestAccuracy,
              spell.bestSpeed,
              new Date(spell.lastPracticed)
            ]);
          }
        }

        // 迁移每日统计
        if (stats.dailyStats && stats.dailyStats.length > 0) {
          for (const daily of stats.dailyStats) {
            await db.run(`
              INSERT INTO daily_stats (
                date,
                total_time,
                total_chars,
                correct_chars,
                spells_practiced,
                spells_completed
              ) VALUES (?, ?, ?, ?, ?, ?)
            `, [
              daily.date,
              daily.practiceTime,
              daily.totalChars,
              daily.correctChars,
              daily.spellsPracticed,
              daily.spellsCompleted
            ]);
          }
        }
      });

      console.log('数据迁移完成');
      
      // 迁移完成后清除旧数据
      localStorage.removeItem('harry_typing_statistics');
    } catch (error) {
      console.error('数据迁移失败:', error);
      throw error;
    }
  }
}

export const migration = new DatabaseMigration(); 