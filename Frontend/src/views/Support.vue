<template>
<div class="container">
  <h2>支持</h2>
  <n-alert type="warning" title="需要帮助吗？" show-icon>
    我们建议您首先使用搜索引擎或查看官方 Wiki 来寻找答案，因为很多常见问题都已经有了解决方案。<br>
    当然，您也可以直接联系我们的团队成员寻求帮助。<br>
    <div class="red">
      这是什么、不会用、不会配置、网站打不开等问题一律不予回复。
    </div>
  </n-alert>
  <div style="padding-top: 5px;"></div>
    <n-card>
      <div class="card-container">
        <div class="card-column">
          <a href="https://cn.bing.com" target="_blank">
            <n-card title="前往搜索引擎" hoverable>
              很多问题在搜索引擎都能找到答案！虽然可能针对某些问题的回答的很少，但是大多数都是通用的。
            </n-card>
          </a>
          <n-card title="联系我们" @click="showContact = true" style="cursor: pointer" hoverable>
            通过邮件等方式，来联系 bX-sTudIO 的开发者们以寻求帮助。
            <div class="red" style="font-size: 0.852em;">请勿将您的个人隐私信息（如密码、银行卡号等）通过邮件发送给本团队。</div>
          </n-card>
        </div>
        <div class="card-column">
          <!--<a href="https://wiki.bxstudio.top" target="_blank">
            <n-card title="查看官方 Wiki" hoverable>
              我们的官方 Wiki 包含了大量的使用指南和常见问题解答，帮助您更好地使用我们的产品和服务。
            </n-card>
          </a>-->
          <a href="https://github.com/bX-sTudIO-gh/bX-sTudIO-gh/issues" target="_blank">
            <n-card title="提交问题" hoverable>
              如果您在使用我们的产品或服务时遇到任何问题，请通过 GitHub Issues 提交问题。
            </n-card>
          </a>
          <n-card title="项目列表" @click="showProjectList = true" style="cursor: pointer" hoverable>
            查看我们的项目列表，了解我们的团队成员正在开发的项目。
          </n-card>
        </div>
        <div class="card-column">
          <n-card title="服务条款" @click="showTerms = true" style="cursor: pointer" hoverable>
            查看我们服务的条款和条件，了解您的权利和义务。
            <div class="red">
              请遵守中华人民共和国的相关法律法规。
            </div>
          </n-card>
          <n-card title="隐私政策" @click="showPrivacy = true" style="cursor: pointer" hoverable>
            了解我们如何收集、使用和保护您的个人信息。
            <div class="red">
              本团队会保护您的隐私，请放心使用我们的服务。
            </div>
          </n-card>
        </div>
      </div>
    <n-modal v-model:show="showContact">
      <n-card
        style="width: 600px;"
        @close="showContact = false"
        title="联系我们"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        closable
      >
        如果您在使用我们的产品或服务时遇到任何问题，或者有任何建议和反馈，欢迎通过以下方式联系我们的团队成员：
        <ul>
          <li>电子邮件：
            <ul>
              <li>Lostrain-Yinzo: <n-button text tag="a" href="mailto:qwq9scan@outlook.com" type="primary">qwq9scan@outlook.com</n-button></li>
              <li>Nyauzyolk: <n-button text tag="a" href="mailto:nyauzyolk@outlook.com" type="primary">Nyauzyolk@outlook.com</n-button></li>
              <li>团队支持: <n-button text tag="a" href="mailto:support@bxstudio.top" type="primary">support@bxstudio.top</n-button></li>
            </ul>
          </li>
        </ul>
      </n-card>
    </n-modal>

    <n-modal v-model:show="showProjectList"> 
      <n-card
        style="width: 600px;"
        @close="showProjectList = false"
        title="项目列表"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        closable
      >
        <ul>
          <li><n-button text tag="a" href="https://example.com/" type="primary">Template Project</n-button></li>
        </ul>
      </n-card>
    </n-modal>
    <n-drawer v-model:show="showTerms" :width="480">
    <n-drawer-content title="服务条款" :native-scrollbar="false" closable>
      <div>
          本服务条款（“条款”）适用于您使用由 bX-sTudIO 团队（“我们”或“本团队”）开发和提供的所有产品和服务（“服务”）。通过使用我们的服务，您同意遵守这些条款。如果您不同意这些条款，请勿使用我们的服务。
          <h3>1. 使用许可</h3>
          我们授予您一项有限的、非独占的、不可转让的许可，以按照本条款使用我们的服务。您同意仅将服务用于合法目的，并遵守所有适用的法律法规。
          <h3>2. 用户责任</h3>
            您有责任确保您的使用行为符合本条款的规定。您不得以任何方式滥用服务，包括但不限于：
            <ul>
              <li>干扰或破坏服务的正常运行</li>
              <li>试图未经授权访问服务的任何部分</li>
              <li>上传或传播恶意软件或有害内容</li>
            </ul>
          <h3>3. 知识产权</h3>
            本团队保留对服务及其内容的所有权利、所有权和利益。未经本团队明确书面许可，您不得复制、修改、分发或以其他方式使用服务的任何部分。
          <h3>4. 免责声明</h3>
            我们的服务按“现状”提供，不作任何明示或暗示的保证。对于因使用或无法使用服务而产生的任何损失或损害，我们不承担任何责任。
          <h3>5. 责任限制</h3>
            在适用法律允许的最大范围内，本团队不对因使用或无法使用服务而引起的任何间接、偶然、特殊或后果性损害承担责任。
          <h3>6. 条款变更</h3>
            我们可能会不时更新这些条款。我们将在本页面上发布任何更改，并在必要时通过电子邮件通知您。您在条款变更后继续使用服务即表示您接受更新后的条款。
        </div>
    </n-drawer-content>
  </n-drawer>
  <n-drawer v-model:show="showPrivacy" :width="480">
    <n-drawer-content title="隐私政策" :native-scrollbar="false" closable>
        <div>
          本隐私政策解释了我们如何收集、使用、披露和保护您的个人信息。当您使用我们的服务时，即表示您同意本隐私条款中所述的做法。
          <h3>1. 信息收集</h3>
          我们可能会收集以下类型的信息：
          <ul>
            <li>个人身份信息（如姓名、电子邮件地址）</li>
            <li>使用数据（如访问时间、浏览页面）</li>
            <li>设备信息（如IP地址、浏览器类型）</li>
          </ul>
          <h3>2. 信息使用</h3>
          我们收集的信息可能用于以下目的：
          <ul>
            <li>提供和维护我们的服务</li>
            <li>改进用户体验</li>
            <li>发送重要通知和更新</li>
            <li>防止欺诈和滥用行为</li>
          </ul>
          <h3>3. 信息披露</h3>
          我们不会将您的个人信息出售给第三方。但在以下情况下，我们可能会披露您的信息：
          <ul>
            <li>法律要求时</li>
            <li>保护我们的权利和财产时</li>
            <li>与服务提供商共享以提供服务时</li>
          </ul>
          <h3>4. 信息安全</h3>
          我们采取合理的措施保护您的个人信息免受未经授权的访问、披露或破坏。然而，没有任何一种互联网传输方式或电子存储方式是完全安全的。
          <h3>5. 儿童隐私</h3>
          我们不会有意收集13岁以下儿童的个人信息。如果我们发现我们无意中收集了此类信息，我们将采取措施尽快删除。
          <h3>6. 隐私条款变更</h3>
          我们可能会不时更新本隐私条款。我们将在本页面上发布任何更改，并在必要时通过电子邮件通知您。
        </div>
      </n-drawer-content>
    </n-drawer>
  </n-card>
</div>
</template>

<script setup>
import { ref } from 'vue'

const showContact = ref(false);
const showTerms = ref(false);
const showPrivacy = ref(false);
const showProjectList = ref(false);
</script>

<style scoped>
a {
  text-decoration: none;
}

.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
}

.card-column {
  display: contents;
}

.red {
  color: #ad0023;
}
</style>