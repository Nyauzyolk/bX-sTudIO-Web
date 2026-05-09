<template>
<div class="container">
  <h2>关于</h2>
  <n-alert type="info" title="提示" show-icon>
    本项目仍在持续开发中，如果您有任何疑问或建议，欢迎随时与我们联系。
  </n-alert>
    <div style="padding-top: 5px;"></div>
  <n-h1 prefix="bar">
    <n-text type="primary">
      正是你们，才有了星光璀璨的夜空
    </n-text>
  </n-h1>
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
            <p>核心开发者 - 万恶之源 - 负责项目的核心开发和维护</p>
            <p><n-button text tag="a" href="mailto:qwq9scan@outlook.com" target="_blank" type="primary">E-Mail</n-button> | <n-button text tag="a" href="https://github.com/qwq9scan114514" target="_blank" type="primary">GitHub</n-button></p>
          </div>
        </n-card>
      </div>
      <div class="card-column">
        <n-card title="LinChiL" hoverable>
          <div class="member-info">
            <n-spin v-if="avatars['LinChiL'] === null" size="large">
              <img :src="avatars['LinChiL'] || defaultAvatar" alt="LinChiL" class="avatar">
            </n-spin>
            <img v-else :src="avatars['LinChiL'] || defaultAvatar" alt="LinChiL" class="avatar">
            <p>动画 - 文案合理性规划</p>
            <p><n-button text tag="a" href="https://github.com/LinChiL" target="_blank" type="primary">GitHub</n-button></p> 
          </div>
        </n-card>
      </div>
      <div class="card-column">
        <n-card title="寒冰" hoverable>
          <div class="member-info">
            <n-spin v-if="avatars['HanBingYa114514'] === null" size="large">
              <img :src="avatars['HanBingYa114514'] || defaultAvatar" alt="HanBingYa114514" class="avatar">
            </n-spin>
            <img v-else :src="avatars['HanBingYa114514'] || defaultAvatar" alt="HanBingYa114514" class="avatar">
            <p>社区管理 - 社区指导</p>
            <p><n-button text tag="a" href="https://github.com/HanBingYa114514" target="_blank" type="primary">GitHub</n-button></p> 
          </div>
        </n-card>
      </div>
      <div class="card-column">
        <n-card title="<Null1>" hoverable>
          <div class="member-info">
            <n-spin v-if="avatars['<Null1>'] === null" size="large">
              <img :src="avatars['<Null1>'] || defaultAvatar" alt="<Null1>" class="avatar">
            </n-spin>
            <img v-else :src="avatars['<Null1>'] || defaultAvatar" alt="<Null1>" class="avatar">
            <p>美工 ~~吉祥物~~ 无 GitHub</p>
            <p><n-button text tag="a" href="mailto:example@example.com" target="_blank" type="primary">E-Mail</n-button></p>
          </div>
        </n-card>
      </div>
      <div class="card-column">
        <n-card title="<Null2>" hoverable>
          <div class="member-info">
            <n-spin v-if="avatars['<Null2>'] === null" size="large">
              <img :src="avatars['<Null2>'] || defaultAvatar" alt="<Null2>" class="avatar">
            </n-spin>
            <img v-else :src="avatars['<Null2>'] || defaultAvatar" alt="<Null2>" class="avatar">
            <p>美工 - 无 GitHub</p>
            <p><n-button text tag="a" href="mailto:example@example.com" target="_blank" type="primary">E-Mail</n-button></p>
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
            <p><n-button text tag="a" href="mailto:nyauzyolk@outlook.com" target="_blank" type="primary">E-Mail</n-button> | <n-button text tag="a" href="https://github.com/Nyauzyolk" target="_blank" type="primary">GitHub</n-button></p> 
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
  'LinChiL': null,
  'HanBingYa114514': null,
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
  fetchGitHubAvatar('LinChiL')
  fetchGitHubAvatar('HanBingYa114514')
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

.member-info p {
  margin: 8px 0;
}

@media (max-width: 992px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .card-container {
    grid-template-columns: 1fr;
  }

  .card-container {
    gap: 16px;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }
}
</style>