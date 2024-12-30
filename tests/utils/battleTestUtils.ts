import { Character } from '../../src/frontend/types/battle';

export const createMockPlayer = (overrides = {}): Character => ({
  name: '哈利·波特',
  image: '/assets/images/harry.png',
  maxHp: 100,
  currentHp: 100,
  maxMp: 100,
  currentMp: 100,
  ...overrides
});

export const createMockEnemy = (overrides = {}): Character => ({
  name: '伏地魔',
  image: '/assets/images/voldemort.png',
  maxHp: 100,
  currentHp: 100,
  maxMp: 100,
  currentMp: 100,
  ...overrides
});

export const waitForBattleEffect = (advanceTimers: (ms: number) => void) => {
  advanceTimers(1000);
};

export const waitForEnemyTurn = (advanceTimers: (ms: number) => void) => {
  advanceTimers(2000);
};

export const waitForTurnEnd = (advanceTimers: (ms: number) => void) => {
  waitForBattleEffect(advanceTimers);
  waitForEnemyTurn(advanceTimers);
  waitForBattleEffect(advanceTimers);
}; 