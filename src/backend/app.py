import os
import sys
from pathlib import Path

# 添加项目根目录到 Python 路径
current_dir = Path(__file__).resolve().parent
root_dir = current_dir.parent.parent
sys.path.append(str(root_dir))

from flask import Flask, request, jsonify
from flask_cors import CORS
from src.backend.models.user import UserManager
from src.backend.utils.keyboard import VirtualKeyboard
from src.backend.utils.logger import PracticeLogger
from src.backend.config import get_config

app = Flask(__name__)
CORS(app)

# 获取配置
config = get_config()

# 初始化组件
user_manager = UserManager(config.USER_PROFILE_PATH)
keyboard = VirtualKeyboard()
logger = PracticeLogger(config.PRACTICE_LOG_PATH)

@app.route('/api/users', methods=['POST'])
def create_user():
    """创建新用户"""
    data = request.json
    try:
        user = user_manager.create_user(data['name'], data['avatar'])
        return jsonify(user.to_dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/users/<name>', methods=['GET'])
def get_user(name):
    """获取用户信息"""
    user = user_manager.get_user(name)
    if user:
        return jsonify(user.to_dict())
    return jsonify({'error': 'User not found'}), 404

@app.route('/api/practice/analyze', methods=['POST'])
def analyze_typing():
    """分析打字序列"""
    data = request.json
    text = data.get('text', '')
    analysis = keyboard.analyze_typing_sequence(text)
    return jsonify(analysis)

@app.route('/api/practice/submit', methods=['POST'])
def submit_practice():
    """提交练习结果"""
    data = request.json
    user_name = data.get('user_name')
    user = user_manager.get_user(user_name)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # 更新用户统计信息
    user.update_stats(
        time_spent=data.get('duration', 0),
        chars_typed=data.get('chars_typed', 0),
        accuracy=data.get('accuracy', 0.0),
        wpm=data.get('wpm', 0.0),
        lesson=data.get('lesson', '')
    )
    
    # 保存用户数据
    user_manager.update_user(user_name, user)
    
    # 记录练习日志
    logger.log_practice_session(user_name, data)
    
    return jsonify({'success': True})

@app.route('/api/statistics/<user_name>', methods=['GET'])
def get_statistics(user_name):
    """获取用户统计信息"""
    days = request.args.get('days', default=7, type=int)
    stats = logger.get_user_statistics(user_name, days)
    return jsonify(stats)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3002, debug=False)
