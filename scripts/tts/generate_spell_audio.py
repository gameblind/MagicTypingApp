import os
import sys
import json
import http.client
from typing import List, Dict
import logging
from datetime import datetime

# 设置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def load_config() -> Dict:
    """加载配置文件"""
    config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../config/settings.json"))
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"配置文件未找到: {config_path}")
    with open(config_path, "r") as f:
        return json.load(f)

def load_spells() -> List[Dict]:
    """加载所有咒语数据"""
    spells_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../config/spells.json"))
    if not os.path.exists(spells_path):
        raise FileNotFoundError(f"咒语数据文件未找到: {spells_path}")
    with open(spells_path, "r", encoding='utf-8') as f:
        return json.load(f)

def generate_spell_audio(
    spell_name: str,
    text: str,
    config: Dict,
    output_dir: str
) -> bool:
    """生成单个咒语的音频文件"""
    api_config = config["api_config"]
    tts_config = api_config["tts_config"]
    
    # 构建输出文件路径
    output_file = os.path.join(
        output_dir,
        f"{spell_name.lower().replace(' ', '_')}.{tts_config['response_format']}"
    )
    
    # 构建请求
    payload = json.dumps({
        "model": tts_config["default_model"],
        "input": text,
        "voice": tts_config["default_voice"],
        "response_format": tts_config["response_format"],
        "speed": tts_config["speed"]
    })
    
    headers = {
        "Authorization": f"Bearer {api_config['api_key']}",
        "Content-Type": "application/json"
    }
    
    try:
        # 解析 API URL
        if not api_config["api_url"].startswith("https://"):
            raise ValueError("API URL 必须以 https:// 开头")
        host = api_config["api_url"].replace("https://", "").split("/")[0]
        endpoint = "/v1/audio/speech"
        
        # 发送请求
        conn = http.client.HTTPSConnection(host)
        conn.request("POST", endpoint, payload, headers)
        res = conn.getresponse()
        
        if res.status != 200:
            raise Exception(f"API 请求失败，状态码: {res.status}, 原因: {res.reason}")
        
        # 保存音频文件
        audio_data = res.read()
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, "wb") as f:
            f.write(audio_data)
        
        logger.info(f"生成音频成功: {output_file}")
        return True
        
    except Exception as e:
        logger.error(f"生成音频失败 {spell_name}: {str(e)}")
        return False
    finally:
        conn.close()

def generate_all_spell_audio():
    """生成所有咒语的音频文件"""
    try:
        # 加载配置
        config = load_config()
        output_dir = os.path.abspath(os.path.join(
            os.path.dirname(__file__),
            "../../",
            config["audio_config"]["output_dir"]
        ))
        
        # 加载咒语数据
        spells = load_spells()
        
        # 生成音频文件
        success_count = 0
        fail_count = 0
        
        for spell in spells:
            success = generate_spell_audio(
                spell["name"],
                spell["latin"],  # 使用拉丁文作为TTS输入
                config,
                output_dir
            )
            if success:
                success_count += 1
            else:
                fail_count += 1
        
        # 生成音频清单
        manifest = {
            "generated_at": datetime.now().isoformat(),
            "total_spells": len(spells),
            "success_count": success_count,
            "fail_count": fail_count,
            "audio_files": [
                {
                    "spell": spell["name"],
                    "file": f"{spell['name'].lower().replace(' ', '_')}.{config['api_config']['tts_config']['response_format']}"
                }
                for spell in spells
            ]
        }
        
        # 保存音频清单
        manifest_path = os.path.join(output_dir, "manifest.json")
        with open(manifest_path, "w") as f:
            json.dump(manifest, f, indent=2)
        
        logger.info(f"音频生成完成: 成功 {success_count}, 失败 {fail_count}")
        
    except Exception as e:
        logger.error(f"生成过程出错: {str(e)}")
        raise

def generate_spell_sound(spell_name):
    # 为每个法术生成独特的音效
    tts = TextToSpeech()
    audio = tts.generate(spell_name)
    return audio

# 战斗音效包括:
# - 法术施放音效
# - 受伤音效
# - 胜利/失败音效

if __name__ == "__main__":
    try:
        generate_all_spell_audio()
    except Exception as e:
        logger.error(f"程序执行失败: {str(e)}")
        sys.exit(1) 