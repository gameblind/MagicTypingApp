import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SPELLS } from '../utils/spells';
import { Character, Spell } from '../types/battle';
import SpellEffect from './SpellEffect';
import { playSpellSound, playHitSound, playSpellCastSound } from '../utils/audio';

interface BattleFieldProps {
  player: Character;
  enemy: Character;
  isGameOver: boolean;
  isPlayerTurn: boolean;
  onSpellCast: (spell: Spell) => void;
  onEnemyTurn?: (spell: Spell) => void;
}

const BattleField: React.FC<BattleFieldProps> = ({
  player,
  enemy,
  isGameOver,
  isPlayerTurn,
  onSpellCast,
  onEnemyTurn
}) => {
  const [input, setInput] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const navigate = useNavigate();
  const spellInputRef = useRef<HTMLInputElement>(null);
  const [activeSpell, setActiveSpell] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase();
    setInput(newValue);
    setIsInputError(false);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isGameOver) {
      const spell = SPELLS[input.toLowerCase()];
      if (!spell || player.mp < spell.mpCost) {
        setIsInputError(true);
        return;
      }
      await handleSpellCast(spell);
      setInput('');
    }
  };

  const handleSpellCast = (spell: Spell) => {
    console.log('玩家施放法术:', spell.name, '魔法消耗:', spell.mpCost, '预期伤害:', spell.damage);
    
    // 返回一个 Promise，在特效完成后才解析
    return new Promise<void>(resolve => {
      playSpellSound(spell.name);
      console.log('玩家施放法术音效');
      
      setActiveSpell(spell.name);
      console.log('玩家施法特效开始');
      
      setTimeout(() => {
        playHitSound();
        console.log('玩家法术命中音效播放');
      }, 800);
      
      setTimeout(() => {
        setActiveSpell(null);
        console.log('玩家施法特效结束');
        resolve(); // 特效完成后解析 Promise
      }, 1000);
    }).then(() => {
      // 特效完成后再切换回合
      onSpellCast(spell);
      console.log('玩家回合结束，通知游戏状态更新');
    });
  };

  // 首次加载时激活输入框
  useEffect(() => {
    if (spellInputRef.current) {
      spellInputRef.current.focus();
    }
  }, []);

  // 当轮到玩家回合时激活输入框
  useEffect(() => {
    if (isPlayerTurn && spellInputRef.current) {
      spellInputRef.current.focus();
    }
  }, [isPlayerTurn]);

  // 处理敌人施法
  useEffect(() => {
    if (!isPlayerTurn && !isGameOver) {
      console.log('开始敌人回合');
      
      // 从 SPELLS 中选择可用的咒语（基于MP消耗）
      const availableSpells = Object.values(SPELLS).filter(spell => 
        enemy.mp >= spell.mpCost
      );
      
      if (availableSpells.length === 0) {
        const defaultSpell = SPELLS.attack;
        console.log('敌人MP不足，使用普通攻击');
        handleEnemySpellCast(defaultSpell);
        return;
      }
      
      availableSpells.sort((a, b) => b.damage - a.damage);
      const topSpells = availableSpells.slice(0, 3);
      const randomSpell = topSpells[Math.floor(Math.random() * topSpells.length)];
      
      // 使用 setTimeout 避免重复触发
      const timer = setTimeout(() => {
        handleEnemySpellCast(randomSpell);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, isGameOver]);  // 这里的依赖项可能导致多次触发

  // 处理敌人施法的具体逻辑
  const handleEnemySpellCast = (spell: Spell) => {
    console.log('敌人选择咒语:', spell.name, '魔法消耗:', spell.mpCost, '预期伤害:', spell.damage);
    
    playSpellSound(spell.name);
    console.log('敌人施放法术音效');
    
    setActiveSpell(spell.name);
    console.log('敌人施法特效开始');
    
    setTimeout(() => {
      playHitSound();
      console.log('敌人法术命中音效播放');
    }, 800);
    
    setTimeout(() => {
      setActiveSpell(null);
      console.log('清理敌人特效完成');
      
      // 特效完成后再通知父组件切换回合，并传递咒语信息
      if (onEnemyTurn) {
        onEnemyTurn(spell);  // 传递咒语信息，以便父组件扣除 MP
        console.log('敌人回合结束，通知游戏状态更新');
      }
    }, 1000);
  };

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/assets/images/dark-potions-classroom-with-mysterious-book-and-si.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 左侧玩家状态 */}
      <Box sx={{
        position: 'absolute',
        top: 60,
        left: 20,
        width: 280,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        border: '2px solid #FFD700',
        padding: '15px',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            component="img"
            src={player.image}
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              border: '2px solid #FFD700',
            }}
          />
          <Box sx={{ color: '#fff', fontSize: '1.2rem' }}>{player.name}</Box>
        </Box>
        {/* HP条 */}
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#ff4444', mb: 0.5 }}>
            <span>HP</span>
            <span>{player.hp}/{player.maxHp}</span>
          </Box>
          <Box sx={{
            height: 8,
            backgroundColor: 'rgba(255, 68, 68, 0.2)',
            borderRadius: 4,
          }}>
            <Box sx={{
              width: `${(player.hp / player.maxHp) * 100}%`,
              height: '100%',
              backgroundColor: '#ff4444',
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }} />
          </Box>
        </Box>
        {/* MP条 */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#4dabf5', mb: 0.5 }}>
            <span>MP</span>
            <span>{player.mp}/{player.maxMp}</span>
          </Box>
          <Box sx={{
            height: 8,
            backgroundColor: 'rgba(77, 171, 245, 0.2)',
            borderRadius: 4,
          }}>
            <Box sx={{
              width: `${(player.mp / player.maxMp) * 100}%`,
              height: '100%',
              backgroundColor: '#4dabf5',
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }} />
          </Box>
        </Box>
      </Box>

      {/* 右侧敌人状态 */}
      <Box sx={{
        position: 'absolute',
        top: 60,
        right: 20,
        width: 280,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        border: '2px solid #ff4444',
        padding: '15px',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            component="img"
            src={enemy.image}
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              border: '2px solid #ff4444',
            }}
          />
          <Box sx={{ color: '#fff', fontSize: '1.2rem' }}>{enemy.name}</Box>
        </Box>
        {/* HP条 */}
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#ff4444', mb: 0.5 }}>
            <span>HP</span>
            <span>{enemy.hp}/{enemy.maxHp}</span>
          </Box>
          <Box sx={{
            height: 8,
            backgroundColor: 'rgba(255, 68, 68, 0.2)',
            borderRadius: 4,
          }}>
            <Box sx={{
              width: `${(enemy.hp / enemy.maxHp) * 100}%`,
              height: '100%',
              backgroundColor: '#ff4444',
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }} />
          </Box>
        </Box>
        {/* MP条 */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#4dabf5', mb: 0.5 }}>
            <span>MP</span>
            <span>{enemy.mp}/{enemy.maxMp}</span>
          </Box>
          <Box sx={{
            height: 8,
            backgroundColor: 'rgba(77, 171, 245, 0.2)',
            borderRadius: 4,
          }}>
            <Box sx={{
              width: `${(enemy.mp / enemy.maxMp) * 100}%`,
              height: '100%',
              backgroundColor: '#4dabf5',
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }} />
          </Box>
        </Box>
      </Box>

      {/* 战斗场景 */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 200px',
      }}>
        {/* 玩家立绘 */}
        <Box sx={{
          width: 400,
          height: 600,
          position: 'relative',
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        }}>
          <img
            src={player.image}
            alt={player.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))',
            }}
          />
        </Box>

        {/* 敌人立绘 */}
        <Box sx={{
          width: 400,
          height: 600,
          position: 'relative',
          animation: 'float 3s ease-in-out infinite',
          animationDelay: '1.5s',
        }}>
          <img
            src={enemy.image}
            alt={enemy.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 20px rgba(255, 68, 68, 0.3))',
            }}
          />
        </Box>
      </Box>

      {/* 底部控制区域 */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        padding: '20px',
      }}>
        {/* 回合状态 */}
        <Box sx={{
          color: '#FFD700',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2,
        }}>
          {isGameOver ? (enemy.hp <= 0 ? '胜利！' : '失败！') :
           isPlayerTurn ? '你的回合！' : '敌人回合！'}
        </Box>

        {/* 输入框 */}
        <Box sx={{
          width: '100%',
          mb: 2,
        }}>
          <input
            ref={spellInputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={!isPlayerTurn || isGameOver}
            placeholder="输入咒语..."
            style={{
              width: '100%',
              background: 'transparent',
              border: `2px solid ${isInputError ? '#ff4444' : '#FFD700'}`,
              borderRadius: '8px',
              padding: '12px 20px',
              color: '#FFD700',
              fontSize: '24px',
              textAlign: 'center',
              outline: 'none',
              opacity: (!isPlayerTurn || isGameOver) ? 0.5 : 1,
            }}
          />
        </Box>

        {/* 咒语列表 */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          opacity: (!isPlayerTurn || isGameOver) ? 0.5 : 1,
        }}>
          {Object.entries(SPELLS).map(([key, spell]) => (
            <Box
              key={key}
              onClick={async () => {
                if (player.mp >= spell.mpCost && isPlayerTurn && !isGameOver) {
                  await handleSpellCast(spell);
                }
              }}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: `1px solid ${player.mp >= spell.mpCost ? '#FFD700' : '#666'}`,
                borderRadius: '5px',
                padding: '8px 16px',
                color: '#fff',
                fontSize: '14px',
                cursor: player.mp >= spell.mpCost && isPlayerTurn && !isGameOver ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                '&:hover': player.mp >= spell.mpCost && isPlayerTurn && !isGameOver ? {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  transform: 'translateY(-2px)',
                } : {},
              }}
            >
              <span style={{ color: '#FFD700' }}>{key}</span>
              <span>{spell.name}</span>
              <span style={{ color: '#4dabf5' }}>MP:{spell.mpCost}</span>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 游戏结束提示 */}
      {isGameOver && (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          border: `3px solid ${enemy.hp <= 0 ? '#4caf50' : '#ff4444'}`,
          zIndex: 1000,
        }}>
          <Box sx={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: enemy.hp <= 0 ? '#4caf50' : '#ff4444',
            mb: 3,
          }}>
            {enemy.hp <= 0 ? '胜利！' : '失败！'}
          </Box>
          <Box sx={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
          }}>
            <Box
              onClick={() => window.location.reload()}
              sx={{
                backgroundColor: '#4caf50',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
              }}
            >
              重新开始 (Enter)
            </Box>
            <Box
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: '#666',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#555',
                },
              }}
            >
              返回主页
            </Box>
          </Box>
        </Box>
      )}

      {/* 添加特效层 */}
      {activeSpell && (
        <SpellEffect 
          spell={activeSpell}
          isPlayerCasting={isPlayerTurn}
        />
      )}
    </Box>
  );
};

export default BattleField;