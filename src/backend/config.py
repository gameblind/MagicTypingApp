import os
from pathlib import Path

# 基础配置
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
ASSETS_DIR = BASE_DIR / "src" / "assets"

# 确保必要的目录存在
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR / "audio", exist_ok=True)
os.makedirs(ASSETS_DIR / "images", exist_ok=True)

# 应用配置
class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "harry-potter-typing-secret"
    DEBUG = False
    
    # 文件路径
    USER_PROFILE_PATH = DATA_DIR / "user_profile.json"
    PRACTICE_LOG_PATH = DATA_DIR / "practice_log.txt"
    
    # 游戏配置
    MIN_TYPING_SPEED = 20  # 最低打字速度要求（WPM）
    MAX_TYPING_SPEED = 120  # 最高打字速度记录（WPM）
    ACCURACY_THRESHOLD = 0.95  # 准确率达标阈值
    
    # 关卡配置
    LEVELS = {
        "新手魔法师": {"min_speed": 20, "accuracy": 0.85},
        "进阶巫师": {"min_speed": 40, "accuracy": 0.90},
        "高级巫师": {"min_speed": 60, "accuracy": 0.95},
        "魔法大师": {"min_speed": 80, "accuracy": 0.97}
    }

class DevelopmentConfig(Config):
    DEBUG = True
    
class ProductionConfig(Config):
    DEBUG = False
    
# 根据环境变量选择配置
config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}

def get_config():
    """获取当前环境的配置"""
    env = os.environ.get("FLASK_ENV", "development")
    return config.get(env, config["default"])()
