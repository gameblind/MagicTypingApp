import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { db } from './database';
import { backupManager } from './utils/backup';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 开发环境下加载 Vite 开发服务器
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3004');
    mainWindow.webContents.openDevTools();
  } else {
    // 生产环境下加载打包后的文件
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
  }
}

// 初始化应用
async function init() {
  try {
    // 确保数据库已初始化
    await db.initialize();
    
    // 设置每日自动备份
    setInterval(async () => {
      try {
        await backupManager.createBackup();
      } catch (error) {
        console.error('自动备份失败:', error);
      }
    }, 24 * 60 * 60 * 1000); // 24小时
    
    // 创建窗口
    createWindow();
  } catch (error) {
    console.error('应用初始化失败:', error);
    app.quit();
  }
}

// 应用准备就绪时初始化
app.whenReady().then(init);

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});