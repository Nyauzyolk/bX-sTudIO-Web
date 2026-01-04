import { createApp } from 'vue'
import App from './App.vue'

import router from './plugins/router'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
// 样式组
import './assets/style.css'

const app = createApp(App)

app.use(router)

app.mount('#app')