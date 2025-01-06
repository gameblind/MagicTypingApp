#!/bin/bash

# 清理旧的构建文件
rm -rf dist

# 构建前端
npm run build

# 构建 Electron
npm run build:electron

echo "构建完成！" 