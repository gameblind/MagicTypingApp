import { renderHook, act } from '@testing-library/react-hooks';
import { useBattleResult } from '../../../src/frontend/hooks/useBattleResult';

describe('useBattleResult Hook', () => {
  test('战斗结束时应该设置正确的状态', () => {
    const { result } = renderHook(() => useBattleResult());

    act(() => {
      result.current.endBattle('victory');
    });

    expect(result.current.battleStatus).toBe('victory');
    expect(result.current.isGameOver).toBe(true);
  });

  test('战斗结束后不应该接受新的咒语输入', () => {
    const { result } = renderHook(() => useBattleResult());

    act(() => {
      result.current.endBattle('victory');
    });

    expect(result.current.canCastSpell).toBe(false);
  });

  test('战斗结束后应该清理所有计时器', () => {
    const { result } = renderHook(() => useBattleResult());

    act(() => {
      result.current.endBattle('victory');
    });

    expect(result.current.timers).toHaveLength(0);
  });
}); 