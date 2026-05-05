<template>
    <div class="container">
        <h2>捐赠</h2>
        <n-alert type="success" title="支持我们的发展" show-icon>
            如果您觉得我们的项目对您有所帮助，欢迎通过以下方式进行捐赠，以支持我们的持续发展和维护工作。
        </n-alert>
        <div style="padding-top: 5px;"></div>
        <n-alert type="warning" title="注意" show-icon>
            请以自己实际经济情况来选择捐赠金额，未成年请勿捐赠。
        </n-alert>
        <div style="padding-top: 5px;"></div>
        <n-card>
            <div>请选择您的捐赠方式：</div>
            <div class="donate-options">
                <n-card @click="WeixinQRCodeModal = true" title="点击通过微信捐赠" style="cursor: pointer" hoverable>
                    <p>点击卡片，打开微信扫描二维码进行捐赠。</p>
                </n-card>
                <div style="padding: 10px;"></div>
                <n-card @click="AlipayQRCodeModal = true" title="点击通过支付宝捐赠" style="cursor: pointer" hoverable>
                    <p>点击卡片，打开支付宝扫描二维码进行捐赠。</p>
                </n-card>
                <!--<div style="padding: 10px;"></div>
                <n-card title="通过银行转账捐赠" hoverable>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div>银行账户：xxx</div>
                        <div>银行账号：xxx</div>
                    </div>
                </n-card>-->
            </div>
        </n-card>
        <div style="padding-top: 5px;"></div>
        <n-data-table 
        :columns="columns" 
        :data="data" 
        striped /> 

        <n-modal v-model:show="WeixinQRCodeModal" title="微信捐赠二维码" >
            <n-card title="微信捐赠二维码" style="width: 450px;" @close="WeixinQRCodeModal = false" closable>
                <img :src="WeixinQRCode" alt="微信捐赠二维码">
            </n-card>
        </n-modal>

        <n-modal v-model:show="AlipayQRCodeModal" title="支付宝捐赠二维码">
            <n-card title="支付宝捐赠二维码" style="width: 450px;" @close="AlipayQRCodeModal = false" closable>
                <img :src="AlipayQRCode" alt="支付宝捐赠二维码">
            </n-card>
        </n-modal>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import WeixinQRCode from '@/assets/WeixinQRCode.png'
import AlipayQRCode from '@/assets/AlipayQRCode.png'

const WeixinQRCodeModal = ref(false)
const AlipayQRCodeModal = ref(false)


    const columns = [
        {
            title: '捐赠方式',
            key: 'method',
        },
        {
            title: '昵称',
            key: 'nickname',
        },
        {
            title: '金额',
            key: 'amount',
        },
        {
            title: '备注',
            key: 'note',
        },
    ];

    const data = [
        /* 添加捐赠信息 
{
            method: '微信',
            nickname: '昵称',
            amount: '100元',
            note: '',
        },
        {
            method: '支付宝',
            nickname: '昵称',
            amount: '200元',
            note: '',
        },*/
    ];
</script>

<style scoped>
    .donate-options {
        display: flex;
        justify-content: space-between;
    }
</style>