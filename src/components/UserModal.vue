<script lang="ts">
export default {
    name: 'TopModal',
}
</script>

<template>
    <div class="topModal" v-click-outside="onClickOutside">
        <!--  -->

        <div class="modal__list modalList">
            <template v-for="(item, id) in modalItems" :key="id">
                <div @click="onModalClick(item.route)" class="modal__list__item">
                    <img :src="`../src/assets/icons/${item.icon}.svg`" alt="" />
                    <p :class="item.name === 'Сообщить о нарушении' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                </div>
            </template>

        </div>
    </div>
</template>

<script setup lang="ts">

import UiShortProjectCard from './ui-kit/UiShortProjectCard.vue'

import { modalActionsList } from '~/helpers/types'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/store/user'

const user = useUserStore()
const router = useRouter()

function onClickOutside() {
    user.topModalState = false
}

function onModalClick(route: string) {
    user.topModalState = false
    router.push(route)
}

const modalItems: modalActionsList[] = [
    {
        name: 'Написать сообщение',
        icon: 'settings-blue',
        route: '/me/edit',
    },
    {
        name: 'Поделиться этим профилем',
        icon: 'account-blue',
        route: '/me/edit',
    },
    {
        name: 'Заблокировать',
        icon: 'subscribe-blue',
        route: '/me/edit',
    },
    {
        name: 'Сообщить о нарушении',
        icon: 'share-blue',
        route: '/me/edit    '
    },
]
</script>

<style lang="scss" scoped>
.topModal {
    position: fixed;
    background: $def-white;
    padding: 20px 25px;
    border-radius: 0px 0px 20px 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    top: $header-hight;
    z-index: 9999;
    width: 100%;
    animation: 0.3s show ease;
}

.modalList {
    margin-top: 24px;
}

@keyframes show {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
