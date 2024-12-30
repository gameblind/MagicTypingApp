import { useState, useCallback } from 'react';
import { TurnPhase, BattleStatus } from '../types/battle';

export function useBattleTurn() {
  const [turn, setTurn] = useState<TurnPhase>('player');
  const [effectActive, setEffect] = useState(false);
  const [battleStatus, setBattleStatus] = useState<BattleStatus>('ongoing');

  const endTurn = useCallback(() => {
    if (battleStatus !== 'ongoing') return;

    setEffect(false);
    setTimeout(() => {
      setTurn(prev => prev === 'player' ? 'enemy' : 'player');
    }, 1000);
  }, [battleStatus]);

  const setEffectActive = useCallback((active: boolean) => {
    setEffect(active);
  }, []);

  const endBattle = useCallback((status: 'victory' | 'defeat') => {
    setBattleStatus(status);
  }, []);

  return {
    turn,
    effectActive,
    battleStatus,
    endTurn,
    setEffect: setEffectActive,
    endBattle
  };
}