import { useState, useCallback, useEffect } from 'react';
import { BattleStatus } from '../types/battle';

export function useBattleResult() {
  const [battleStatus, setBattleStatus] = useState<BattleStatus>('ongoing');
  const [isGameOver, setIsGameOver] = useState(false);
  const [canCastSpell, setCanCastSpell] = useState(true);
  const [timers, setTimers] = useState<NodeJS.Timeout[]>([]);

  const endBattle = useCallback((status: 'victory' | 'defeat') => {
    setBattleStatus(status);
    setIsGameOver(true);
    setCanCastSpell(false);
  }, []);

  // 清理所有计时器
  useEffect(() => {
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      setTimers([]);
    };
  }, [timers]);

  return {
    battleStatus,
    isGameOver,
    canCastSpell,
    timers,
    endBattle
  };
} 