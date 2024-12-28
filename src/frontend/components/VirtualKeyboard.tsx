import React from 'react';
import { Box, Paper } from '@mui/material';

interface VirtualKeyboardProps {
  activeKey: string;
  correctKeys: string[];
  wrongKeys: string[];
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  activeKey,
  correctKeys,
  wrongKeys
}) => {
  // Mac 键盘布局
  const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl']
  ];

  // 获取按键样式
  const getKeyStyle = (key: string) => {
    const isActive = key.toLowerCase() === activeKey;
    const isCorrect = correctKeys.includes(key.toLowerCase());
    const isWrong = wrongKeys.includes(key.toLowerCase());

    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '45px',
      minWidth: key === 'Space' ? '300px' : '40px',
      padding: '0 8px',
      margin: '2px',
      borderRadius: '6px',
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      cursor: 'default',
      userSelect: 'none' as const,
      transition: 'all 0.2s ease',
      backgroundColor: 'rgba(20, 20, 28, 0.4)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      color: 'rgba(255, 255, 255, 0.8)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      flex: ['Backspace', 'Tab', 'Caps', 'Shift', 'Enter'].includes(key) ? '1.5' : 
            key === 'Space' ? '6' : '1',
    };

    if (isActive || isCorrect) {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(255, 215, 0, 0.15)',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 0 10px rgba(255, 215, 0, 0.15)',
        color: 'rgba(255, 215, 0, 0.9)',
      };
    }

    if (isWrong) {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(244, 67, 54, 0.15)',
        border: '1px solid rgba(244, 67, 54, 0.3)',
        boxShadow: '0 0 10px rgba(244, 67, 54, 0.15)',
        color: 'rgba(255, 68, 68, 0.9)',
      };
    }

    return baseStyle;
  };

  return (
    <Paper elevation={3} sx={{
      p: 2,
      backgroundColor: 'rgba(20, 20, 28, 0.3)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        alignItems: 'center',
      }}>
        {keyboardLayout.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              gap: '4px',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            {row.map((key, keyIndex) => (
              <Box
                key={`${rowIndex}-${keyIndex}`}
                sx={getKeyStyle(key)}
              >
                {key}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default VirtualKeyboard;