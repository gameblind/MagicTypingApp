export interface SpellSounds {
  [key: string]: string;
}

export interface Spell {
  name: string;
  latin: string;
  description: string;
  level: number;
  soundPath?: string;
}
