import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SPELLS } from '../data/spells';
import { Character, BattleState } from '../types/battle';

interface BattleFieldProps {
  player: Character;
  enemy: Character;
  battleState: BattleState;
  onSpellCast: (spell: string) => void;
}

const BattleField: React.FC<BattleFieldProps> = ({
  player,
  enemy,
  battleState,
  onSpellCast
}) => {
  const [input, setInput] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > input.length) {
      setInput(input + newValue.slice(-1));
    } else {
      setInput(newValue);
    }
    setIsInputError(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !battleState.effectActive) {
      const spell = SPELLS[input.toLowerCase()];
      if (!spell || player.currentMp < spell.mpCost) {
        setIsInputError(true);
        return;
      }
      onSpellCast(input);
      setInput('');
    }
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
            <span>{player.currentHp}/{player.maxHp}</span>
          </Box>
          <Box sx={{
            height: 8,
            backgroundColor: 'rgba(255, 68, 68, 0.2)',
            borderRadius: 4,
          }}>
            <Box sx={{
              width: `${(player.currentHp / player.maxHp) * 100}%`,
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
            <span>{player.currentMp}/{player.maxMp}</span>
          </Box>
          <Box sx={{
            height: 8,
            backgroundColor: 'rgba(77, 171, 245, 0.2)',
            borderRadius: 4,
          }}>
            <Box sx={{
              width: `${(player.currentMp / player.maxMp) * 100}%`,
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
            <span>{enemy.currentHp}/{enemy.maxHp}</span>
          </Box>
          <Box sx={{
            height: 8,
            backgroundColor: 'rgba(255, 68, 68, 0.2)',
            borderRadius: 4,
          }}>
            <Box sx={{
              width: `${(enemy.currentHp / enemy.maxHp) * 100}%`,
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
            <span>{enemy.currentMp}/{enemy.maxMp}</span>
          </Box>
          <Box sx={{
            height: 8,
            backgroundColor: 'rgba(77, 171, 245, 0.2)',
            borderRadius: 4,
          }}>
            <Box sx={{
              width: `${(enemy.currentMp / enemy.maxMp) * 100}%`,
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

      {/* 伤害数字 */}
      {battleState.lastDamage && (
        <Box sx={{
          position: 'absolute',
          top: '40%',
          right: '35%',
          color: '#ff4444',
          fontSize: '48px',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
          animation: 'damage 0.5s ease-out',
          '@keyframes damage': {
            '0%': { opacity: 0, transform: 'translateY(0)' },
            '50%': { opacity: 1, transform: 'translateY(-20px)' },
            '100%': { opacity: 0, transform: 'translateY(-40px)' },
          },
        }}>
          -{battleState.lastDamage}
        </Box>
      )}

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
          {battleState.status === 'playerTurn' ? '你的回合！' :
           battleState.status === 'enemyTurn' ? '敌人回合！' :
           battleState.status === 'casting' ? '施法中...' :
           battleState.status === 'hit' ? '命中！' : '准备战斗！'}
        </Box>

        {/* 输入框 */}
        <Box sx={{
          width: '100%',
          mb: 2,
        }}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={battleState.effectActive || battleState.status === 'enemyTurn'}
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
            }}
          />
        </Box>

        {/* 咒语列表 */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
        }}>
          {Object.entries(SPELLS).map(([key, spell]) => (
            <Box
              key={key}
              onClick={() => {
                if (player.currentMp >= spell.mpCost) {
                  onSpellCast(key);
                }
              }}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: `1px solid ${player.currentMp >= spell.mpCost ? '#FFD700' : '#666'}`,
                borderRadius: '5px',
                padding: '8px 16px',
                color: '#fff',
                fontSize: '14px',
                cursor: player.currentMp >= spell.mpCost ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                '&:hover': player.currentMp >= spell.mpCost ? {
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

      {/* 结束提示 */}
      {(battleState.status === 'victory' || battleState.status === 'defeat') && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            border: `3px solid ${battleState.status === 'victory' ? '#4caf50' : '#ff4444'}`,
            zIndex: 1000,
          }}
        >
          <Box sx={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: battleState.status === 'victory' ? '#4caf50' : '#ff4444',
            mb: 3,
          }}>
            {battleState.status === 'victory' ? '胜利！' : '失败！'}
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
    </Box>
  );
};

export default BattleField;