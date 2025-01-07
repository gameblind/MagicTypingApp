import os
import json
from generate_spell_audio import load_config, generate_spell_audio

def generate_error_sound():
    # 加载配置
    config = load_config()
    effects_dir = os.path.abspath(os.path.join(
        os.path.dirname(__file__),
        "../../",
        config["audio_config"]["effects_dir"]
    ))
    
    # 确保目录存在
    os.makedirs(effects_dir, exist_ok=True)
    
    # 生成错误音效
    error_text = "错误"  # 使用简单的文本作为错误音效
    success = generate_spell_audio(
        "error",
        error_text,
        config,
        effects_dir
    )
    
    if success:
        print(f"错误音效生成成功: {os.path.join(effects_dir, 'error.mp3')}")
    else:
        print("错误音效生成失败")

if __name__ == "__main__":
    generate_error_sound() 