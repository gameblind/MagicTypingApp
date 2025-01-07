/**
 * 计算输入准确率
 * @param input 用户输入
 * @param target 目标文本
 * @returns 准确率(0-100)
 */
export const calculateAccuracy = (input: string, target: string): number => {
  if (!input || !target) return 0;
  
  let correctChars = 0;
  const minLength = Math.min(input.length, target.length);
  
  for (let i = 0; i < minLength; i++) {
    if (input[i] === target[i]) {
      correctChars++;
    }
  }
  
  return Math.round((correctChars / target.length) * 100);
};

/**
 * 计算每分钟输入字数
 * @param charCount 字符数
 * @param startTime 开始时间
 * @returns 每分钟字数
 */
export const calculateWPM = (charCount: number, startTime: number): number => {
  const timeElapsed = (Date.now() - startTime) / 1000 / 60; // 转换为分钟
  return Math.round((charCount / 5) / timeElapsed); // 假设每个单词平均5个字符
};
