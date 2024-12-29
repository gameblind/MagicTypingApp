import { SpellEffect } from '../types/battle';

export interface Spell {
  name: string;
  damage: number;
  mpCost: number;
  description: string;
  effect: SpellEffect;
}

const spellEffects: { [key: string]: SpellEffect } = {
  basic: {
    name: 'basic',
    color: '#ffd700',
    animation: 'projectile',
    sound: 'spell_cast.mp3'
  },
  fire: {
    name: 'fire',
    color: '#ff4444',
    animation: 'explosion',
    sound: 'fire.mp3'
  },
  shield: {
    name: 'shield',
    color: '#4dabf5',
    animation: 'shield',
    sound: 'shield.mp3'
  },
  dark: {
    name: 'dark',
    color: '#9c27b0',
    animation: 'dark',
    sound: 'dark.mp3'
  }
};

export const SPELLS: { [key: string]: Spell } = {
  'attack': {
    name: '普通攻击',
    damage: 10,
    mpCost: 0,
    description: '基础攻击，不消耗MP',
    effect: spellEffects.basic
  },
  'expelliarmus': {
    name: '除你武器',
    damage: 20,
    mpCost: 15,
    description: '缴械咒，可以击飞对手的魔杖',
    effect: spellEffects.basic
  },
  'protego': {
    name: '盔甲护身',
    damage: 0,
    mpCost: 10,
    description: '防护咒，可以抵挡攻击',
    effect: spellEffects.shield
  },
  'stupefy': {
    name: '昏昏倒地',
    damage: 25,
    mpCost: 20,
    description: '昏迷咒，使目标失去意识',
    effect: spellEffects.basic
  },
  'crucio': {
    name: '钻心剜骨',
    damage: 35,
    mpCost: 35,
    description: '黑魔法，造成剧烈疼痛',
    effect: spellEffects.dark
  },
  'avadakedavra': {
    name: '阿瓦达索命',
    damage: 50,
    mpCost: 50,
    description: '死咒，致命的不可饶恕咒',
    effect: spellEffects.dark
  },
  'petrificustotalus': {
    name: '统统石化',
    damage: 15,
    mpCost: 25,
    description: '石化咒，使目标全身僵硬',
    effect: spellEffects.basic
  }
}; 