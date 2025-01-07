import React from 'react';

interface SpellEffectProps {
  spell: string;
  isPlayerCasting: boolean;
}

const SpellEffect: React.FC<SpellEffectProps> = ({ spell, isPlayerCasting }) => {
  return (
    <div
      className={`spell-effect ${spell.toLowerCase()} ${isPlayerCasting ? 'cast-right' : 'cast-left'}`}
    />
  );
};

export default SpellEffect; 