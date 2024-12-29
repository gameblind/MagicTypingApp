import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BattleField from '../components/BattleField';
import useBattle from '../hooks/useBattle';

const PLAYER_INIT = {
  name: '哈利·波特',
  image: '/assets/images/harry.png',
  maxHp: 100,
  currentHp: 100,
  maxMp: 100,
  currentMp: 100,
};

const ENEMY_INIT = {
  name: '伏地魔',
  image: '/assets/images/voldemort.png',
  maxHp: 100,
  currentHp: 100,
  maxMp: 100,
  currentMp: 100,
};

const Battle: React.FC = () => {
  const navigate = useNavigate();
  const { player, enemy, battleState, onSpellCast } = useBattle(PLAYER_INIT, ENEMY_INIT);

  // 监听Enter键重新开始游戏
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (battleState.status === 'victory' || battleState.status === 'defeat')) {
        window.location.reload();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [battleState.status]);

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      backgroundColor: '#000',
    }}>
      <BattleField
        player={player}
        enemy={enemy}
        battleState={battleState}
        onSpellCast={onSpellCast}
      />
    </Box>
  );
};

export default Battle;