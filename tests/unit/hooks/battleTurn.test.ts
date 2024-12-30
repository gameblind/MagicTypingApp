import { renderHook, act } from '@testing-library/react-hooks';
import { useBattleTurn } from '../../../src/frontend/hooks/useBattleTurn';

describe('useBattleTurn Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('应该正确切换回合', () => {
    const { result } = renderHook(() => useBattleTurn());

    expect(result.current.turn).toBe('player');

    act(() => {
      result.current.endTurn();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.turn).toBe('enemy');

    act(() => {
      result.current.endTurn();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.turn).toBe('player');
  });

  test('回合切换时应该重置状态', () => {
    const { result } = renderHook(() => useBattleTurn());

    act(() => {
      result.current.setEffect(true);
      result.current.endTurn();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.effectActive).toBe(false);
  });

  test('战斗结束后不应该切换回合', () => {
    const { result } = renderHook(() => useBattleTurn());

    act(() => {
      result.current.endBattle('victory');
    });

    expect(result.current.battleStatus).toBe('victory');

    act(() => {
      result.current.endTurn();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.turn).toBe('player');
  });
}); 