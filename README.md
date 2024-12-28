# 哈利波特打字冒险

一款融合哈利波特魔法世界的趣味打字练习软件，帮助初学者提升打字技能。

## 功能特点

- 🧙‍♂️ 个性化角色系统：创建你的魔法师角色，开启打字冒险
- ⌨️ 实时虚拟键盘：直观的按键提示和反馈
- 🎯 多样化练习模式：从基础到进阶的打字练习
- ⚔️ 魔法对战系统：通过打字施放魔法咒语
- 📊 进度追踪：详细的练习数据统计和分析

## 技术栈

### 前端
- React + TypeScript
- Material UI
- Recharts (图表库)
- Electron (桌面应用)

### 后端
- Python Flask
- SQLite (数据存储)

## 开发环境要求

- Node.js 16+
- Python 3.8+
- npm 或 yarn

## 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/yourusername/harry-typing.git
cd harry-typing
```

2. 安装前端依赖
```bash
npm install
```

3. 安装后端依赖
```bash
pip install -r requirements.txt
```

4. 启动应用
```bash
# 使用启动脚本同时启动前端和后端
./start.sh

# 或分别启动
# 后端
python src/backend/app.py

# 前端
npm run dev
```

## 项目结构

```
harry-typing/
├── src/
│   ├── frontend/        # React前端代码
│   │   ├── components/  # 可复用组件
│   │   ├── pages/      # 页面组件
│   │   ├── styles/     # 样式文件
│   │   └── utils/      # 工具函数
│   ├── backend/        # Flask后端代码
│   │   ├── models/     # 数据模型
│   │   ├── controllers/# 控制器
│   │   └── utils/      # 工具函数
│   ├── electron/       # Electron主进程
│   └── assets/         # 静态资源
│       ├── audio/      # 音效文件
│       └── images/     # 图片资源
├── data/               # 本地数据存储
├── requirements.txt    # Python依赖
└── package.json       # Node.js依赖
```

## 开发指南

### 前端开发
- 使用 TypeScript 进行开发
- 遵循 React 函数式组件和 Hooks 的最佳实践
- 使用 Material UI 组件库保持界面一致性
- 使用 ESLint 和 Prettier 保持代码风格

### 后端开发
- 遵循 RESTful API 设计规范
- 使用 Python Type Hints 进行类型注解
- 使用 Black 和 Pylint 进行代码格式化和检查

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License
