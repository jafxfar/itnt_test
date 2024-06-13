<script lang="ts">
export default {
    name: 'TopModal',
}
</script>

<template>
    <div class="topModal" v-click-outside="onClickOutside">
        <!--  -->
        <UiShortProjectCard />

        <div class="modal__list modalList">
            <template v-for="(item, id) in modalItems" :key="id">
                <div @click="onModalClick(item.route)" class="modal__list__item">
                    <img :src="item.icon" alt="" />
                    <p :class="item.name === 'Выйти из аккаунта' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                </div>
            </template>

        </div>
    </div>
</template>

<script setup lang="ts">

import UiShortProjectCard from './ui-kit/UiShortProjectCard.vue'
import settings from "~/assets/icons/settings-blue.svg";
import account from "~/assets/icons/account-blue.svg";
import subscribe from "~/assets/icons/subscribe-blue.svg";
import share from "~/assets/icons/share-blue.svg";
import warning from "~/assets/icons/warning-red.svg";

import { modalActionsList } from '~/helpers/types'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/store/user'
import {defineEmits } from 'vue';

const user = useUserStore()
const router = useRouter()

const emit = defineEmits(['close'])

function onClickOutside() {
    user.userObj.topModalState = false
    emit('close')
}

function onModalClick(route: string) {
    user.userObj.topModalState = false
    router.push(route)
}

const modalItems: modalActionsList[] = [
    {
        name: 'Настройки аккаунта',
        icon: settings,
        route: '/me/settings',
    },
    {
        name: 'Редактировать мой профиль',
        icon: account,
        route: '/me/edit',
    },
    {
        name: 'Мои подписки',
        icon: subscribe,
        route: '/me/followed',
    },
    {
        name: 'Поделиться',
        icon: share,
        route: '/me/edit',
    },
    {
        name: 'Выйти из аккаунта',
        icon: warning,
        func: () => {
            try {
                localStorage.clear()
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        },
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
