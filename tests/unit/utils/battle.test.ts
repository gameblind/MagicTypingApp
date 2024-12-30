import { calculateDamage } from '../../../src/frontend/utils/battle';

describe('Battle Utils', () => {
  describe('calculateDamage', () => {
    test('伤害值应该在0到50之间', () => {
      const damage = calculateDamage(30);
      expect(damage).toBeGreaterThan(0);
      expect(damage).toBeLessThanOrEqual(50);
    });

    test('伤害值应该是整数', () => {
      const damage = calculateDamage(25);
      expect(Number.isInteger(damage)).toBe(true);
    });

    test('多次计算伤害应该有不同结果（随机性测试）', () => {
      const results = new Set();
      for (let i = 0; i < 100; i++) {
        results.add(calculateDamage(30));
      }
      // 由于随机性和暴击机制，应该有多个不同的结果
      expect(results.size).toBeGreaterThan(1);
    });
  });
}); 