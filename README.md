# HarryTyping

哈利波特主题打字练习软件

## 功能特点

- 完整的七年级课程体系
- 实时打字反馈和进度显示
- 声音反馈系统
- 可收缩的课程导航菜单
- 虚拟键盘显示
- 打字速度和准确率统计
- 成就系统

## 本地开发

### 环境要求

- Node.js 18+
- npm 9+

### 开发步骤

1. 安装依赖
   ```bash
   npm install
   ```

2. 启动开发服务器
   ```bash
   npm run dev
   ```

3. 构建应用
   ```bash
   npm run build
   ```

4. 运行测试
   ```bash
   npm test
   ```

### 项目脚本

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run test`: 运行测试
- `npm run lint`: 运行代码检查
- `npm run clean`: 清理构建文件

## 项目配置

### TypeScript 配置

项目包含多个 TypeScript 配置文件：
- `tsconfig.json`: 基础 TypeScript 配置
- `tsconfig.node.json`: Node.js 相关配置
- `tsconfig.build.json`: 构建相关配置

### 测试配置

- 使用 Jest 进行单元测试
- 配置文件：`jest.config.js` 和 `jest.setup.js`
- 包含 React Testing Library 支持

### 开发工具

- ESLint 用于代码检查
- Vite 用于开发和构建
- Concurrently 用于并行运行多个命令

### 数据文件

- `spells.json`: 包含所有魔法咒语的配置
- `config/`: 包含应用配置文件
- `data/`: 存储应用数据

## 部署到群晖NAS

### 前提条件

1. 群晖NAS已安装Docker套件
2. 确保NAS有足够的存储空间
3. 确保可以访问Container Manager

### 构建步骤

1. 准备Docker环境
   ```bash
   # 在本地构建Docker镜像(确保在x86_64架构下构建)
   docker build --platform linux/amd64 -t harrytyping:1.0.8 .
   
   # 保存镜像为文件
   docker save harrytyping:1.0.8 > harrytyping_v1.0.8.tar
   ```

2. Dockerfile内容
   ```dockerfile
   # 构建阶段
   FROM node:18-alpine as builder
   
   # 设置工作目录
   WORKDIR /app
   
   # 复制 package.json 和 package-lock.json
   COPY package*.json ./
   
   # 安装依赖
   RUN npm install --legacy-peer-deps
   
   # 复制源代码
   COPY . .
   
   # 构建应用
   RUN npm run build
   
   # 生产阶段
   FROM nginx:stable-alpine
   
   # 复制 nginx 配置
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   
   # 复制构建文件到 nginx
   COPY --from=builder /app/dist /usr/share/nginx/html
   
   # 暴露端口
   EXPOSE 80
   
   # 启动 nginx
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. nginx.conf内容
   ```nginx
   server {
       listen       80;
       server_name  localhost;
   
       location / {
           root   /usr/share/nginx/html;
           index  index.html index.htm;
           try_files $uri $uri/ /index.html;
       }
   
       error_page   500 502 503 504  /50x.html;
       location = /50x.html {
           root   /usr/share/nginx/html;
       }
   }
   ```

4. 文件准备
   - 创建目录：`/volume1/docker/harrytyping/`
   - 上传文件：将 `harrytyping_v1.0.8.tar` 上传到该目录

### 部署步骤

1. 导入镜像
   - 打开群晖的Container Manager
   - 选择"注册表" > "从文件添加"
   - 选择上传的 `harrytyping_v1.0.8.tar` 文件

2. 创建容器
   - 在Container Manager中点击"容器" > "新增"
   - 选择刚导入的 `harrytyping:1.0.8` 镜像
   - 配置容器：
     * 容器名称：harrytyping
     * 端口设置：本地端口80 -> 容器端口80
     * 重启策略：unless-stopped

3. 启动容器
   - 点击"应用"创建容器
   - 容器列表中找到新创建的容器
   - 点击"启动"按钮

### 访问应用

- 通过浏览器访问：`http://群晖IP:80`
- 例如：`http://192.168.0.27:80`

### 注意事项

1. 架构问题
   - 确保使用正确的CPU架构（x86_64/amd64）
   - 使用 `--platform linux/amd64` 指定架构

2. 端口占用
   - 如果80端口被占用，可以映射到其他端口
   - 注意不要与其他服务端口冲突

3. 权限问题
   - 确保目录有正确的读写权限
   - 使用admin或具有Docker权限的用户操作

4. 网络问题
   - 确保群晖可以访问外网（首次拉取镜像时需要）
   - 检查防火墙设置，确保端口开放

### 维护管理

1. 查看日志
   ```bash
   # 在Container Manager中：
   1. 选择容器
   2. 点击"日志"查看运行状态
   ```

2. 更新应用
   ```bash
   # 构建新版本
   1. 修改代码后重新构建Docker镜像
   2. 导出并上传新版本
   3. 在Container Manager中更新容器
   ```

3. 备份
   - 定期备份配置文件
   - 可以导出镜像文件保存

### 故障排除

1. 容器无法启动
   - 检查日志输出
   - 确认端口是否被占用
   - 验证架构是否匹配

2. 无法访问应用
   - 检查端口映射
   - 确认网络设置
   - 验证防火墙规则

3. 性能问题
   - 监控资源使用
   - 适当调整容器限制

### 技术栈

- 前端：React + TypeScript
- 构建：Vite
- 容器：Docker + Nginx
- 运行环境：Node.js
