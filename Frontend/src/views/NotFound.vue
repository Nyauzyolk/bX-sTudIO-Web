<template>
  <div class="not-found-container">
    <n-result
      status="404"
      title="404-页面未找到"
      description="抱歉，您访问的页面不存在"
    >
      <template #footer>
        <n-button type="primary" @click="goHome">
          返回首页
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style scoped></style>