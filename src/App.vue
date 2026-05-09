<template>
  <n-config-provider :theme="theme">
    <n-layout class="full-height">
      <!-- 顶部导航栏 -->
      <n-layout-header bordered style="height: 50px; padding: 0 24px;">
        <div style="display: flex; align-items: center; height: 100%;">
          <a href="/" :style="{ 
            marginLeft: '12px', 
            fontSize: '20px', 
            textDecoration: 'none',
            color: theme ? '#ffffff' : '#000000'
          }">bX-sTudIO</a>
      
          <div style="flex: 1;"></div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <n-dropdown 
              trigger="hover" 
              :options="themeOptions" 
              @select="handleThemeSelect"
            >
              <n-button>
                <NIcon>
                  <DarkTheme20Filled v-if="themeManager.getCurrentMode() === 'auto'" />
                  <MoonOutline v-if="themeManager.getCurrentMode() === 'dark'" />
                  <SunnyOutline v-else-if="themeManager.getCurrentMode() === 'light'" />
                </NIcon>
              </n-button>
            </n-dropdown>
          </div>
        </div>
      </n-layout-header>

      <!-- 主体布局 -->
      <n-layout has-sider class="main-layout">
          <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
          >
            <n-menu
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions" 
              @update:value="handleUpdateValue"
            />
          </n-layout-sider>
          <n-layout>
            <n-layout-content class="content-wrapper">
              <router-view></router-view>
            </n-layout-content>
            <n-layout-footer bordered style="height: 50px; padding: 0px 24px; display: flex; align-items: center;">
              <div style="display: flex; align-items: center; height: 100%;">
                <p>© 2026 <n-button text tag="a" href="/" target="_blank" type="primary">bX-sTudIO</n-button>. All rights reserved. </p>
              </div>
              <div style="display: flex; align-items: center; gap: 16px; margin-left: auto;">
                <n-button text tag="a" href="https://beian.miit.gov.cn/" target="_blank" type="primary">京ICP备0000000000号</n-button>
              </div>
            </n-layout-footer>
          </n-layout>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref, h, onMounted, onUnmounted } from 'vue'
import { Coins } from '@vicons/fa'
import { DarkTheme20Filled } from '@vicons/fluent'
import { HomeOutline, BookOutline, CloudDownloadOutline, InformationCircleOutline, SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { SupportAgentFilled } from '@vicons/material'
import { RouterView, useRouter } from 'vue-router'
import { themeManager } from './plugins/themeManager'

const router = useRouter()
const collapsed = ref(false)
const isMobile = ref(false)
const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const theme = themeManager.currentTheme

// 侧边栏菜单
const menuOptions = [
  {
    label: '首页',
    key: '/',
    icon: () => h(HomeOutline)
  },
  {
    label: '关于',
    key: 'about',
    icon: () => h(BookOutline)
  },
  {
    label: '下载',
    key: 'downloads',
    icon: () => h(CloudDownloadOutline)
  },
  { 
    label: '支持', 
    key: 'support', 
    icon: () => h(SupportAgentFilled) 
  },
  {
    label: '捐赠',
    key: 'donate',
    icon: () => h(Coins)
  },
  {
    label: '关于本站点',
    key: 'aboutthissite',
    icon: () => h(InformationCircleOutline)
  }
]

const themeOptions = [
  {
    label: '跟随系统',
    key: 'auto'
  },
  {
    label: '浅色主题',
    key: 'light'
  },
  {
    label: '深色主题',
    key: 'dark'
  }
]

function handleThemeSelect(key) {
  themeManager.setThemeMode(key)
}


const handleResize = () => {
  screenWidth.value = window.innerWidth
  isMobile.value = screenWidth.value <= 768
  if (isMobile.value) {
    collapsed.value = true
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleUpdateValue(key) {
  router.push(key)
}

</script>

<style scoped>
.full-height {
  height: 100vh;
}

.main-layout {
  flex: 1;
  overflow: hidden;
}

.content-wrapper {
  height: calc(100vh - 50px - 50px); /* 减去头部和底部高度 */
  overflow-y: auto;
}

.container {
  padding: 20px;
  height: 100%;
}

/* 底部样式调整 */
.n-layout-footer {
  background-color: var(--n-color);
  border-top: 1px solid var(--n-border-color);
}

/* 平板设备 */
@media (max-width: 768px) {
  .navbar {
    padding: 10px 16px;
    min-height: 48px;
  }

  .navbar-content {
    gap: 12px;
  }

  .navbar-center {
    display: none;
  }

  .navbar-right {
    gap: 4px;
  }
}

/* 手机设备 */
@media (max-width: 480px) {
  .navbar {
    padding: 8px 12px;
    min-height: 44px;
  }

  .navbar-content {
    gap: 8px;
  }

  .navbar-left h3 {
    font-size: 14px;
  }

  .navbar-right {
    gap: 0;
  }
  
  .content-wrapper {
    height: calc(100vh - 50px);
  }

  /* footer 手机适配 */
  .n-layout-footer {
    display: none;
  }
}
</style>