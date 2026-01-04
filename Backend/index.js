const express = require('express');
const os = require('os');
const app = express();

const siteStartTime = Date.now();
let visitCount = 0;

// 存储CPU使用率的历史数据，用于计算平均值
let cpuUsageHistory = [];
const MAX_HISTORY = 10; // 保存最近10次测量结果

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 改进的CPU使用率计算方法
function computeCpuUsage() {
  return new Promise((resolve) => {
    const startMeasure = cpuAverage();
    
    setTimeout(() => {
      const endMeasure = cpuAverage();
      
      const idleDifference = endMeasure.idle - startMeasure.idle;
      const totalDifference = endMeasure.total - startMeasure.total;
      
      const percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
      
      // 将当前测量值添加到历史记录中
      cpuUsageHistory.push(percentageCPU);
      if (cpuUsageHistory.length > MAX_HISTORY) {
        cpuUsageHistory.shift(); // 移除最旧的记录
      }
      
      // 计算平均CPU使用率
      const avgCpu = cpuUsageHistory.reduce((sum, val) => sum + val, 0) / cpuUsageHistory.length;
      
      resolve(avgCpu);
    }, 100);
  });
}

function cpuAverage() {
  let totalIdle = 0, totalTick = 0;
  const cpus = os.cpus();
  
  for(let i = 0, len = cpus.length; i < len; i++) {
    const cpu = cpus[i];

    for(const type in cpu.times) {
      totalTick += cpu.times[type];
    }
    
    totalIdle += cpu.times.idle;
  }
  
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

// 定期更新CPU使用率历史数据
setInterval(() => {
  computeCpuUsage().catch(err => {
    console.error('后台CPU监测出错:', err);
  });
}, 5000); // 每5秒更新一次

app.get('/api/system-status', async (req, res) => {
  try {
    let cpuUsage = 'N/A';
    try {
      // 使用历史平均值而不是瞬时值
      if (cpuUsageHistory.length > 0) {
        const avgCpu = cpuUsageHistory.reduce((sum, val) => sum + val, 0) / cpuUsageHistory.length;
        cpuUsage = `${avgCpu.toFixed(2)}%`;
      } else {
        // 如果还没有历史数据，则进行一次测量
        const cpuPercent = await computeCpuUsage();
        cpuUsage = `${cpuPercent.toFixed(2)}%`;
      }
    } catch (cpuError) {
      console.error('获取CPU信息失败:', cpuError);
    }
    
    let memoryUsage = 'N/A';
    try {
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const usedMemory = totalMemory - freeMemory;
      const memoryPercent = (usedMemory / totalMemory) * 100;
      memoryUsage = `${memoryPercent.toFixed(2)}%`;

    } catch (memoryError) {
      console.error('获取内存信息失败:', memoryError);
    }

    let systemUptime = 'N/A';
    try {
      const uptimeSeconds = os.uptime();
      const days = Math.floor(uptimeSeconds / (24 * 3600));
      const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((uptimeSeconds % 3600) / 60);
      systemUptime = `${days}天${hours}小时${minutes}分`;
    } catch (uptimeError) {
      console.error('获取系统运行时间失败:', uptimeError);
    }
      
    
    const result = {
      cpuUsage,
      memoryUsage,
      systemUptime
    };

    res.json(result);
  } catch (error) {
    console.error('获取系统状态错误:', error);
    res.status(500).json({ 
      cpuUsage: 'N/A',
      memoryUsage: 'N/A',
      systemUptime: 'N/A',
      error: error.message
    });
  }
});

app.get('/api/site-uptime', (req, res) => {
  const currentTime = Date.now();
  const uptimeSeconds = Math.floor((currentTime - siteStartTime) / 1000);
  
  // 增加访问计数
  visitCount++;
  
  res.json({
    uptime: uptimeSeconds,
    visitCount: visitCount
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  // 启动时进行第一次CPU测量
  computeCpuUsage().catch(err => {
    console.error('初始CPU测量出错:', err);
  });
});