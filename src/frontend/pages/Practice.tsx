import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Divider,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  AutoStories as SpellIcon,
  ExpandLess,
  ExpandMore,
  School as GradeIcon,
} from '@mui/icons-material';
import VirtualKeyboard from '../components/VirtualKeyboard';
import styled from '@emotion/styled';

interface PracticeStats {
  currentSpeed: number;  // 当前速度
  accuracy: number;      // 准确率
  maxSpeed: number;      // 最高速度
  avgSpeed: number;      // 平均速度
  correctChars: number;  // 正确字符数
  wrongChars: number;    // 错误字符数
  totalChars: number;    // 总字符数
}

// 课程数据
const courses = [
  {
    grade: "一年级：魔法入门",
    icon: "🏰",
    courses: [
      {
        id: "basic-1",
        title: "基础手型：起始键位",
        spells: [
          {
            spell: "起始位置练习",
            latin: "asdf jkl;",
            description: "将手指放在键盘的起始位置，熟悉基本指法"
          }
        ]
      },
      {
        id: "basic-2",
        title: "漂浮咒：字母练习",
        spells: [
          {
            spell: "字母练习 A-M",
            latin: "abcdefghijklm",
            description: "练习键盘左手区域的字母输入"
          },
          {
            spell: "字母练习 N-Z",
            latin: "nopqrstuvwxyz",
            description: "练习键盘右手区域的字母输入"
          }
        ]
      },
      {
        id: "spell-1",
        title: "光明咒与黑暗咒",
        spells: [
          {
            spell: "荧光闪烁",
            latin: "Lumos",
            description: "照明咒，可以使魔杖尖端发出亮光"
          },
          {
            spell: "黑暗闪烁",
            latin: "Nox",
            description: "熄灭荧光闪烁的光芒"
          }
        ]
      }
    ]
  },
  {
    grade: "二年级：密室的秘密",
    icon: "🐍",
    courses: [
      {
        id: "spell-2",
        title: "蛇怪咒练习",
        spells: [
          {
            spell: "蛇佬腔",
            latin: "Serpensortia",
            description: "召唤出�����条蛇"
          }
        ]
      },
      {
        id: "spell-3",
        title: "除你武器",
        spells: [
          {
            spell: "缴械咒",
            latin: "Expelliarmus",
            description: "使对手的魔杖脱手"
          }
        ]
      }
    ]
  },
  {
    grade: "三年级：时间转换器",
    icon: "⌛",
    courses: [
      {
        id: "spell-4",
        title: "守护神咒基础",
        spells: [
          {
            spell: "守护神咒",
            latin: "Expecto Patronum",
            description: "召唤守护神，抵御摄魂怪"
          }
        ]
      },
      {
        id: "spell-5",
        title: "飞来咒练习",
        spells: [
          {
            spell: "飞来咒",
            latin: "Accio",
            description: "使物体飞到施咒者身边"
          }
        ]
      }
    ]
  },
  {
    grade: "四年级：火焰杯",
    icon: "🔥",
    courses: [
      {
        id: "spell-6",
        title: "召唤咒练习",
        spells: [
          {
            spell: "飞来飞去",
            latin: "Accio Repello",
            description: "召唤和驱逐物体的组合咒语"
          }
        ]
      },
      {
        id: "spell-7",
        title: "昏昏倒地",
        spells: [
          {
            spell: "昏昏倒地",
            latin: "Stupefy",
            description: "使目标失去知觉的咒语"
          }
        ]
      }
    ]
  },
  {
    grade: "五年级：凤凰社",
    icon: "🦅",
    courses: [
      {
        id: "spell-8",
        title: "守护神咒进阶",
        spells: [
          {
            spell: "实体守护神",
            latin: "Expecto Patronum Corporeal",
            description: "召唤出具有实体形态的守护神"
          }
        ]
      },
      {
        id: "spell-9",
        title: "爆破咒",
        spells: [
          {
            spell: "粉身碎骨",
            latin: "Reducto",
            description: "将目标炸成碎片"
          }
        ]
      }
    ]
  },
  {
    grade: "六年级：混血王子",
    icon: "👑",
    courses: [
      {
        id: "spell-10",
        title: "无声咒语",
        spells: [
          {
            spell: "无声咒",
            latin: "Silencio Maxima",
            description: "无需说出咒语即可施法"
          }
        ]
      },
      {
        id: "spell-11",
        title: "神锋无影",
        spells: [
          {
            spell: "神锋���影",
            latin: "Sectumsempra",
            description: "造成严重伤害的黑魔法"
          }
        ]
      }
    ]
  },
  {
    grade: "七年级：死亡圣器",
    icon: "⚡",
    courses: [
      {
        id: "spell-12",
        title: "终极决斗",
        spells: [
          {
            spell: "除你武器终极版",
            latin: "Expelliarmus Maxima",
            description: "更强大的缴械咒"
          }
        ]
      },
      {
        id: "spell-13",
        title: "死亡圣器",
        spells: [
          {
            spell: "复活咒",
            latin: "Prior Incantato",
            description: "显现魔杖最后施放的咒语"
          }
        ]
      }
    ]
  }
];

const TypingText = styled('div')({
  fontSize: '2.5rem',
  letterSpacing: '0.5rem',
  lineHeight: '1.5',
  fontFamily: 'Monaco, Consolas, monospace',
  '& .typed': {
    color: '#888',
    textDecoration: 'none',
  },
  '& .current': {
    color: '#4CAF50',
    borderBottom: '2px solid #4CAF50',
    animation: 'blink 1s infinite',
  },
  '& .untyped': {
    color: '#fff',
  },
  '& .space': {
    position: 'relative',
    display: 'inline-block',
    width: '1.5rem',
    height: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: '0 0.25rem',
    verticalAlign: 'middle',
  },
  '@keyframes blink': {
    '0%, 100%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
  },
});

const Practice: React.FC = () => {
  const [expandedGrade, setExpandedGrade] = useState<string | null>("一年级：魔法入门");
  const [currentGrade, setCurrentGrade] = useState(courses[0]);
  const [currentCourse, setCurrentCourse] = useState(currentGrade.courses[0]);
  const [currentSpell, setCurrentSpell] = useState(currentCourse.spells[0]);
  
  const [input, setInput] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [correctKeys, setCorrectKeys] = useState<string[]>([]);
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const [stats, setStats] = useState<PracticeStats>({
    currentSpeed: 0,
    accuracy: 100,
    maxSpeed: 0,
    avgSpeed: 0,
    correctChars: 0,
    wrongChars: 0,
    totalChars: 0,
  });

  // 添加音频对象
  const [correctSound] = useState(new Audio('/src/assets/audio/key_press.mp3'));
  const [wrongSound] = useState(new Audio('/src/assets/audio/key_error.mp3'));

  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');
  const [nextGrade, setNextGrade] = useState<any>(null);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);

  // 重置键盘状态的定时器
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveKey('');
      setCorrectKeys([]);
      setWrongKeys([]);
    }, 200); // 200ms后清除键盘状态

    return () => clearTimeout(timer);
  }, [activeKey, correctKeys, wrongKeys]);

  const handleGradeClick = (grade: string) => {
    setExpandedGrade(expandedGrade === grade ? null : grade);
  };

  const initializePractice = useCallback((spell: any) => {
    setCurrentSpell(spell);
    setInput('');
    setActiveKey('');
    setCorrectKeys([]);
    setWrongKeys([]);
    setStartTime(Date.now()); // 立即设置开始时间
    setStats({
      currentSpeed: 0,
      accuracy: 100,
      maxSpeed: 0, // 重置最高速度
      avgSpeed: 0, // 重置平均速度
      correctChars: 0,
      wrongChars: 0,
      totalChars: 0,
    });
  }, []);

  const updateStats = useCallback(() => {
    if (!startTime) return;

    const timeElapsed = (Date.now() - startTime) / 60000; // 转换为分钟
    if (timeElapsed < 0.016) return; // 如果时间少于1秒，不更新统计

    // 更准确的WPM计算方法
    const correctChars = input.split('').filter((char, i) => char === currentSpell.latin[i]).length;
    const currentSpeed = Math.round(correctChars / 5 / timeElapsed); // 每分钟正确的词数

    const accuracy = Math.round((correctChars / input.length) * 100) || 100;
    const maxSpeed = Math.max(stats.maxSpeed, currentSpeed);
    
    // 使用正确字符数加权计算平均速度
    const totalCorrectChars = stats.correctChars + correctChars;
    const weightedAvgSpeed = totalCorrectChars === 0 ? 0 : 
      Math.round((stats.avgSpeed * stats.correctChars + currentSpeed * correctChars) / totalCorrectChars);
    
    setStats(prev => ({
      currentSpeed,
      accuracy,
      maxSpeed,
      avgSpeed: weightedAvgSpeed,
      correctChars: totalCorrectChars,
      wrongChars: input.length - correctChars,
      totalChars: prev.totalChars + input.length,
    }));
  }, [input, startTime, currentSpell.latin, stats]);

  // 检查是否完成当前年级
  const checkGradeCompletion = useCallback(() => {
    const currentGradeIndex = courses.findIndex(g => g.grade === currentGrade.grade);
    const allSpellsInGrade = currentGrade.courses.flatMap(c => c.spells);
    const currentSpellIndex = allSpellsInGrade.findIndex(s => s.spell === currentSpell.spell);
    
    if (currentSpellIndex === allSpellsInGrade.length - 1) {
      // 完成当前年级
      const nextGradeData = courses[currentGradeIndex + 1];
      setAchievementMessage(`恭喜！你已完成${currentGrade.grade}的所有课程
        \n平均速度：${stats.avgSpeed} WPM
        \n最高速度：${stats.maxSpeed} WPM
        \n平均准确率：${stats.accuracy}%`);
      setNextGrade(nextGradeData);
      setShowAchievement(true);
    }
  }, [currentGrade, currentSpell, stats]);

  // 处理年级完成对话框的确认
  const handleAchievementConfirm = useCallback(() => {
    if (nextGrade) {
      setCurrentGrade(nextGrade);
      setCurrentCourse(nextGrade.courses[0]);
      setCurrentSpell(nextGrade.courses[0].spells[0]);
      setExpandedGrade(nextGrade.grade);
      initializePractice(nextGrade.courses[0].spells[0]);
    }
    setShowAchievement(false);
  }, [nextGrade, initializePractice]);

  // 修改拼写显示样式
  const renderSpell = (spell: string) => {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        fontSize: '2.5rem',
        fontFamily: '"Harry Potter", monospace',
        letterSpacing: '4px',
        mb: 4,
        height: '80px',
        position: 'relative',
      }}>
        {spell.split('').map((char, index) => {
          const isTyped = index < input.length;
          const isCorrect = isTyped && input[index] === char;
          const isWrong = isTyped && input[index] !== char;
          const isCurrent = index === input.length;

          return (
            <Box
              key={index}
              sx={{
                position: 'relative',
                color: isCorrect ? '#4caf50' : 
                       isWrong ? '#f44336' : 
                       'rgba(255, 255, 255, 0.7)',
                fontWeight: isCurrent ? 'bold' : 'normal',
                textShadow: isCurrent ? '0 0 20px rgba(255, 215, 0, 0.5)' : 'none',
                transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s ease',
                '&::after': isCurrent ? {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '24px',
                  backgroundColor: 'rgba(255, 215, 0, 0.8)',
                  animation: 'blink 1s infinite',
                } : {},
                '@keyframes blink': {
                  '0%, 100%': {
                    opacity: 0,
                  },
                  '50%': {
                    opacity: 1,
                  },
                },
              }}
            >
              {char}
            </Box>
          );
        })}
      </Box>
    );
  };

  // 自动跳转到下一课程
  const moveToNextSpell = useCallback(() => {
    const currentGradeIndex = courses.findIndex(g => g.grade === currentGrade.grade);
    const currentCourseIndex = currentGrade.courses.findIndex(c => c.id === currentCourse.id);
    const currentSpellIndex = currentCourse.spells.findIndex(s => s.spell === currentSpell.spell);

    // 在当前课程中查找下一个咒语
    if (currentSpellIndex < currentCourse.spells.length - 1) {
      setCurrentSpell(currentCourse.spells[currentSpellIndex + 1]);
      initializePractice(currentCourse.spells[currentSpellIndex + 1]);
      return;
    }

    // 在当前年级中查找下一个课程
    if (currentCourseIndex < currentGrade.courses.length - 1) {
      const nextCourse = currentGrade.courses[currentCourseIndex + 1];
      setCurrentCourse(nextCourse);
      setCurrentSpell(nextCourse.spells[0]);
      initializePractice(nextCourse.spells[0]);
      return;
    }

    // 如果是年级的最后一个课程，显示年级完成对话框
    if (currentGradeIndex < courses.length - 1) {
      const nextGradeData = courses[currentGradeIndex + 1];
      setAchievementMessage(`恭喜！你已完成${currentGrade.grade}的所有课程！
        \n平均速度：${stats.avgSpeed} WPM
        \n最高速度：${stats.maxSpeed} WPM
        \n平均准确率：${stats.accuracy}%`);
      setNextGrade(nextGradeData);
      setShowAchievement(true);
    }
  }, [currentGrade, currentCourse, currentSpell, courses, stats, initializePractice]);

  // 修改按键处理逻辑
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // 阻止���格键的默认滚动行为
    if (event.key === ' ') {
      event.preventDefault();
    }

    // 忽略 Enter 键的字符输入
    if (event.key === 'Enter') {
      if (showAchievement) {
        handleAchievementConfirm();
      }
      return;
    }

    // 处理退格键
    if (event.key === 'Backspace') {
      if (input.length > 0) {
        setInput(prev => prev.slice(0, -1));
        setActiveKey('');
        setCorrectKeys([]);
        setWrongKeys([]);
        try {
          wrongSound.currentTime = 0;
          wrongSound.play().catch(err => console.log('音频播放失败:', err));
        } catch (err) {
          console.log('音频播放失败:', err);
        }
      }
      return;
    }

    // 如果还没有开始时间，设置开始时间
    if (!startTime) {
      setStartTime(Date.now());
    }

    // 忽略功能键的显示
    if (['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'CapsLock', 'Enter'].includes(event.key)) {
      return;
    }

    const key = event.key;
    setActiveKey(key.toLowerCase());
    
    if (input.length < currentSpell.latin.length) {
      const currentChar = currentSpell.latin[input.length];
      // 检查字符是否匹配，忽略大小写差异
      if (key.toLowerCase() === currentChar.toLowerCase()) {
        setCorrectKeys([key.toLowerCase()]);
        try {
          correctSound.currentTime = 0;
          correctSound.play().catch(err => console.log('音频播放失败:', err));
        } catch (err) {
          console.log('音频播放失败:', err);
        }
        setInput(prev => prev + currentChar); // 使用目标字符，保持大小写一致
      } else {
        setWrongKeys([key.toLowerCase()]);
        try {
          wrongSound.currentTime = 0;
          wrongSound.play().catch(err => console.log('音频播放失败:', err));
        } catch (err) {
          console.log('音频播放失败:', err);
        }
        setInput(prev => prev + key);
      }

      // 每次输入后更新统计数据
      updateStats();
    }

    // 检查是否完成当前咒语
    if (input.length === currentSpell.latin.length - 1) {
      const isCorrect = input + key === currentSpell.latin;
      if (isCorrect) {
        // 短暂延迟后自动进入下一课
        setTimeout(() => {
          moveToNextSpell();
        }, 500);
      }
    }
  }, [input, currentSpell, correctSound, wrongSound, showAchievement, handleAchievementConfirm, moveToNextSpell, startTime, updateStats]);

  useEffect(() => {
    // 监听keydown事件来捕获所有按键，包括退格键
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' || e.key === 'Enter') {
        e.preventDefault(); // 阻止浏览器默认的后退和回车行为
        handleKeyPress(e);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key !== 'Backspace' && e.key !== 'Enter') {
        handleKeyPress(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyPress]);

  const progress = (input.length / currentSpell.latin.length) * 100;

  // 添加键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 阻止空格键的默认滚动行为
      if (e.code === 'Space') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const renderText = (text: string, typedText: string) => {
    return (
      <Box sx={{
        fontSize: '2.5rem',
        letterSpacing: '0.5rem',
        lineHeight: '1.5',
        fontFamily: 'Monaco, Consolas, monospace',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '3rem',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        px: 4,
      }}>
        {text.split('').map((char, index) => {
          const isTyped = index < typedText.length;
          const isCorrect = isTyped && typedText[index] === char;
          const isWrong = isTyped && typedText[index] !== char;
          
          if (char === ' ') {
            return (
              <Box
                key={index}
                sx={{
                  display: 'inline-block',
                  width: '1.5rem',
                  margin: '0 0.25rem',
                  verticalAlign: 'middle',
                }}
              />
            );
          }
          
          return (
            <Box
              key={index}
              component="span"
              sx={{
                color: isTyped ? 
                  (isCorrect ? '#4CAF50' : '#f44336') : 
                  'rgba(255, 255, 255, 0.7)',
                display: 'inline-block',
                position: 'relative',
                '&::after': !isTyped && index === typedText.length ? {
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: '0',
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'rgba(255, 215, 0, 0.8)',
                  animation: 'blink 1s infinite',
                } : {},
              }}
            >
              {char}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{
      display: 'flex',
      minHeight: 'calc(100vh - 48px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 课程列表 - 始终显示 */}
      <Paper
        elevation={3}
        sx={{
          width: '240px',
          backgroundColor: 'rgba(20, 20, 28, 0.4)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          p: 2,
          mr: 2,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          height: 'fit-content',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 215, 0, 0.9)',
            mb: 2,
            fontWeight: 'bold',
          }}
        >
          课程列表
        </Typography>
        <List sx={{ width: '100%' }}>
          {courses.map((grade) => (
            <ListItem
              key={grade.grade}
              sx={{
                display: 'block',
                p: 0,
                mb: 1,
              }}
            >
              <Button
                fullWidth
                onClick={() => handleGradeClick(grade.grade)}
                sx={{
                  justifyContent: 'flex-start',
                  color: expandedGrade === grade.grade ? 'rgba(255, 215, 0, 0.9)' : 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: expandedGrade === grade.grade ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  },
                  textAlign: 'left',
                  px: 2,
                  py: 1,
                  borderRadius: '6px',
                }}
              >
                {grade.grade}
              </Button>
              {expandedGrade === grade.grade && (
                <List sx={{ pl: 2 }}>
                  {grade.courses.map((course) => (
                    <ListItem
                      key={course.id}
                      sx={{
                        p: 0,
                        mb: 0.5,
                      }}
                    >
                      <Button
                        fullWidth
                        onClick={() => initializePractice(course.spells[0])}
                        sx={{
                          justifyContent: 'flex-start',
                          color: currentSpell.spell === course.spells[0].spell ? 'rgba(255, 215, 0, 0.9)' : 'rgba(255, 255, 255, 0.7)',
                          backgroundColor: currentSpell.spell === course.spells[0].spell ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                          },
                          textAlign: 'left',
                          px: 2,
                          py: 0.5,
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                        }}
                      >
                        {course.title}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 练习区域 */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* 练习内容和键盘区域 */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}>
          {/* 练习内容 */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              backgroundColor: 'rgba(20, 20, 28, 0.7)', // 增加背景不透明度
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2
            }}>
              <img 
                src={`/src/assets/images/icons/${
                  currentGrade.grade.includes('一年级') ? 'wand-basic.png' :
                  currentGrade.grade.includes('二年级') ? 'basilisk.png' :
                  currentGrade.grade.includes('三年级') ? 'time-turner.png' :
                  currentGrade.grade.includes('四年级') ? 'goblet.png' :
                  currentGrade.grade.includes('五年级') ? 'phoenix.png' :
                  currentGrade.grade.includes('六年级') ? 'potions-book.png' :
                  'deathly-hallows.png'
                }`} 
                alt="课程图标"
                style={{ width: 32, height: 32 }}
              />
              <Typography variant="h5" sx={{ color: '#ffd700' }}>
                {currentSpell.spell}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
              {currentSpell.description}
            </Typography>
            <Box sx={{ 
              textAlign: 'center',
              mb: 4,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -20,
                left: -20,
                right: -20,
                bottom: -20,
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0) 70%)',
                pointerEvents: 'none',
              }
            }}>
              {renderText(currentSpell.latin, input)}
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{
                mb: 2,
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#ffd700'
                }
              }}
            />
            <Box sx={{ 
              textAlign: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -20,
                left: -20,
                right: -20,
                bottom: -20,
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0) 70%)',
                pointerEvents: 'none',
              }
            }}>
              {renderText(currentSpell.latin.slice(0, input.length), input)}
            </Box>
          </Paper>

          {/* 虚拟键盘 */}
          <Box sx={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'auto',
            maxWidth: '90%',
          }}>
            <VirtualKeyboard
              activeKey={activeKey}
              correctKeys={correctKeys}
              wrongKeys={wrongKeys}
            />
          </Box>
        </Box>
      </Box>

      {/* 成就对话框 */}
      <Dialog 
        open={showAchievement}
        onClose={handleAchievementConfirm}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(20, 20, 28, 0.95)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <img src="/src/assets/images/achievement_master.png" alt="成就" style={{ width: 48, height: 48 }} />
          <Typography variant="h6" component="span">
            成就达成！
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {achievementMessage}
          </Typography>
          {nextGrade && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              准备好进入{nextGrade.grade}了吗？
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleAchievementConfirm} 
            autoFocus
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #1a237e 30%, #3f51b5 90%)',
              color: 'white'
            }}
          >
            继续 (Enter)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Practice; 