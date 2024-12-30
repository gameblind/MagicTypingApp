import { useState, useEffect } from 'react';
import { Character, Spell } from '../types/battle';
import { calculateDamage } from '../utils/battle';
import { SPELLS } from '../utils/spells';

export default function useBattle(initialPlayer: Character, initialEnemy: Character) {
  const [player, setPlayer] = useState(initialPlayer);
  const [enemy, setEnemy] = useState(initialEnemy);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // 敌人AI选择咒语
  const selectEnemySpell = () => {
    const availableSpells = Object.values(SPELLS).filter(spell => enemy.mp >= spell.mpCost);
    if (availableSpells.length === 0) return null;
    return availableSpells[Math.floor(Math.random() * availableSpells.length)];
  };

  // 玩家施法
  const castSpell = (spell: Spell) => {
    if (isGameOver || !isPlayerTurn || player.mp < spell.mpCost) return;

    // 扣除MP
    setPlayer(prev => ({
      ...prev,
      mp: prev.mp - spell.mpCost
    }));

    // 计算伤害
    const damage = calculateDamage(spell.damage);

    // 更新敌人HP
    setEnemy(prev => ({
      ...prev,
      hp: Math.max(0, prev.hp - damage)
    }));

    // 切换到敌人回合
    setIsPlayerTurn(false);
  };

  // 敌人回合
  useEffect(() => {
    if (!isPlayerTurn && !isGameOver) {
      const timer = setTimeout(() => {
        const spell = selectEnemySpell();
        if (spell) {
          // 扣除MP
          setEnemy(prev => ({
            ...prev,
            mp: prev.mp - spell.mpCost
          }));

          // 计算伤害
          const damage = calculateDamage(spell.damage);

          // 更新玩家HP
          setPlayer(prev => ({
            ...prev,
            hp: Math.max(0, prev.hp - damage)
          }));
        }

        // 切换回玩家回合
        setIsPlayerTurn(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, isGameOver, enemy.mp]);

  // 检查游戏结束条件
  useEffect(() => {
    if (player.hp <= 0 || enemy.hp <= 0) {
      setIsGameOver(true);
    }
  }, [player.hp, enemy.hp]);

  return {
    player,
    enemy,
    isGameOver,
    castSpell,
    isPlayerTurn
  };
} 