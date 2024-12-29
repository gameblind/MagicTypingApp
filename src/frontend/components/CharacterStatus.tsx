import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { Character } from '../types/battle';

interface CharacterStatusProps {
  character: Character;
  isEnemy?: boolean;
}

const CharacterStatus: React.FC<CharacterStatusProps> = ({ character, isEnemy = false }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 20,
        [isEnemy ? 'right' : 'left']: 20,
        width: 300,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '16px',
        border: '2px solid #ffd700',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* 角色信息 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #ffd700',
          }}
        >
          <img
            src={character.image}
            alt={character.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ 
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
            mb: 0.5
          }}>
            {character.name}
          </Box>
        </Box>
      </Box>

      {/* HP条 */}
      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          color: '#ff4444',
          fontSize: '1rem',
          fontWeight: 'bold',
          mb: 0.5
        }}>
          <span>HP</span>
          <span>{character.currentHp}/{character.maxHp}</span>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(character.currentHp / character.maxHp) * 100}
          sx={{
            height: 12,
            borderRadius: 6,
            backgroundColor: 'rgba(255, 68, 68, 0.2)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#ff4444',
              borderRadius: 6,
            },
          }}
        />
      </Box>

      {/* MP条 */}
      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          color: '#4dabf5',
          fontSize: '1rem',
          fontWeight: 'bold',
          mb: 0.5
        }}>
          <span>MP</span>
          <span>{character.currentMp}/{character.maxMp}</span>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(character.currentMp / character.maxMp) * 100}
          sx={{
            height: 12,
            borderRadius: 6,
            backgroundColor: 'rgba(77, 171, 245, 0.2)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#4dabf5',
              borderRadius: 6,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CharacterStatus; 