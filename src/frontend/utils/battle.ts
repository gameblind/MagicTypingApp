/**
 * 计算实际伤害值
 * @param baseDamage 基础伤害值
 * @returns 实际伤害值
 */
export function calculateDamage(baseDamage: number): number {
  // 伤害浮动范围：80% - 120%
  const multiplier = 0.8 + Math.random() * 0.4;
  return Math.floor(baseDamage * multiplier);
} 