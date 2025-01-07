import { SpellSounds } from '../types/spells';

export const SPELL_SOUNDS: SpellSounds = {
  'Wingardium Leviosa': '/assets/sounds/spells/wingardium-leviosa.mp3',
  'Lumos': '/assets/sounds/spells/lumos.mp3',
  'Alohomora': '/assets/sounds/spells/alohomora.mp3',
  // 其他咒语音频映射
};

export const playSpellSound = (spellName: string) => {
  const audioPath = SPELL_SOUNDS[spellName];
  if (audioPath) {
    const audio = new Audio(audioPath);
    audio.play().catch(error => {
      console.warn('播放咒语音频失败:', error);
    });
  }
};