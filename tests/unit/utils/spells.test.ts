import { SPELLS } from '../../../src/frontend/utils/spells';

describe('Spells', () => {
  test('should have basic attack spell', () => {
    expect(SPELLS.attack).toBeDefined();
    expect(SPELLS.attack.name).toBe('普通攻击');
    expect(SPELLS.attack.mpCost).toBe(0);
    expect(SPELLS.attack.damage).toBe(10);
  });

  test('all spells should have required properties', () => {
    Object.values(SPELLS).forEach(spell => {
      expect(spell).toHaveProperty('name');
      expect(spell).toHaveProperty('damage');
      expect(spell).toHaveProperty('mpCost');
      expect(spell).toHaveProperty('description');
      expect(spell).toHaveProperty('effect');
      expect(spell.effect).toHaveProperty('name');
      expect(spell.effect).toHaveProperty('color');
      expect(spell.effect).toHaveProperty('animation');
      expect(spell.effect).toHaveProperty('sound');
    });
  });

  test('spell damage and mp cost should be reasonable', () => {
    Object.values(SPELLS).forEach(spell => {
      expect(spell.damage).toBeGreaterThanOrEqual(0);
      expect(spell.mpCost).toBeGreaterThanOrEqual(0);
      expect(spell.mpCost).toBeLessThanOrEqual(100);
    });
  });

  test('avada kedavra should be the most powerful spell', () => {
    const avadaKedavra = SPELLS.avadakedavra;
    Object.values(SPELLS).forEach(spell => {
      if (spell !== avadaKedavra) {
        expect(avadaKedavra.damage).toBeGreaterThanOrEqual(spell.damage);
      }
    });
  });
}); 