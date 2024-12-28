from typing import Dict, List, Tuple

class VirtualKeyboard:
    def __init__(self):
        self.layout = {
            'row1': ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
            'row2': ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
            'row3': ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
            'row4': ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
            'row5': ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl']
        }
        
        self.key_positions: Dict[str, Tuple[int, int]] = {}
        self._init_key_positions()
    
    def _init_key_positions(self):
        """初始化每个键的位置"""
        for row_idx, (row_name, keys) in enumerate(self.layout.items()):
            for col_idx, key in enumerate(keys):
                self.key_positions[key.lower()] = (row_idx, col_idx)
    
    def get_key_position(self, key: str) -> Tuple[int, int]:
        """获取键的位置"""
        return self.key_positions.get(key.lower(), (-1, -1))
    
    def get_finger_assignment(self, key: str) -> int:
        """获取按键应该使用哪个手指（1-8，从左小指到右小指）"""
        finger_map = {
            '`': 1, '1': 1, 'q': 1, 'a': 1, 'z': 1,
            '2': 1, 'w': 2, 's': 2, 'x': 2,
            '3': 2, 'e': 3, 'd': 3, 'c': 3,
            '4': 3, 'r': 4, 'f': 4, 'v': 4, '5': 4,
            '6': 5, 't': 4, 'g': 4, 'b': 4,
            '7': 5, 'y': 5, 'h': 5, 'n': 5,
            '8': 6, 'u': 6, 'j': 6, 'm': 6,
            '9': 7, 'i': 7, 'k': 7, ',': 7,
            '0': 7, 'o': 7, 'l': 7, '.': 7,
            '-': 8, 'p': 8, ';': 8, '/': 8,
            '=': 8, '[': 8, "'": 8,
            ']': 8, '\\': 8
        }
        return finger_map.get(key.lower(), 0)
    
    def get_hand_assignment(self, key: str) -> str:
        """获取按键应该使用哪只手"""
        finger = self.get_finger_assignment(key)
        return "左手" if finger <= 4 else "右手"
    
    def get_next_key_hint(self, current_key: str, next_key: str) -> str:
        """获取下一个按键的提示信息"""
        current_finger = self.get_finger_assignment(current_key)
        next_finger = self.get_finger_assignment(next_key)
        next_hand = self.get_hand_assignment(next_key)
        
        if current_finger == next_finger:
            return f"保持{next_hand}第{next_finger}指在原位"
        else:
            return f"使用{next_hand}第{next_finger}指"
    
    def get_key_distance(self, key1: str, key2: str) -> float:
        """计算两个键之间的距离"""
        pos1 = self.get_key_position(key1)
        pos2 = self.get_key_position(key2)
        
        if pos1 == (-1, -1) or pos2 == (-1, -1):
            return float('inf')
        
        row_diff = abs(pos1[0] - pos2[0])
        col_diff = abs(pos1[1] - pos2[1])
        return (row_diff ** 2 + col_diff ** 2) ** 0.5
    
    def analyze_typing_sequence(self, text: str) -> List[Dict]:
        """分析一段文本的按键序列"""
        result = []
        prev_key = None
        
        for char in text:
            if not char.strip():  # 跳过空白字符
                continue
                
            key_info = {
                'key': char,
                'hand': self.get_hand_assignment(char),
                'finger': self.get_finger_assignment(char),
                'position': self.get_key_position(char)
            }
            
            if prev_key:
                key_info['distance'] = self.get_key_distance(prev_key, char)
                key_info['hint'] = self.get_next_key_hint(prev_key, char)
            
            result.append(key_info)
            prev_key = char
        
        return result
