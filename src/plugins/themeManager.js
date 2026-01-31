import { ref, watch, onMounted } from 'vue'
import { darkTheme } from 'naive-ui'

// 创建主题管理器
export class ThemeManager {
  constructor() {
    // 主题模式：'auto' | 'light' | 'dark'
    this.themeMode = ref('auto')
    // 当前实际应用的主题
    this.currentTheme = ref(null)
    // 系统偏好主题
    this.systemPrefersDark = ref(false)
    
    this.init()
  }
  
  init() {
    // 从localStorage恢复主题设置
    const savedThemeMode = localStorage.getItem('theme-mode')
    if (savedThemeMode) {
      this.themeMode.value = savedThemeMode
    }
    
    // 监听系统主题变化
    if (window.matchMedia) {
      this.systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      // 添加事件监听器
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      this.handleSystemThemeChange = (e) => {
        this.systemPrefersDark.value = e.matches
        this.updateCurrentTheme()
      }
      
      // 使用适当的事件监听方法
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', this.handleSystemThemeChange)
      } else {
        // 兼容旧版本浏览器
        mediaQuery.addListener(this.handleSystemThemeChange)
      }
    }
    
    // 监听主题模式变化并保存到localStorage
    watch(this.themeMode, (newMode) => {
      localStorage.setItem('theme-mode', newMode)
      this.updateCurrentTheme()
    })
    
    // 监听系统偏好变化
    watch(this.systemPrefersDark, () => {
      this.updateCurrentTheme()
    })
    
    // 初始化当前主题
    this.updateCurrentTheme()
  }
  
  updateCurrentTheme() {
    switch (this.themeMode.value) {
      case 'dark':
        this.currentTheme.value = darkTheme
        break
      case 'light':
        this.currentTheme.value = null
        break
      case 'auto':
      default:
        this.currentTheme.value = this.systemPrefersDark.value ? darkTheme : null
        break
    }
  }
  
  toggleTheme() {
    if (this.themeMode.value === 'auto') {
      // 如果当前是自动模式，根据实际应用的主题切换到相反的固定模式
      this.themeMode.value = this.currentTheme.value === darkTheme ? 'light' : 'dark'
    } else if (this.themeMode.value === 'light') {
      this.themeMode.value = 'dark'
    } else {
      this.themeMode.value = 'light'
    }
  }
  
  setThemeMode(mode) {
    if (['auto', 'light', 'dark'].includes(mode)) {
      this.themeMode.value = mode
    }
  }
  
  getCurrentMode() {
    return this.themeMode.value
  }
  
  isDarkTheme() {
    return this.currentTheme.value === darkTheme
  }
}

// 创建全局主题管理实例
export const themeManager = new ThemeManager()

export default themeManager