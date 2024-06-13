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
                <div @click="onModalClick(item)" class="modal__list__item">
                    <img :src="item.icon" alt="" />
                    <p :class="item.name === 'Сообщить о нарушении' && 'error-txt'" class="txt-body1">{{ item.name }}
                    </p>
                </div>
            </template>

        </div>
    </div>
</template>

<script setup lang="ts">
import msg_route from "~/assets/icons/msg_psuh.svg"
import block from "~/assets/icons/block.svg"
import complain from "~/assets/icons/coplain.svg"
import share from "~/assets/project_modal/share.svg"

import { postAddComplaint } from "~/API/ways/user" // Импорт функции отправки жалобы на сервер
import { defineEmits } from 'vue';

import { modalActionsList } from '~/helpers/types'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/store/user'

const user = useUserStore()
const router = useRouter()

const emit = defineEmits(['close'])

function onClickOutside() {
    user.userObj.topModalState = false
    emit('close')
}

function onModalClick(item) {
    user.userObj.topModalState = false;
    if (item.name === 'Сообщить о нарушении') {
        const complaintText = 'Сообщить о нарушении'; // Текст жалобы
        sendComplaint(complaintText);
    } else {
        router.push(item.route);
    }
}

async function sendComplaint() {
    try {
        const response = await postAddComplaint(19, 'some text');
        console.log('Жалоба успешно отправлена:', response);
        // Обработка успешного ответа...
    } catch (error) {
        console.error('Ошибка отправки жалобы:', error);
        // Обработка ошибки...
    }
}

const modalItems: modalActionsList[] = [
    {
        name: 'Написать сообщение',
        icon: msg_route,
        route: `/messenger/chat/${user.id}`,
    },
    {
        name: 'Поделиться этим профилем',
        icon: share,
        route: '/me/edit',
    },
    {
        name: 'Заблокировать',
        icon: block,
        route: '/me/edit',
    },
    {
        name: 'Сообщить о нарушении',
        icon: complain,
        route: '/me/edit'
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
