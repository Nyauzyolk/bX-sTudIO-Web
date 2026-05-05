<template>
    <div class="container"> 
        <h2>下载</h2>
        <n-card>
            <n-space vertical>
                <div class="radio-group-row">
                  <n-radio-group v-model:value="selectedPlatform" name="platform-selection">
                      <n-radio-button
                          v-for="platform in platformOptions"
                          :key="platform.value"
                          :value="platform.value"
                          :label="platform.label"
                      />
                  </n-radio-group>
                </div>

                <div class="radio-group-row">
                  <n-radio-group v-model:value="selectedArchitecture" name="architecture-selection">
                      <n-radio-button
                          v-for="architecture in architecturesOptions"
                          :key="architecture.value"
                          :value="architecture.value"
                          :label="architecture.label"
                      />
                  </n-radio-group>
                </div>
                
                <n-spin :show="loading">
                    <div class="table-wrapper">
                      <n-data-table 
                          :columns="columns"
                          :data="filteredTableData"
                          :pagination="false"
                          striped
                      />
                    </div>
                </n-spin>
                
                <n-alert v-if="error" type="error" title="加载失败" style="margin-top: 16px;">
                    获取下载链接时出错: {{ error }}
                </n-alert>
            </n-space>
        </n-card>
    </div>
</template>

<script setup>
    import { h, ref, computed, onMounted } from 'vue'
    import { NButton, NSpin, NAlert, NRadioGroup, NRadioButton, NSpace } from 'naive-ui'

    const links = ref([])
    const loading = ref(true)
    const error = ref(null)
    const selectedPlatform = ref('all')
    const selectedArchitecture = ref('all')

    const platformOptions = [
        { label: '全部', value: 'all' },
        { label: 'Windows', value: 'Windows' },
        { label: 'macOS', value: 'macOS' },
        { label: 'Linux', value: 'Linux' },
        { label: 'Android', value: 'Android' }
    ]

    const architecturesOptions = [
        { label: '全部', value: 'all' },
        { label: 'amd64', value: 'amd64' },
        { label: 'i386', value: 'i386' },
        { label: 'arm64', value: 'arm64' },
        { label: 'arm32', value: 'arm32' },
        { label: 'Apple M', value: 'm' }
    ]

    const columns = [
        { 
            title: '平台', 
            key: 'platform'
        },
        { 
            title: '架构', 
            key: 'architecture'
        },
        { 
            title: '名称', 
            key: 'name'
        },
        { 
            title: '描述', 
            key: 'description'
        },
        { 
            title: '版本', 
            key: 'version'
        },
        { 
            title: '下载链接', 
            key: 'actions', 
            render(row) {
                return h(
                    NButton, 
                    { 
                        text: true,
                        tag: 'a',
                        href: row.link || '#', 
                        target: '_blank', 
                        type: 'primary', 
                        size: 'small',
                        disabled: !row.link
                    }, 
                    { default: () => '下载' }
                )
            } 
        }
    ]

    const tableData = computed(() => {
        // 从链接数据中提取条目
        return links.value.map(item => ({
            platform: item.platform || '未知',
            architecture: item.architecture || '未知',
            name: item.name || '暂无',
            description: item.description || '暂无',
            version: item.version || '未知',
            link: item.link
        }))
    })

    const filteredTableData = computed(() => {
        let result = tableData.value
        
        if (selectedPlatform.value !== 'all') {
            result = result.filter(item => 
                item.platform === selectedPlatform.value
            )
        }
        
        if (selectedArchitecture.value !== 'all') {
            result = result.filter(item => 
                item.architecture === selectedArchitecture.value
            )
        }
        
        return result
    })

    onMounted(() => {
        fetch(import.meta.env.VITE_DOWNLOADS_JSON_URL || '/downloads.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                return res.json()
            })
            .then(data => {
                links.value = data
            })
            .catch(err => {
                console.error('获取下载链接失败:', err)
                error.value = err.message
            })
            .finally(() => {
                loading.value = false
            })
    })
</script>

<style scoped>
.container {
  padding: 24px;
}

.container h2 {
  margin-bottom: 16px;
}

.table-wrapper {
  overflow-x: auto;
}

.table-wrapper .n-data-table {
  min-width: 600px;
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .container h2 {
    font-size: 1.5rem;
  }

  .radio-group-row {
    width: 100%;
    overflow-x: auto;
  }

  .radio-group-row .n-radio-group {
    min-width: 100%;
    display: inline-flex;
  }

  .radio-group-row .n-radio-button {
    flex: 0 0 auto;
    min-width: 100px;
  }

  .radio-group-row + .radio-group-row {
    margin-top: 16px;
  }
}
</style>