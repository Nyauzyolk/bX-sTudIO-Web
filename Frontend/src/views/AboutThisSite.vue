<template>
<div class="container">
  <h2>关于本站点</h2>
  <n-alert type="info" title="提示" show-icon>
    本页面由 <n-button text tag="a" href="https://github.com/Nyauzyolk" target="_blank">Nyauzyolk</n-button> 开发，还有待完善。<br>
    如果您有任何疑问或建议，欢迎随时与我们联系。
  </n-alert>
  <div style="padding-top: 5px;"></div>
  <div class="site-status">
    <n-card title="本站点运行时长">
      <div class="site-status-time">{{ timeDisplay }}</div>
    </n-card>
    <div style="padding: 2px;"></div>
    <n-card title="主机运行状态">
      <n-data-table :columns="[{ title: 'CPU 使用率', key: 'cpuUsage' }, { title: '内存使用率', key: 'memoryUsage' }, { title: '系统运行时间', key: 'systemUptime'}]" :data="[{ cpuUsage: CpuUsage, memoryUsage: MemoryUsage, systemUptime: SystemUptime }]" />
    </n-card>
  </div>
  <div style="padding-top: 5px;"></div>
  <n-card title="页面信息">
    <n-data-table :columns="[{title: '构建版本', key: 'BuildVersion'}, {title: '版本代号', key: 'VNick'}]" :data="[{ BuildVersion: '251213_b1.0.1', VNick: 'NeoWorld' }]" />
  </n-card>
</div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const timeDisplay = ref('')
  const CpuUsage = ref('N/A')
  const MemoryUsage = ref('N/A')
  const SystemUptime = ref('N/A')
  const BackendURL = import.meta.env.VITE_BACKEND_URL
  let timer = null
  
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((seconds % (60 * 60)) / 60)
    const secs = seconds % 60
    
    return `${days}天 ${hours}小时 ${minutes}分钟 ${secs}秒`
  }
  
  const updateTime = () => {
    // 从后端获取站点运行时间
    fetch(BackendURL + `/api/site-uptime`)
      .then(response => response.json())
      .then(data => {
        timeDisplay.value = formatTime(data.uptime)
      })
      .catch(error => {
        console.error('获取站点运行时间失败:', error)
        // 出错时回退到本地计数
        timeDisplay.value = '获取失败'
      })
  }

  // 获取服务器状态的函数
  const fetchServerStatus = async () => {
    try {
      const response = await fetch(BackendURL + '/api/system-status')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      
      // 更新CPU和内存使用率
      CpuUsage.value = data.cpuUsage || 'N/A'
      MemoryUsage.value = data.memoryUsage || 'N/A'
      SystemUptime.value = data.systemUptime || 'N/A'
    } catch (error) {
      console.error('获取服务器状态失败:', error)
      // 可以选择保留旧值或者显示错误
      // CpuUsage.value = 'Error'
      // MemoryUsage.value = 'Error'
    }
  }
  
  onMounted(() => {
    updateTime() // 立即更新一次时间
    fetchServerStatus() // 获取服务器状态
    
    // 设置定时器定期更新所有信息
    timer = setInterval(() => {
      updateTime()
      fetchServerStatus()
    }, 1000)
  })
  
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })
</script>

<style scoped>
  .site-status {
    display: flex;
    justify-content: space-between;
  }

  .site-status-time,
  .site-status-status {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>