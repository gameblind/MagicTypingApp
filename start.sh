#!/bin/bash

# 设置环境变量
export FLASK_ENV=development
export FLASK_APP=src/backend/app.py
export PYTHONPATH=$PYTHONPATH:$(pwd)

# 启动后端服务器
python src/backend/app.py &

# 启动前端开发服务器
npm run dev &

# 等待所有后台进程完成
wait 