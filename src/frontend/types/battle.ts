export type BattleStatus = 
  | 'playerTurn'   // 玩家回合
  | 'enemyTurn'    // 敌人回合
  | 'casting'      // 施法中
  | 'hit'          // 命中
  | 'victory'      // 胜利
  | 'defeat';      // 失败

export interface Character {
  name: string;
  image: string;
  maxHp: number;
  currentHp: number;
  maxMp: number;
  currentMp: number;
}

export interface SpellEffect {
  damage: number;
  mpCost: number;
  sound?: string;
  animation?: string;
}

export interface BattleState {
  status: BattleStatus;
  effectActive: boolean;
  lastDamage: number | null;
  turn: number;
  lastSpell: string | null;
  isCritical: boolean;
}

export interface SpellCastResult {
  damage: number;
  mpCost: number;
  isCritical: boolean;
  effect: SpellEffect;
} 