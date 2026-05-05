<template>
<div class="container">
  <h2>关于</h2>
  <n-alert type="info" title="提示" show-icon>
    以下是我们团队的核心成员，他们致力于为您提供优质的服务和产品。
  </n-alert>
  <div style="padding-top: 5px;"></div>
  <n-card>
    <div class="card-container">
      <div class="card-column">
        <n-card title="Lostrain-Yinzo" hoverable>
          <div class="member-info">
            <n-spin v-if="avatars['qwq9scan114514'] === null" size="large">
              <img :src="avatars['qwq9scan114514'] || defaultAvatar" alt="Lostrain-Yinzo" class="avatar">
            </n-spin>
            <img v-else :src="avatars['qwq9scan114514'] || defaultAvatar" alt="Lostrain-Yinzo" class="avatar">
            <p>核心开发者 - 负责项目的核心开发和维护</p>
            <p><n-button text tag="a" href="mailto:qwq9scan@outlook.com" type="primary">E-Mail</n-button> | <n-button text tag="a" href="https://github.com/qwq9scan114514" type="primary">GitHub</n-button></p>
          </div>
        </n-card>
      </div>
      <div class="card-column">
        <n-card title="Nyauzyolk" hoverable>
          <div class="member-info">
            <n-spin v-if="avatars['Nyauzyolk'] === null" size="large">
              <img :src="avatars['Nyauzyolk'] || defaultAvatar" alt="Nyauzyolk" class="avatar">
            </n-spin>
            <img v-else :src="avatars['Nyauzyolk'] || defaultAvatar" alt="Nyauzyolk" class="avatar">
            <p>场外援助 - 页面开发设计</p>
            <p><n-button text tag="a" href="mailto:nyauzyolk@outlook.com" type="primary">E-Mail</n-button> | <n-button text tag="a" href="https://github.com/Nyauzyolk" type="primary">GitHub</n-button></p> 
          </div>
        </n-card>
      </div>
    </div>
  </n-card>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NSpin } from 'naive-ui'
import defaultAvatar from '@/assets/default-avatar.png'

// 存储头像URL
const avatars = ref({
  'qwq9scan114514': null,
  'Nyauzyolk': null
})

// 通过GitHub API获取头像
const fetchGitHubAvatar = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (response.ok) {
      const data = await response.json()
      avatars.value[username] = data.avatar_url
    }
  } catch (error) {
    console.error(`获取 ${username} 的头像失败:`, error)
  }
}

onMounted(() => {
  fetchGitHubAvatar('qwq9scan114514')
  fetchGitHubAvatar('Nyauzyolk')
})
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
}

.card-column {
  display: contents;
}

.member-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.red {
  color: #ad0023;
}
</style>