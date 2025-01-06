# Harry Potter Typing

一个基于哈利波特魔法世界主题的打字练习软件。

## 功能特点

- 🎯 分级练习：从新手入门到六年级的完整课程体系
- ⚡ 即时反馈：实时显示打字速度和准确率
- 📊 详细统计：追踪每个咒语的练习进度和表现
- 💾 本地存储：使用 SQLite 数据库保存练习数据
- 📱 离线使用：完全本地运行，无需网络连接
- 🔄 数据备份：支持数据导出和恢复功能

## 技术栈

- Electron
- React + TypeScript
- SQLite3 数据库
- Material-UI 组件库

## 开发环境设置

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/harry-typing.git
cd harry-typing
```

2. 安装依赖：
```bash
npm install
```

3. 运行开发服务器：
```bash
npm run dev
```

## 数据存储

应用使用 SQLite 数据库存储用户数据，包括：
- 练习记录
- 咒语进度
- 统计数据

数据库文件位置：
- Windows: `%APPDATA%/harry-typing/typing.db`
- macOS: `~/Library/Application Support/harry-typing/typing.db`
- Linux: `~/.config/harry-typing/typing.db`

## 数据备份

自动备份：
- 应用每天自动创建数据备份
- 备份存储在文档目录的 HarryTyping/backups 文件夹中

手动备份：
1. 点击设置中的"导出数据"
2. 选择保存位置
3. 系统将创建一个完整的数据库备份

恢复备份：
1. 点击设置中的"导入数据"
2. 选择备份文件
3. 系统将恢复所选备份的数据

## 开发指南

### 数据库操作

```typescript
// 示例：添加练习记录
await db.savePracticeRecord({
  spellName: "Lumos",
  duration: 120,
  totalChars: 100,
  correctChars: 95,
  speed: 45,
  completed: true
});

// 示例：获取统计数据
const stats = await db.getStatistics();
```

### 添加新咒语

1. 在 `src/data/spells.ts` 中添加咒语信息
2. 更新数据库模式（如需要）
3. 添加相应的测试用例

## 测试

运行测试：
```bash
npm test
```

运行特定测试：
```bash
npm test -- -t "spell statistics"
```

## 构建

构建生产版本：
```bash
npm run build
```

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
