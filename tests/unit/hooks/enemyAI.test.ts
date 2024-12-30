import { renderHook, act } from '@testing-library/react-hooks';
import { useEnemyAI } from '../../../src/frontend/hooks/useEnemyAI';
import { SPELLS } from '../../../src/frontend/utils/spells';

describe('useEnemyAI Hook', () => {
  const mockPlayer = {
    name: 'Harry Potter',
    maxHp: 100,
    hp: 100,
    maxMp: 100,
    mp: 100
  };

  const mockEnemy = {
    name: 'Death Eater',
    maxHp: 100,
    hp: 100,
    maxMp: 100,
    mp: 100
  };

  test('敌人应该在回合开始时自动攻击', () => {
    const { result } = renderHook(() => useEnemyAI(mockPlayer, mockEnemy));

    act(() => {
      result.current.startTurn();
    });

    expect(result.current.enemy.mp).toBeLessThan(mockEnemy.mp);
    expect(result.current.player.hp).toBeLessThan(mockPlayer.hp);
  });

  test('敌人MP不足时应该使用基础攻击', () => {
    const lowMpEnemy = { ...mockEnemy, mp: 0 };
    const { result } = renderHook(() => useEnemyAI(mockPlayer, lowMpEnemy));

    act(() => {
      result.current.startTurn();
    });

    expect(result.current.player.hp).toBeLessThan(mockPlayer.hp);
  });

  test('敌人应该选择合适的咒语', () => {
    const { result } = renderHook(() => useEnemyAI(mockPlayer, mockEnemy));

    act(() => {
      result.current.startTurn();
    });

    const usedSpell = result.current.lastUsedSpell;
    expect(usedSpell).not.toBeNull();
    if (usedSpell) {
      expect(Object.values(SPELLS)).toContain(usedSpell);
      expect(usedSpell.mpCost).toBeLessThanOrEqual(mockEnemy.mp);
    }
  });
}); 