import * as fs from 'fs'
import * as path from 'path'
import { app } from 'electron'

class BackupManager {
  private backupDir: string
  private static instance: BackupManager

  private constructor() {
    this.backupDir = path.join(app.getPath('userData'), 'backups')
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true })
    }
  }

  public static getInstance(): BackupManager {
    if (!BackupManager.instance) {
      BackupManager.instance = new BackupManager()
    }
    return BackupManager.instance
  }

  public async createBackup(): Promise<string> {
    const dbPath = path.join(app.getPath('userData'), 'database.json')
    if (!fs.existsSync(dbPath)) {
      throw new Error('数据库文件不存在')
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupPath = path.join(this.backupDir, `backup-${timestamp}.json`)

    try {
      await fs.promises.copyFile(dbPath, backupPath)
      
      // 清理旧备份，只保留最近30个
      const files = await fs.promises.readdir(this.backupDir)
      const backupFiles = files
        .filter(file => file.startsWith('backup-'))
        .sort((a, b) => b.localeCompare(a))

      if (backupFiles.length > 30) {
        for (const file of backupFiles.slice(30)) {
          await fs.promises.unlink(path.join(this.backupDir, file))
        }
      }

      return backupPath
    } catch (error) {
      console.error('创建备份失败:', error)
      throw error
    }
  }

  public async restoreBackup(backupPath: string): Promise<void> {
    if (!fs.existsSync(backupPath)) {
      throw new Error('备份文件不存在')
    }

    const dbPath = path.join(app.getPath('userData'), 'database.json')
    
    try {
      // 创建当前数据库的临时备份
      const tempBackup = path.join(this.backupDir, `temp-${Date.now()}.json`)
      if (fs.existsSync(dbPath)) {
        await fs.promises.copyFile(dbPath, tempBackup)
      }

      // 恢复备份
      await fs.promises.copyFile(backupPath, dbPath)
    } catch (error) {
      console.error('恢复备份失败:', error)
      throw error
    }
  }

  public async listBackups(): Promise<string[]> {
    try {
      const files = await fs.promises.readdir(this.backupDir)
      return files
        .filter(file => file.startsWith('backup-'))
        .sort((a, b) => b.localeCompare(a))
    } catch (error) {
      console.error('获取备份列表失败:', error)
      throw error
    }
  }
}

export const backupManager = BackupManager.getInstance() 