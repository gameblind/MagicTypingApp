import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData, PracticeRecord, Achievement } from '../types/user';
import {
  loadUserData,
  saveUserData,
  updateUserData,
  addPracticeRecord,
  unlockAchievement,
  updateSpellProgress,
  checkAndUpdateLevel,
} from '../utils/userDataManager';

interface UserDataContextType {
  userData: UserData;
  updateUser: (updates: Partial<UserData>) => void;
  addPractice: (record: PracticeRecord) => void;
  unlockNewAchievement: (achievement: Achievement) => void;
  updateSpell: (spell: string, accuracy: number, wpm: number) => void;
  gainExperience: (exp: number) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => loadUserData());

  useEffect(() => {
    // 每次打开应用时更新最后登录时间
    const updatedData = updateUserData({
      lastLoginAt: new Date().toISOString(),
    });
    setUserData(updatedData);
  }, []);

  const updateUser = (updates: Partial<UserData>) => {
    const newData = updateUserData(updates);
    setUserData(newData);
  };

  const addPractice = (record: PracticeRecord) => {
    addPracticeRecord(record);
    setUserData(loadUserData());
  };

  const unlockNewAchievement = (achievement: Achievement) => {
    unlockAchievement(achievement);
    setUserData(loadUserData());
  };

  const updateSpell = (spell: string, accuracy: number, wpm: number) => {
    updateSpellProgress(spell, accuracy, wpm);
    setUserData(loadUserData());
  };

  const gainExperience = (exp: number) => {
    checkAndUpdateLevel(exp);
    setUserData(loadUserData());
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        updateUser,
        addPractice,
        unlockNewAchievement,
        updateSpell,
        gainExperience,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}; 