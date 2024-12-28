import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, Any

class PracticeLogger:
    def __init__(self, log_path: Path):
        self.log_path = log_path
        
        # 确保日志目录存在
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        
        # 配置日志格式
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(str(log_path), encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
        
        self.logger = logging.getLogger('HarryTyping')
    
    def log_practice_session(self, user_name: str, practice_data: Dict[str, Any]):
        """记录练习会话数据"""
        timestamp = datetime.now().isoformat()
        
        log_entry = {
            "timestamp": timestamp,
            "user_name": user_name,
            "practice_type": practice_data.get("type", "unknown"),
            "duration": practice_data.get("duration", 0),
            "characters_typed": practice_data.get("chars_typed", 0),
            "accuracy": practice_data.get("accuracy", 0.0),
            "wpm": practice_data.get("wpm", 0.0),
            "lesson": practice_data.get("lesson", ""),
            "completed": practice_data.get("completed", False)
        }
        
        self.logger.info(f"Practice session: {json.dumps(log_entry, ensure_ascii=False)}")
    
    def log_achievement(self, user_name: str, achievement: str, details: str = ""):
        """记录用户成就"""
        self.logger.info(f"Achievement unlocked - User: {user_name}, Achievement: {achievement}, Details: {details}")
    
    def log_error(self, user_name: str, error_type: str, details: str):
        """记录错误信息"""
        self.logger.error(f"Error occurred - User: {user_name}, Type: {error_type}, Details: {details}")
    
    def log_level_up(self, user_name: str, old_level: str, new_level: str):
        """记录用户升级信息"""
        self.logger.info(f"Level up - User: {user_name}, From: {old_level}, To: {new_level}")
    
    def get_user_statistics(self, user_name: str, days: int = 7) -> Dict[str, Any]:
        """获取用户统计数据"""
        stats = {
            "total_practice_time": 0,
            "total_characters": 0,
            "average_accuracy": 0.0,
            "average_wpm": 0.0,
            "completed_lessons": 0
        }
        
        if not self.log_path.exists():
            return stats
        
        cutoff_date = datetime.now().timestamp() - (days * 24 * 60 * 60)
        practice_sessions = []
        
        with open(self.log_path, 'r', encoding='utf-8') as f:
            for line in f:
                if 'Practice session' not in line:
                    continue
                    
                try:
                    # 提取JSON部分
                    json_str = line[line.index('{'):line.rindex('}')+1]
                    session_data = json.loads(json_str)
                    
                    if session_data['user_name'] != user_name:
                        continue
                        
                    session_timestamp = datetime.fromisoformat(session_data['timestamp']).timestamp()
                    if session_timestamp < cutoff_date:
                        continue
                        
                    practice_sessions.append(session_data)
                except (ValueError, json.JSONDecodeError, KeyError):
                    continue
        
        if not practice_sessions:
            return stats
        
        # 计算统计数据
        total_chars = sum(session['characters_typed'] for session in practice_sessions)
        stats['total_practice_time'] = sum(session['duration'] for session in practice_sessions)
        stats['total_characters'] = total_chars
        stats['completed_lessons'] = len(set(session['lesson'] for session in practice_sessions if session['completed']))
        
        # 计算加权平均
        if total_chars > 0:
            stats['average_accuracy'] = sum(session['accuracy'] * session['characters_typed'] 
                                         for session in practice_sessions) / total_chars
            stats['average_wpm'] = sum(session['wpm'] * session['characters_typed'] 
                                    for session in practice_sessions) / total_chars
        
        return stats
