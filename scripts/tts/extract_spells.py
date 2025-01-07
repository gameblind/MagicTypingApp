import os
import json
import re
from typing import List, Dict

def extract_spells_from_ts(file_path: str) -> List[Dict]:
    """
    从TypeScript文件中提取咒语数据
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取courses数组
        courses_match = re.search(r'const\s+courses\s*=\s*\[(.*?)\];', content, re.DOTALL)
        if not courses_match:
            raise ValueError("未找到courses数组")
        
        courses_content = courses_match.group(1)
        
        # 提取所有咒语
        spells = []
        grade_matches = re.finditer(r'grade:\s*"([^"]+)".*?spells:\s*\[(.*?)\]', courses_content, re.DOTALL)
        
        for grade_match in grade_matches:
            grade_name = grade_match.group(1)
            spells_content = grade_match.group(2)
            
            # 提取每个咒语的详细信息
            spell_matches = re.finditer(
                r'\{\s*spell:\s*"([^"]+)",\s*latin:\s*"([^"]+)",\s*description:\s*"([^"]+)"',
                spells_content
            )
            
            for spell_match in spell_matches:
                spells.append({
                    "grade": grade_name,
                    "name": spell_match.group(1),
                    "latin": spell_match.group(2),
                    "description": spell_match.group(3)
                })
        
        return spells
    
    except Exception as e:
        print(f"提取咒语数据失败: {str(e)}")
        return []

def save_spells_json(spells: List[Dict], output_path: str):
    """
    将提取的咒语数据保存为JSON文件
    """
    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(spells, f, ensure_ascii=False, indent=2)
        print(f"咒语数据已保存到: {output_path}")
    except Exception as e:
        print(f"保存咒语数据失败: {str(e)}")

if __name__ == "__main__":
    # 设置文件路径
    current_dir = os.path.dirname(os.path.abspath(__file__))
    ts_file_path = os.path.join(current_dir, "../../src/frontend/pages/Practice.tsx")
    json_output_path = os.path.join(current_dir, "../../config/spells.json")
    
    # 提取并保存咒语数据
    spells = extract_spells_from_ts(ts_file_path)
    if spells:
        save_spells_json(spells, json_output_path)
        print(f"成功提取 {len(spells)} 个咒语数据")