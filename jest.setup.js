require('@testing-library/jest-dom');

// 模拟计时器
jest.useFakeTimers();

// 清理所有模拟
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
}); 