<template>
    <Header showID showUserMinify />
    <div class="" v-show="pageStep === 1">
        <v-container style="margin-bottom: 48px">
            <div class="card">
                <h3 style="font-weight: 500;">Подключить кошелёк</h3>
                <div v-for="(item, index) in walletItems" :key="index" @click="pageStep += 1"
                    :class="['card__item', item.addClass]" :style="{ borderColor: item.color }">
                    <img :src="item.src" :alt="item.alt">
                    <p style="font-weight: 500;">{{ item.alt }}</p>
                </div>
                <div class="help">Мне нужна помощь</div>
            </div>
        </v-container>
    </div>
    <div class="scrollable-container p-[20px]" v-show="pageStep === 2">
        <v-pull-to-refresh class=" text-[#263238]" :pull-down-threshold="pullDownThreshold" @load="load">
            <div class="transaction-list text-[#263238]">
                <div class="transaction-card z-" v-for="(transaction, index) in transactions" :key="index">
                    <img :src="ava" class="transaction-icon" alt="icon">
                    <div class="transaction-details">
                        <p class="transaction-type">{{ transaction.type }}</p>
                        <p class="transaction-description">{{ transaction.description }}</p>
                    </div>
                    <div class="transaction-amount"
                        :class="{ 'positive': transaction.amount > 0, 'negative': transaction.amount < 0 }">
                        <p>{{ transaction.amount }} ETH</p>
                        <p class="text-[#9E9E9E]">{{ transaction.usdEquivalent }}</p>
                    </div>
                </div>
            </div>
            <div class="donation-block mt-4 p-[20px]  text-[#263238]">
                <div class="flex flex-row items-center mb-[42px]">
                    <img :src="ava" class="transaction-icon" alt="icon">
                    <div class="transaction-details">
                        <p class="transaction-type">Danger Flower</p>
                        <p class="text-[#263238]">9 марта 22г  в 17:33</p>
                    </div>
                    <div class="transaction-amount">
                        <p>-2 ETH</p>
                        <p class="text-[#9E9E9E]">~$5 459.88</p>
                    </div>
                </div>
                <div class="donation-info justify-center">
                    <img :src="update" alt="Danger Flower" class="icon">
                    <p>Вы отправили в проект Danger Flower пожертвование в размере <span class="span-text">2 ETH</span></p>
                </div>
                <div class="message">На развитие! Я в вас верю!</div>
                <UiButton bg-color="purple" class="mt-[50px]">Пожертвовать ещё</UiButton>
                <UiButton bg-color="def" class="mt-[15px]">Все мои операции с этим проектом</UiButton>
            </div>
            <v-container>
                <div class="cards">
                    <div class="z"> sdsdsdsd</div>
                    <div class="bg"></div>
                    <div class="blob"></div>
                </div>
            </v-container>
        </v-pull-to-refresh>
    </div>

</template>

<script setup lang="ts">
import update from "../../assets/vallet/update.svg"
import ava from "../../assets/demo/projectsmallphoto.svg"
import { ref } from 'vue'
import Header from '../../components/Header.vue'
import MazPullToRefresh from 'maz-ui/components/MazPullToRefresh'
import UiButton from "~/components/ui-kit/UiButton.vue"
// Images
import tonKeeper from '../../assets/vallet/tonkeeper.svg'
import metamask from '../../assets/vallet/metamask.svg'
import wallet from '../../assets/vallet/wallet-connect.svg'

const pageStep = ref(1)
const pullDownThreshold = 64

const walletItems = [
    { src: tonKeeper, alt: 'Tonkeeper', color: '#7BB3E3' },
    { src: metamask, alt: 'Metamask', color: '#F89D35' },
    { src: wallet, alt: 'Walletconnect', color: '#3B99FB', addClass: 'addClass' },
]
const transactions = ref([
    { type: 'Инвестиции', description: 'Отправка средств', amount: -2, usdEquivalent: '~$5,459.88' },
    { type: 'Инвестиции', description: 'Получение дивидендов', amount: 0.21, usdEquivalent: '$573.02' },
    { type: 'Краудинвестинг', description: 'Покупка акций', amount: -1.5, usdEquivalent: '~$3,869.15' }
])
const load = async ({ done }) => {
    console.log('loading')
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('load finish')
    done('ok')
}
</script>

<style scoped lang="scss">
.z {
    z-index: 99999;
}
.span-text{
   color: #800080;
}
.donation-block {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-radius: 12px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.project-name {
    font-weight: bold;
}

.donation-amount {
    color: #888;
}

.donation-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.upload-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.message {
    background-color: #fafafa;
    padding: 17px 22px;
    border-radius: 2px 12px 12px 12px;
    border:1px solid #E0E0E0;
}

.donate-more {
    background-color: #800080;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 10px;
}

.all-operations {
    text-align: center;
    color: #800080;
    text-decoration: underline;
}

* {
    -webkit-user-select: none;
    /* для Chrome, Safari, Opera */
    -moz-user-select: none;
    /* для Firefox */
    -ms-user-select: none;
    /* для Internet Explorer и Edge */
    user-select: none;
    /* стандартный синтаксис */
}

.scrollable-container {
    height: 100%;
    overflow-y: scroll;
}

.part1 {
    margin-bottom: 8px;
}

.card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &__item {
        margin: 12px;
        gap: 24px;
        padding: 16px 16px 16px 24px;
        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px solid #7BB3E3;
        border-radius: 12px;
    }
}

.help {
    color: #29B6F6;
    font-weight: 400;
    cursor: pointer;
}

.addClass {
    margin-bottom: 20px;
}

.transaction-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
}

.transaction-card {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    position: relative;
    overflow: hidden;
}

.transaction-card::before,
.transaction-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    pointer-events: none;
}

.transaction-card::before {
    border: 1px solid rgba(138, 43, 226, 0.5);
    /* Фиолетовая граница с полупрозрачностью */
    z-index: 1;
}

.transaction-card::after {
    border: 1px solid rgba(255, 255, 255, 0.8);
    /* Белая граница с полупрозрачностью */
    z-index: 2;
    transform: scale(1.05);
    /* Немного увеличиваем, чтобы создать эффект двойной границы */
}

.transaction-icon {
    width: 40px;
    height: 40px;
    margin-right: 16px;
}

.transaction-details {
    flex-grow: 1;
}

.transaction-type {
    font-weight: 500;
}

.transaction-description {
    color: #9E9E9E;
}

.transaction-amount {
    text-align: right;
}

.transaction-amount.positive p:first-of-type {
    color: #4CAF50;
}

.transaction-amount.negative p:first-of-type {
    color: #F44336;
}

.cards {
    position: relative;
    width: 100%;
    height: 150px;
    border-radius: 14px;
    z-index: 1111;
    overflow: hidden;
    display: flex;
    padding: 10px;
    // flex-direction: column;
    align-items: center;
    // justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bg {
    position: absolute;
    top: 2.5px;
    left: 3.2px;
    width: 99.7%;
    height: 96.1%;
    z-index: 2;
    background: rgba(255, 255, 255, .95);
    backdrop-filter: blur(24px);
    border-radius: 12.1px;
    overflow: hidden;
    outline: 2px solid white;
}

.blob {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 150px;
    border-radius: 50%;
    background-color: rgba(138, 43, 226, 0.5);
    opacity: 1;
    filter: blur(12px);
    animation: blob-bounce 5s infinite ease;
}

@keyframes blob-bounce {
    0% {
        transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }

    25% {
        transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }

    50% {
        transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }

    75% {
        transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }

    100% {
        transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
}
</style>