import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

class User:
    def __init__(self, name: str, avatar: str):
        self.name = name
        self.avatar = avatar
        self.level = "新手魔法师"
        self.exp = 0
        self.created_at = datetime.now().isoformat()
        self.last_login = datetime.now().isoformat()
        self.practice_stats = {
            "total_time": 0,  # 总练习时间（分钟）
            "total_characters": 0,  # 总打字字符数
            "accuracy": 0.0,  # 平均准确率
            "wpm": 0.0,  # 平均速度
            "completed_lessons": []  # 已完成的课程
        }
    
    def to_dict(self) -> Dict:
        """将用户数据转换为字典格式"""
        return {
            "name": self.name,
            "avatar": self.avatar,
            "level": self.level,
            "exp": self.exp,
            "created_at": self.created_at,
            "last_login": self.last_login,
            "practice_stats": self.practice_stats
        }
    
    @classmethod
    def from_dict(cls, data: Dict) -> 'User':
        """从字典创建用户实例"""
        user = cls(data["name"], data["avatar"])
        user.level = data["level"]
        user.exp = data["exp"]
        user.created_at = data["created_at"]
        user.last_login = data["last_login"]
        user.practice_stats = data["practice_stats"]
        return user
    
    def update_stats(self, time_spent: int, chars_typed: int, accuracy: float, wpm: float, lesson: str):
        """更新用户练习统计信息"""
        stats = self.practice_stats
        total_chars = stats["total_characters"] + chars_typed
        
        # 更新平均准确率
        stats["accuracy"] = (stats["accuracy"] * stats["total_characters"] + accuracy * chars_typed) / total_chars
        
        # 更新平均速度
        stats["wpm"] = (stats["wpm"] * stats["total_characters"] + wpm * chars_typed) / total_chars
        
        # 更新总计数据
        stats["total_time"] += time_spent
        stats["total_characters"] = total_chars
        
        if lesson not in stats["completed_lessons"]:
            stats["completed_lessons"].append(lesson)
            self.gain_exp(10)  # 完成新课程奖励经验值
    
    def gain_exp(self, amount: int):
        """获得经验值并检查升级"""
        self.exp += amount
        self._check_level_up()
    
    def _check_level_up(self):
        """检查是否达到升级条件"""
        level_thresholds = {
            "新手魔法师": 0,
            "进阶巫师": 100,
            "高级巫师": 300,
            "魔法大师": 600
        }
        
        for level, threshold in level_thresholds.items():
            if self.exp >= threshold:
                self.level = level

class UserManager:
    def __init__(self, profile_path: Path):
        self.profile_path = profile_path
        self.users: Dict[str, User] = {}
        self._load_users()
    
    def _load_users(self):
        """从文件加载用户数据"""
        if self.profile_path.exists():
            with open(self.profile_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for name, user_data in data.items():
                    self.users[name] = User.from_dict(user_data)
    
    def save_users(self):
        """保存用户数据到文件"""
        data = {name: user.to_dict() for name, user in self.users.items()}
        with open(self.profile_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def create_user(self, name: str, avatar: str) -> User:
        """创���新用户"""
        if name in self.users:
            raise ValueError(f"用户 {name} 已存在")
        
        user = User(name, avatar)
        self.users[name] = user
        self.save_users()
        return user
    
    def get_user(self, name: str) -> Optional[User]:
        """获取用户信息"""
        return self.users.get(name)
    
    def update_user(self, name: str, user: User):
        """更新用户信息"""
        if name not in self.users:
            raise ValueError(f"用户 {name} 不存在")
        
        self.users[name] = user
        self.save_users()
