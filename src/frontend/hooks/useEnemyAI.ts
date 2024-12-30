import { useState, useCallback } from 'react';
import { Character, Spell } from '../types/battle';
import { SPELLS } from '../utils/spells';
import { calculateDamage } from '../utils/battle';

const BASE_ATTACK_DAMAGE = 10;

export function useEnemyAI(initialPlayer: Character, initialEnemy: Character) {
  const [player, setPlayer] = useState(initialPlayer);
  const [enemy, setEnemy] = useState(initialEnemy);
  const [lastUsedSpell, setLastUsedSpell] = useState<Spell | null>(null);

  const startTurn = useCallback(() => {
    // 选择可用的咒语
    const availableSpells = Object.values(SPELLS).filter(spell => enemy.mp >= spell.mpCost);
    const selectedSpell = availableSpells[Math.floor(Math.random() * availableSpells.length)];

    if (selectedSpell) {
      setLastUsedSpell(selectedSpell);
      
      // 更新敌人MP
      setEnemy(prev => ({
        ...prev,
        mp: prev.mp - selectedSpell.mpCost
      }));

      // 更新玩家HP
      const damage = calculateDamage(selectedSpell.damage);
      setPlayer(prev => ({
        ...prev,
        hp: Math.max(0, prev.hp - damage)
      }));
    } else {
      // 使用基础攻击
      setLastUsedSpell(null);
      const damage = calculateDamage(BASE_ATTACK_DAMAGE);
      setPlayer(prev => ({
        ...prev,
        hp: Math.max(0, prev.hp - damage)
      }));
    }
  }, [enemy.mp]);

  return {
    enemy,
    player,
    lastUsedSpell,
    startTurn
  };
} 