// 计算伤害值
export const calculateDamage = (baseDamage: number): number => {
  const isCritical = Math.random() < 0.2; // 20%暴击率
  let damage = baseDamage;

  if (isCritical) {
    damage *= 1.5;
  }

  // 限制最大伤害为50
  return Math.min(50, Math.floor(damage));
}; 