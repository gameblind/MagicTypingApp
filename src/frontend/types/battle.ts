export interface SpellEffect {
  name: string;
  color: string;
  animation: string;
  sound: string;
}

export interface Spell {
  name: string;
  text: string;
  mpCost: number;
  damage: number;
  effect?: string;
}

export interface Character {
  name: string;
  image: string;
  maxHp: number;
  currentHp: number;
  maxMp: number;
  currentMp: number;
}

export interface BattleState {
  player: Character;
  enemy: Character;
  currentSpell: Spell | null;
  isPlayerTurn: boolean;
  battleLog: string[];
  isGameOver: boolean;
}

export type BattleStatus = 'ongoing' | 'victory' | 'defeat';
export type TurnPhase = 'player' | 'enemy'; 