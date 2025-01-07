/**
 * 音频播放工具
 */

// 音频缓存
const audioCache: { [key: string]: HTMLAudioElement } = {};

// 将咒语名称转换为文件名
const spellToFileName = (spell: string): string => {
  if (spell === 'error') {
    return 'error';
  }
  // 中文名称不需要特殊处理，直接返回
  return spell;
};

/**
 * 播放按键音效
 * @param isError 是否是错误音效
 */
export const playKeySound = (isError: boolean = false) => {
  const fileName = isError ? 'key_error' : 'key_press';
  const cacheKey = `key_${fileName}`;
  
  if (!audioCache[cacheKey]) {
    audioCache[cacheKey] = new Audio(`/assets/sounds/effects/${fileName}.mp3`);
  }
  
  const audio = audioCache[cacheKey];
  audio.currentTime = 0;
  audio.play().catch(error => {
    console.error('播放按键音效失败:', error);
  });
};

/**
 * 播放咒语音频
 * @param spell 咒语名称
 * @param onComplete 播放完成的回调函数
 */
export const playSpellSound = (spell: string, onComplete?: () => void) => {
  const fileName = spellToFileName(spell);
  const cacheKey = `spell_${fileName}`;
  
  if (!audioCache[cacheKey]) {
    const path = spell === 'error' 
      ? `/assets/sounds/effects/${fileName}.mp3`
      : `/assets/sounds/spells/${fileName}.mp3`;
    audioCache[cacheKey] = new Audio(path);
  }
  
  const audio = audioCache[cacheKey];
  
  // 添加播放完成事件监听器
  if (onComplete) {
    const handleEnded = () => {
      onComplete();
      audio.removeEventListener('ended', handleEnded);
    };
    audio.addEventListener('ended', handleEnded);
  }
  
  audio.currentTime = 0;
  audio.play().catch(error => {
    console.error('播放咒语音频失败:', error);
    // 如果播放失败，也调用完成回调
    onComplete?.();
  });
}; 