import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProviderStore = defineStore('provider', () => {
    const loadingBar = ref(null)

    function setLoadingBar(b) {
        loadingBar.value = b
    }

    return { loadingBar, setLoadingBar }
})