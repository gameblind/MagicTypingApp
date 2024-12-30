export interface SpellEffect {
  name: string;
  color: string;
  animation: string;
  sound: string;
}

export interface Spell {
  name: string;
  damage: number;
  mpCost: number;
  description: string;
  effect: SpellEffect;
}

export interface Character {
  name: string;
  image: string;
  maxHp: number;
  hp: number;
  maxMp: number;
  mp: number;
}

export type BattleStatus = 'ongoing' | 'victory' | 'defeat';
export type TurnPhase = 'player' | 'enemy'; 