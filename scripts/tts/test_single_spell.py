from generate_spell_audio import generate_spell_audio, load_config
import os

def test_single_spell():
    # 加载配置
    config = load_config()
    output_dir = os.path.abspath(os.path.join(
        os.path.dirname(__file__),
        "../../",
        config["audio_config"]["output_dir"]
    ))
    
    # 测试生成单个咒语的音频
    test_spell = {
        "name": "Wingardium Leviosa",
        "latin": "Wingardium Leviosa"
    }
    
    success = generate_spell_audio(
        test_spell["name"],
        test_spell["latin"],
        config,
        output_dir
    )
    
    if success:
        print(f"测试成功：已生成咒语 {test_spell['name']} 的音频文件")
    else:
        print(f"测试失败：生成咒语 {test_spell['name']} 的音频文件时出错")

if __name__ == "__main__":
    test_single_spell() 