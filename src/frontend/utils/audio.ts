export const playSpellSound = async (spellName: string) => {
  try {
    // 先检查是否是"普通攻击"，如果是直接播放默认音效
    if (spellName === '普通攻击') {
      console.log('普通攻击使用默认音效');
      const defaultAudio = new Audio('/assets/sounds/effects/hit.mp3');
      defaultAudio.volume = 0.6;
      await defaultAudio.play();
      return;
    }

    // 尝试播放咒语音效
    const audio = new Audio(`/assets/sounds/spells/${spellName}.mp3`);
    audio.volume = 0.8;
    
    try {
      await audio.play();
    } catch (err) {
      console.log('咒语音效未找到，播放默认音效:', spellName);
      // 播放默认音效
      const defaultAudio = new Audio('/assets/sounds/effects/hit.mp3');
      defaultAudio.volume = 0.6;
      await defaultAudio.play();
    }
  } catch (err) {
    console.error('音效播放完全失败:', err);
  }
};

export const playHitSound = () => {
  const audio = new Audio('/assets/sounds/effects/hit.mp3');
  audio.volume = 0.6;
  audio.play().catch(err => console.error('播放音效失败:', err));
};

export const playSpellCastSound = () => {
  const audio = new Audio('/assets/sounds/effects/spell_cast.mp3');
  audio.play();
}; 