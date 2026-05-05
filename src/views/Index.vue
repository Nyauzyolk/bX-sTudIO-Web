<template>
  <div class="container">
    <div class="content">
      <h1 class="title">欢迎来到 bX-sTudIO 的官方网站</h1>
      <p class="subtitle">我们因Minecraft相遇，我们也要用minecraft的风格来做动画和我们喜欢的东西。</p>

      <!-- 每日一言 -->
      <n-card v-if="hitokotoData" style="margin-top: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">
        <template #header>
          <h3 style="margin: 0; text-align: center;">每日一言</h3>
        </template>
        <div style="text-align: center;">
          <blockquote style="font-size: 1.1rem; font-style: italic; margin-bottom: 16px; line-height: 1.6;">
            {{ hitokotoData.hitokoto }}
          </blockquote>
          <cite style="font-size: 0.9rem; opacity: 0.9;">
            —— {{ hitokotoData.from_who || '佚名' }}
            <span v-if="hitokotoData.from">《{{ hitokotoData.from }}》</span>
          </cite>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const hitokotoData = ref(null)

const fetchHitokoto = async () => {
  try {
    const response = await fetch('https://v1.hitokoto.cn/')
    const data = await response.json()
    hitokotoData.value = data
  } catch (error) {
    console.error('获取一言失败:', error)
    // 设置默认一言
    hitokotoData.value = {
      hitokoto: '代码如诗，创意无限',
      from_who: 'bX-sTudIO',
      from: '开发者寄语'
    }
  }
}

onMounted(() => {
  fetchHitokoto()
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  text-align: center;
}

.content {
  max-width: 800px;
  padding-bottom: 100px;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>