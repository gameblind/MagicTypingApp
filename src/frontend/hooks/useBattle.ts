import { useState, useCallback, useEffect } from 'react';
import { SPELLS } from '../data/spells';
import { Character, BattleState } from '../types/battle';
import { calculateDamage } from '../utils/battle';

const ENEMY_ATTACK_DELAY = 2000;

interface UseBattleReturn {
  player: Character;
  enemy: Character;
  battleState: BattleState;
  onSpellCast: (spellName: string) => void;
}

const useBattle = (initialPlayer: Character, initialEnemy: Character): UseBattleReturn => {
  const [player, setPlayer] = useState<Character>(initialPlayer);
  const [enemy, setEnemy] = useState<Character>(initialEnemy);
  const [battleState, setBattleState] = useState<BattleState>({
    status: 'playerTurn',
    effectActive: false,
    lastDamage: null,
    turn: 1,
    lastSpell: null,
    isCritical: false
  });

  // 检查战斗结束
  const checkBattleEnd = useCallback(() => {
    if (enemy.currentHp <= 0) {
      setBattleState(prev => ({
        ...prev,
        status: 'victory',
        effectActive: false,
        lastDamage: null
      }));
      return true;
    }
    if (player.currentHp <= 0) {
      setBattleState(prev => ({
        ...prev,
        status: 'defeat',
        effectActive: false,
        lastDamage: null
      }));
      return true;
    }
    return false;
  }, [enemy.currentHp, player.currentHp]);

  // 处理玩家回合
  const handlePlayerTurn = useCallback((spellName: string) => {
    const spell = SPELLS[spellName.toLowerCase()];
    if (!spell || player.currentMp < spell.mpCost) {
      return;
    }

    // 更新玩家MP
    setPlayer(prev => ({
      ...prev,
      currentMp: prev.currentMp - spell.mpCost
    }));

    // 计算伤害
    const damage = calculateDamage(spell.damage);
    const isCritical = damage > spell.damage;
    
    // 更新敌人HP
    setEnemy(prev => {
      const newHp = Math.max(0, prev.currentHp - damage);
      return {
        ...prev,
        currentHp: newHp
      };
    });

    // 更新战斗状态
    setBattleState(prev => ({
      ...prev,
      status: 'casting',
      effectActive: true,
      lastDamage: damage,
      lastSpell: spellName,
      isCritical
    }));

    // 延迟检查战斗结束
    setTimeout(() => {
      const isGameOver = checkBattleEnd();
      if (!isGameOver) {
        setBattleState(prev => ({
          ...prev,
          status: 'enemyTurn',
          effectActive: false,
          lastDamage: null,
          lastSpell: null,
          isCritical: false
        }));
      }
    }, 1000);
  }, [player, enemy, checkBattleEnd]);

  // 处理敌人回合
  useEffect(() => {
    if (battleState.status === 'enemyTurn') {
      const timer = setTimeout(() => {
        // 随机选择一个咒语
        const spells = Object.values(SPELLS);
        const availableSpells = spells.filter(spell => enemy.currentMp >= spell.mpCost);
        const spell = availableSpells[Math.floor(Math.random() * availableSpells.length)];
        
        if (!spell) {
          setBattleState(prev => ({
            ...prev,
            status: 'playerTurn',
            effectActive: false,
            lastDamage: null,
            lastSpell: null,
            isCritical: false
          }));
          return;
        }

        // 更新敌人MP
        setEnemy(prev => ({
          ...prev,
          currentMp: prev.currentMp - spell.mpCost
        }));

        // 计算伤害
        const damage = calculateDamage(spell.damage);
        const isCritical = damage > spell.damage;
        
        // 更新玩家HP
        setPlayer(prev => {
          const newHp = Math.max(0, prev.currentHp - damage);
          return {
            ...prev,
            currentHp: newHp
          };
        });

        // 更新战斗状态
        setBattleState(prev => ({
          ...prev,
          status: 'hit',
          effectActive: true,
          lastDamage: damage,
          lastSpell: spell.name,
          isCritical,
          turn: prev.turn + 1
        }));

        // 延迟检查战斗结束
        setTimeout(() => {
          const isGameOver = checkBattleEnd();
          if (!isGameOver) {
            setBattleState(prev => ({
              ...prev,
              status: 'playerTurn',
              effectActive: false,
              lastDamage: null,
              lastSpell: null,
              isCritical: false
            }));
          }
        }, 1000);
      }, ENEMY_ATTACK_DELAY);

      return () => clearTimeout(timer);
    }
  }, [battleState.status, enemy, checkBattleEnd]);

  return {
    player,
    enemy,
    battleState,
    onSpellCast: handlePlayerTurn
  };
};

export default useBattle; 