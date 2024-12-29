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
import keyPressSound from '@/assets/audio/key_press.mp3';
import keyErrorSound from '@/assets/audio/key_error.mp3';

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
    grade: "新手入门：键盘基础",
    icon: "⌨️",
    spells: [
      {
        spell: "起始位置",
        latin: "asdf jkl;",
        description: "将手指放在键盘的起始位置，熟悉基本指法"
      },
      {
        spell: "左手练习",
        latin: "asdf asdf asdf",
        description: "练习左手基本指法，重复输入直到形成肌肉记忆"
      },
      {
        spell: "右手练习",
        latin: "jkl; jkl; jkl;",
        description: "练习右手基本指法，重复输入直到形成肌肉记忆"
      },
      {
        spell: "左右手交替",
        latin: "asdf jkl; asdf jkl;",
        description: "练习左右手交替输入，培养双手协调能力"
      },
      {
        spell: "进阶组合",
        latin: "asjd fkl; asjd fkl;",
        description: "练习更复杂的指法组合，提高打字流畅度"
      }
    ]
  },
  {
    grade: "一年级：魔法石",
    icon: "🏰",
    spells: [
      {
        spell: "阿拉霍洞开",
        latin: "Alohomora",
        description: "开锁咒，赫敏用它打开了通往三头犬的门"
      },
      {
        spell: "羽加迪姆勒维奥萨",
        latin: "Wingardium Leviosa",
        description: "漂浮咒，让物体漂浮在空中，赫敏用它成功让羽毛飘起"
      },
      {
        spell: "全身束缚咒",
        latin: "Petrificus Totalus",
        description: "使目标全身僵硬，动弹不得"
      },
      {
        spell: "腿腿锁咒",
        latin: "Locomotor Mortis",
        description: "使目标双腿锁在一起，无法行走"
      }
    ]
  },
  {
    grade: "二年级：密室的秘密",
    icon: "🐍",
    spells: [
      {
        spell: "除你武器",
        latin: "Expelliarmus",
        description: "缴械咒，可以击飞对手的魔杖"
      },
      {
        spell: "咯咯笑咒",
        latin: "Rictusempra",
        description: "让目标忍不住大笑，在决斗俱乐部中常用"
      },
      {
        spell: "出蛇咒",
        latin: "Serpensortia",
        description: "召唤出一条蛇，马尔福在决斗俱乐部中使用"
      },
      {
        spell: "咒立停",
        latin: "Finite Incantatem",
        description: "终止已施放的咒语效果"
      },
      {
        spell: "一忘皆空",
        latin: "Obliviate",
        description: "消除记忆的咒语，洛哈特最拿手的咒语"
      },
      {
        spell: "显形墨水",
        latin: "Aparecium",
        description: "显现隐形墨水写就的文字"
      }
    ]
  },
  {
    grade: "三年级：阿兹卡班的囚徒",
    icon: "⌛",
    spells: [
      {
        spell: "呼神护卫",
        latin: "Expecto Patronum",
        description: "召唤守护神抵御摄魂怪，需要集中快乐的记忆"
      },
      {
        spell: "荒唐咒",
        latin: "Ridikkulus",
        description: "对付博格特的咒语，将恐惧转化为滑稽"
      },
      {
        spell: "防水防雾咒",
        latin: "Impervius",
        description: "使物品防水防雾，适用于雨天魁地奇比赛"
      },
      {
        spell: "光亮咒",
        latin: "Lumos",
        description: "让魔杖发光，适合黑暗环境使用"
      },
      {
        spell: "灭光咒",
        latin: "Nox",
        description: "熄灭魔杖的光芒"
      },
      {
        spell: "移动身体咒",
        latin: "Mobilicorpus",
        description: "使昏迷的人体漂浮移动"
      },
      {
        spell: "钻心剜骨",
        latin: "Crucio",
        description: "造成极度痛苦的黑魔法，是不可饶恕咒之一"
      }
    ]
  },
  {
    grade: "四年级：火焰杯",
    icon: "🔥",
    spells: [
      {
        spell: "飞来咒",
        latin: "Accio",
        description: "召唤物品飞来，哈利用它召唤火弩箭对抗火龙"
      },
      {
        spell: "夺魂咒",
        latin: "Imperio",
        description: "控制他人意志的黑魔法，是不可饶恕咒之一"
      },
      {
        spell: "钻心剜骨",
        latin: "Crucio",
        description: "造成极度痛苦的黑魔法，是不可饶恕咒之一"
      },
      {
        spell: "松手咒",
        latin: "Relashio",
        description: "使目标松开钳制，水下使用会喷出热水泡"
      }
    ]
  },
  {
    grade: "五年级：凤凰社",
    icon: "🦅",
    spells: [
      {
        spell: "昏迷咒",
        latin: "Stupefy",
        description: "击晕对手的咒语，D.A.成员常用"
      },
      {
        spell: "盔甲护身",
        latin: "Protego",
        description: "创造防护盾牌，可以反弹咒语"
      },
      {
        spell: "无声咒",
        latin: "Silencio",
        description: "使目标失声，在战斗中可以阻止对手施咒"
      },
      {
        spell: "粉碎咒",
        latin: "Reducto",
        description: "将物体粉碎的咒语，金妮特别擅长"
      }
    ]
  },
  {
    grade: "六年级：混血王子",
    icon: "👑",
    spells: [
      {
        spell: "神锋无影",
        latin: "Sectumsempra",
        description: "斯内普发明的黑魔法，造成难以愈合的伤口"
      },
      {
        spell: "悬空倒吊",
        latin: "Levicorpus",
        description: "使人倒吊在空中，詹姆经常使用的咒语"
      },
      {
        spell: "隔音咒",
        latin: "Muffliato",
        description: "让周围人只听到嗡嗡声，防止偷听"
      },
      {
        spell: "混淆咒",
        latin: "Confundo",
        description: "使目标混淆困惑，暂时失去判断力"
      },
      {
        spell: "恢复呼吸",
        latin: "Anapneo",
        description: "帮助噎住的人恢复呼吸"
      },
      {
        spell: "愈合咒",
        latin: "Episkey",
        description: "治疗轻微伤口的咒语"
      }
    ]
  },
  {
    grade: "七年级：死亡圣器",
    icon: "⚡",
    spells: [
      {
        spell: "禁忌追踪",
        latin: "Taboo",
        description: "说出被施咒的词会暴露位置，如伏地魔的名字"
      },
      {
        spell: "阿瓦达索命",
        latin: "Avada Kedavra",
        description: "致命咒语，使用不可饶恕咒之一"
      },
      {
        spell: "钻心剜骨",
        latin: "Crucio",
        description: "造成极度痛苦的不可饶恕咒"
      },
      {
        spell: "魂魄出窍",
        latin: "Imperio",
        description: "控制他人的不可饶恕咒"
      }
    ]
  },
  {
    grade: "彩蛋：神奇动物在哪里",
    icon: "🦄",
    spells: [
      {
        spell: "显形咒",
        latin: "Revelio",
        description: "用于检视是否有伪装或变形，蒂娜用来识破格雷夫斯的真实身份"
      },
      {
        spell: "默默然显形",
        latin: "Obscurus Revelio",
        description: "显现默默然的存在，纽特用来帮助克雷登斯"
      },
      {
        spell: "动物护理咒",
        latin: "Faunapraesidium",
        description: "保护和治疗神奇动物的咒语，纽特经常使用"
      },
      {
        spell: "扩展咒",
        latin: "Capacious Extremis",
        description: "使空间内部变得更大，纽特用在他的手提箱上"
      },
      {
        spell: "修复咒",
        latin: "Reparo Maxima",
        description: "大规模修复破损的建筑和物品，用于修复被破坏的纽约城"
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
  const [expandedGrade, setExpandedGrade] = useState<string | null>(courses[0].grade);
  const [currentGrade, setCurrentGrade] = useState(courses[0]);
  const [currentSpell, setCurrentSpell] = useState(courses[0].spells[0]);
  const [currentBackground, setCurrentBackground] = useState('/assets/images/hogwarts-bg.png');
  
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
  const [keyPressAudio] = useState(() => new Audio(keyPressSound));
  const [keyErrorAudio] = useState(() => new Audio(keyErrorSound));

  // 预加载音频
  useEffect(() => {
    keyPressAudio.load();
    keyErrorAudio.load();
  }, [keyPressAudio, keyErrorAudio]);

  // 播放音频的工具函数
  const playSound = useCallback((isError: boolean) => {
    try {
      const audio = isError ? keyErrorAudio : keyPressAudio;
      audio.currentTime = 0;
      audio.play().catch(console.error);
    } catch (error) {
      console.error('播放音频失败:', error);
    }
  }, [keyPressAudio, keyErrorAudio]);

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
    // 设置当前年级
    const selectedGrade = courses.find(g => g.grade === grade);
    if (selectedGrade) {
      setCurrentGrade(selectedGrade);
      // 设置背景
      if (grade.includes('一年级')) {
        setCurrentBackground('/assets/images/Grade1_bg.jpg');
      } else if (grade.includes('二年级')) {
        setCurrentBackground('/assets/images/Grade2_bg.jpg');
      } else if (grade.includes('三年级')) {
        setCurrentBackground('/assets/images/Grade3_bg.jpg');
      } else if (grade.includes('四年级')) {
        setCurrentBackground('/assets/images/Grade4_bg.jpg');
      } else if (grade.includes('五年级')) {
        setCurrentBackground('/assets/images/Grade5_bg.jpg');
      } else if (grade.includes('六年级')) {
        setCurrentBackground('/assets/images/Grade6_bg.jpg');
      } else if (grade.includes('七年级')) {
        setCurrentBackground('/assets/images/Grade7_bg.jpg');
      } else {
        setCurrentBackground('/assets/images/hogwarts-bg.png');
      }
      // 如果是展开年级，则设置该年级的第一个咒语
      if (expandedGrade !== grade) {
        setCurrentSpell(selectedGrade.spells[0]);
        initializePractice(selectedGrade.spells[0]);
      }
    }
  };

  const handleSpellClick = (spell: any) => {
    setCurrentSpell(spell);
    initializePractice(spell);
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
    const allSpellsInGrade = currentGrade.spells;
    const currentSpellIndex = allSpellsInGrade.findIndex(s => s.spell === currentSpell.spell);
    
    if (currentSpellIndex === allSpellsInGrade.length - 1) {
      // 完成当前年级
      const nextGradeData = courses[currentGradeIndex + 1];
      setAchievementMessage(`恭喜！你已完成${currentGrade.grade}的所有课程！
        \n平均速度：${stats.avgSpeed} WPM
        \n最高速度：${stats.maxSpeed} WPM`);
      setNextGrade(nextGradeData);
      setShowAchievement(true);
    }
  }, [currentGrade, currentSpell, stats]);

  // 处理年级完成对话框的确认
  const handleAchievementConfirm = useCallback(() => {
    if (nextGrade) {
      setCurrentGrade(nextGrade);
      setCurrentSpell(nextGrade.spells[0]);
      setExpandedGrade(nextGrade.grade);
      // 设置新年级的背景
      if (nextGrade.grade.includes('一年级')) {
        setCurrentBackground('/assets/images/Grade1_bg.jpg');
      } else if (nextGrade.grade.includes('二年级')) {
        setCurrentBackground('/assets/images/Grade2_bg.jpg');
      } else if (nextGrade.grade.includes('三年级')) {
        setCurrentBackground('/assets/images/Grade3_bg.jpg');
      } else if (nextGrade.grade.includes('四年级')) {
        setCurrentBackground('/assets/images/Grade4_bg.jpg');
      } else if (nextGrade.grade.includes('五年级')) {
        setCurrentBackground('/assets/images/Grade5_bg.jpg');
      } else if (nextGrade.grade.includes('六年级')) {
        setCurrentBackground('/assets/images/Grade6_bg.jpg');
      } else if (nextGrade.grade.includes('七年级')) {
        setCurrentBackground('/assets/images/Grade7_bg.jpg');
      } else {
        setCurrentBackground('/assets/images/hogwarts-bg.png');
      }
      initializePractice(nextGrade.spells[0]);
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
    const currentSpellIndex = currentGrade.spells.findIndex(s => s.spell === currentSpell.spell);

    // 在当前年级中查找下一个咒语
    if (currentSpellIndex < currentGrade.spells.length - 1) {
      setCurrentSpell(currentGrade.spells[currentSpellIndex + 1]);
      initializePractice(currentGrade.spells[currentSpellIndex + 1]);
      return;
    }

    // 如果是年级的最后一个咒语，显示年级完成对话框
    if (currentGradeIndex < courses.length - 1) {
      const nextGradeData = courses[currentGradeIndex + 1];
      setAchievementMessage(`恭喜！你已完成${currentGrade.grade}的所有课程！
        \n平均速度：${stats.avgSpeed} WPM
        \n最高速度：${stats.maxSpeed} WPM`);
      setNextGrade(nextGradeData);
      setShowAchievement(true);
    }
  }, [currentGrade, currentSpell, courses, stats, initializePractice]);

  // 修改按键处理逻辑
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key;

    // 处理 Enter 键
    if (key === 'Enter' && showAchievement) {
      if (nextGrade) {
        setCurrentGrade(nextGrade);
        setCurrentSpell(nextGrade.spells[0]);
        setShowAchievement(false);
        setInput('');
        setStartTime(Date.now());
      }
      return;
    }

    // 如果显示成就弹窗，不处理其他按键
    if (showAchievement) {
      return;
    }

    // 阻止空格键的默认滚动行为
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
        playSound(true);
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

    setActiveKey(key.toLowerCase());
    
    if (input.length < currentSpell.latin.length) {
      const currentChar = currentSpell.latin[input.length];
      // 检查字符是否匹配，忽大小写差异
      if (key.toLowerCase() === currentChar.toLowerCase()) {
        setCorrectKeys([key.toLowerCase()]);
        playSound(false);
        setInput(prev => prev + currentChar); // 使用目标字符，保持大小写一致
      } else {
        setWrongKeys([key.toLowerCase()]);
        playSound(true);
        setInput(prev => prev + key);
      }

      // 每次输入后更新统计数据
      updateStats();
    }

    // 检查是否完成当前咒语
    if (input.length === currentSpell.latin.length - 1) {
      const isCorrect = input + key === currentSpell.latin;
      if (isCorrect) {
        playSound(false);
        // 短暂延迟后自动进入下一课
        setTimeout(() => {
          moveToNextSpell();
        }, 500);
      } else {
        playSound(true);
        // 短暂延迟后自动进入下一课
        setTimeout(() => {
          moveToNextSpell();
        }, 500);
      }
    }
  }, [
    showAchievement,
    nextGrade,
    setCurrentGrade,
    setCurrentSpell,
    setShowAchievement,
    setInput,
    setStartTime,
    input,
    currentSpell,
    moveToNextSpell,
    startTime,
    updateStats,
    playSound,
    setActiveKey,
    setCorrectKeys,
    setWrongKeys
  ]);

  useEffect(() => {
    // 听keydown事件来捕获所有按键，包括退格键
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
      backgroundImage: `url(${currentBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      transition: 'background-image 0.5s ease-in-out',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(1px)',
      },
    }}>
      {/* 课程列表 - 始终显示 */}
      <Paper
        elevation={3}
        sx={{
          width: '300px',
          backgroundColor: 'rgba(20, 20, 28, 0.4)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          p: 2,
          mr: 2,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          height: 'fit-content',
          position: 'sticky',
          top: 16,
          zIndex: 1,
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 215, 0, 0.9)',
              fontWeight: 'bold',
            }}
          >
            课程列表
          </Typography>
        </Box>
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
                endIcon={expandedGrade === grade.grade ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  justifyContent: 'space-between',
                  color: expandedGrade === grade.grade ? 'rgba(255, 215, 0, 0.9)' : 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: expandedGrade === grade.grade ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  },
                  textAlign: 'left',
                  px: 2,
                  py: 1,
                  borderRadius: '6px',
                  minWidth: 'fit-content',
                  width: '100%',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  minWidth: 'fit-content',
                }}>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    marginRight: '8px',
                  }}>{grade.icon}</span>
                  <span>{grade.grade}</span>
                </Box>
              </Button>
              <Collapse in={expandedGrade === grade.grade} timeout="auto" unmountOnExit>
                <List sx={{ pl: 2 }}>
                  {grade.spells.map((spell) => (
                    <ListItem
                      key={spell.spell}
                      sx={{
                        p: 0,
                        mb: 0.5,
                      }}
                    >
                      <Button
                        fullWidth
                        onClick={() => handleSpellClick(spell)}
                        sx={{
                          justifyContent: 'flex-start',
                          color: currentSpell.spell === spell.spell ? 'rgba(255, 215, 0, 0.9)' : 'rgba(255, 255, 255, 0.7)',
                          backgroundColor: currentSpell.spell === spell.spell ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
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
                        {spell.spell}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
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