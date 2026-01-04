import { createRouter, createWebHistory } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Index from '@/views/Index.vue'
import About from '@/views/About.vue'
import Downloads from '@/views/Downloads.vue'
import Support from '@/views/Support.vue'
import Donate from '@/views/Donate.vue'
import AboutThisSite from '@/views/AboutThisSite.vue'
import NotFound from '@/views/NotFound.vue'
import Forbidden from '@/views/Forbidden.vue'


const routes = [
    { name: 'Index', path: '/', component: Index },
    { name: 'About', path: '/about', component: About },
    { name: 'Downloads', path: '/downloads', component: Downloads },
    { name: 'Support', path: '/support', component: Support },
    { name: 'Donate', path: '/donate', component: Donate },
    { name: 'AboutThisSite', path: '/aboutthissite', component: AboutThisSite },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { name: 'Forbidden', path: '/403', component: Forbidden },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
