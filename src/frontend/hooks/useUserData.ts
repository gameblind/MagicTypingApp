import { useState, useEffect } from 'react';
import { UserData } from '../types/user';

const defaultUserData: UserData = {
  achievements: [],
  spellProgress: {},
  battleRecords: [],
  stats: {
    totalPractices: 0,
    averageAccuracy: 0,
    averageWPM: 0,
    lastPracticeDate: null,
  }
};

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  
  useEffect(() => {
    // 从本地存储加载用户数据
    const loadedData = localStorage.getItem('user_data');
    if (loadedData) {
      setUserData(JSON.parse(loadedData));
    }
  }, []);
  
  const unlockAchievement = (achievementId: string) => {
    if (!userData.achievements.includes(achievementId)) {
      const newUserData = {
        ...userData,
        achievements: [...userData.achievements, achievementId]
      };
      setUserData(newUserData);
      localStorage.setItem('user_data', JSON.stringify(newUserData));
    }
  };
  
  return { userData, unlockAchievement };
}; 