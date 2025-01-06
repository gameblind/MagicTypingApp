import React, { createContext, useContext, useCallback } from 'react';
import {
  loadStatistics,
  updatePracticeStats,
  updateBattleStats,
  getStatsInRange,
  getSpellMasteryRanking,
  getStatsSummary,
} from '../utils/statisticsManager';
import { UserStatistics, DailyStats, SpellStats } from '../types/statistics';

interface StatisticsContextType {
  statistics: UserStatistics;
  updatePractice: (
    duration: number,
    totalChars: number,
    correctChars: number,
    spellName: string,
    completed: boolean,
    speed: number
  ) => void;
  updateBattle: (
    victory: boolean,
    spellsUsed: number,
    damageDealt: number,
    damageTaken: number
  ) => void;
  getDateRangeStats: (startDate: string, endDate: string) => DailyStats[];
  getSpellRanking: () => SpellStats[];
  getSummary: () => {
    totalPracticeTime: number;
    averageAccuracy: number;
    spellsMastered: number;
    battleWinRate: number;
    currentStreak: number;
    longestStreak: number;
  };
}

const StatisticsContext = createContext<StatisticsContextType | null>(null);

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [statistics, setStatistics] = React.useState<UserStatistics>(loadStatistics());

  const updatePractice = useCallback((
    duration: number,
    totalChars: number,
    correctChars: number,
    spellName: string,
    completed: boolean,
    speed: number
  ) => {
    updatePracticeStats(duration, totalChars, correctChars, spellName, completed, speed);
    setStatistics(loadStatistics());
  }, []);

  const updateBattle = useCallback((
    victory: boolean,
    spellsUsed: number,
    damageDealt: number,
    damageTaken: number
  ) => {
    updateBattleStats(victory, spellsUsed, damageDealt, damageTaken);
    setStatistics(loadStatistics());
  }, []);

  const getDateRangeStats = useCallback((startDate: string, endDate: string) => {
    return getStatsInRange(startDate, endDate);
  }, []);

  const getSpellRanking = useCallback(() => {
    return getSpellMasteryRanking();
  }, []);

  const getSummary = useCallback(() => {
    return getStatsSummary();
  }, []);

  return (
    <StatisticsContext.Provider
      value={{
        statistics,
        updatePractice,
        updateBattle,
        getDateRangeStats,
        getSpellRanking,
        getSummary,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
}; 