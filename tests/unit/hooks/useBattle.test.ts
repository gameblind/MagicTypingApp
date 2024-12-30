import { renderHook, act } from '@testing-library/react-hooks';
import useBattle from '../../../src/frontend/hooks/useBattle';
import { SPELLS } from '../../../src/frontend/utils/spells';

const PLAYER_INIT = {
  name: '测试玩家',
  image: '/test.png',
  maxHp: 100,
  hp: 100,
  maxMp: 100,
  mp: 100,
};

const ENEMY_INIT = {
  name: '测试敌人',
  image: '/test.png',
  maxHp: 100,
  hp: 100,
  maxMp: 100,
  mp: 100,
};

describe('useBattle', () => {
  test('should initialize battle state correctly', () => {
    const { result } = renderHook(() => useBattle(PLAYER_INIT, ENEMY_INIT));
    
    expect(result.current.player).toEqual(PLAYER_INIT);
    expect(result.current.enemy).toEqual(ENEMY_INIT);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.isPlayerTurn).toBe(true);
  });

  test('should handle spell casting correctly', () => {
    const { result } = renderHook(() => useBattle(PLAYER_INIT, ENEMY_INIT));
    
    act(() => {
      result.current.castSpell(SPELLS.attack);
    });

    expect(result.current.enemy.hp).toBeLessThan(ENEMY_INIT.hp);
    expect(result.current.player.mp).toBe(PLAYER_INIT.mp); // 普通攻击不消耗MP
    expect(result.current.isPlayerTurn).toBe(false);
  });

  test('should not allow casting when not player turn', () => {
    const { result } = renderHook(() => useBattle(PLAYER_INIT, ENEMY_INIT));
    
    act(() => {
      result.current.castSpell(SPELLS.attack);
    });
    
    const enemyHp = result.current.enemy.hp;
    
    act(() => {
      result.current.castSpell(SPELLS.attack);
    });

    expect(result.current.enemy.hp).toBe(enemyHp);
  });

  test('should not allow casting when insufficient MP', () => {
    const { result } = renderHook(() => useBattle({
      ...PLAYER_INIT,
      mp: 0
    }, ENEMY_INIT));
    
    act(() => {
      result.current.castSpell(SPELLS.avadakedavra);
    });

    expect(result.current.enemy.hp).toBe(ENEMY_INIT.hp);
    expect(result.current.isPlayerTurn).toBe(true);
  });

  test('should end game when player or enemy HP reaches 0', () => {
    const { result } = renderHook(() => useBattle(PLAYER_INIT, {
      ...ENEMY_INIT,
      hp: 10
    }));
    
    act(() => {
      result.current.castSpell(SPELLS.avadakedavra);
    });

    expect(result.current.isGameOver).toBe(true);
    expect(result.current.enemy.hp).toBe(0);
  });
}); 