<template>
    <div class="">
        <Header showUserMinify :routeName="lastPart" :chat="true" />
        <div class="messages">
            <div class="messages__message">
                <div class="flex justify-center">
                    <div class="date mb-4 rounded-xl d-inline-block ">{{ $t('feed.today') }}</div>
                </div>
                <div class="messages__message__you">
                    <p class="text">Полундра! Вчера я был пъян. Баг нужно исправлять срочно! Top Priority 🔥</p>
                    <div class="messages__info">
                        12:22 <img :src="seen" alt="">
                    </div>
                </div>
                <div class="messages__message__you">
                    <p class="text">Полундра! Вчера я был пъян. Баг нужно исправлять срочно! Top Priority 🔥</p>
                    <div class="messages__info">
                        12:22 <img :src="delivered" alt="">
                    </div>
                </div>
                <div class="messages__message__you">
                    <p class="text">Полундра! Вчера я был пъян. Баг нужно исправлять срочно! Top Priority 🔥</p>
                    <div class="messages__info">
                        12:22 <img :src="send" alt="">
                    </div>
                </div>
                <div class="messages__message__other">
                    <p class="text">Полундра! Вчера я был пъян. Баг нужно исправлять срочно! Top Priority 🔥</p>
                    <div class="messages__info">
                        12:22
                    </div>
                </div>
            </div>

        </div>
        <!-- <div v-for="(messageContent, index) in messageList" :key="index" class="py-[10px] px-[15px] m-[16px]"
            :class="['message ', { 'you': username === messageContent.author, 'other': username !== messageContent.author }]">
            <div clыыass="flex justify-center">
                <p>{{ messageContent.message }}</p>
            </div>
            <div class="message-meta flex justify-end">
                <p class="time">{{ messageContent.time }}</p>
            </div>
        </div> -->
        <div class="input">
            <div class="input-container">
                <input class="pl-[16px] outline-none w-full" type="text" v-model="currentMessage" placeholder="Hey..."
                    @keypress.enter="sendApiMessage">
                <button @click="sendApiMessage" class="cursor pointer py-[9px] pr-[13px]">
                    <img src="../../assets/icons/chat.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import send from '~/assets/chat/send.svg'
import seen from '~/assets/chat/seen.svg'
import delivered from '~/assets/chat/delivered.svg'
import Header from "~/components/Header.vue";
import { ref, onMounted } from "vue";
// import { io } from "socket.io-client";
import { sendMessage } from '~/API/ways/dialog'
import { getDialogByID } from "~/API/ways/dialog";
import { useRoute } from "vue-router";
const route = useRoute();
const lastPart = ref(null);

onMounted(() => {
    const fullPath = window.location.origin + route.fullPath;
    const parts = fullPath.split('/');
    lastPart.value = parts[parts.length - 1];
});
const showMessages = async () => {
    try {
        const response = await getDialogByID(lastPart.value);
        console.log('response', response)
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
// let socket;
// let currentMessage = ref('');
// let messageList = ref([]); // Объявите messageList как реактивное свойство

// onMounted(() => {
//     socket = io("http://localhost:8080")

//     socket.on('connect', () => {
//         console.log('Connected to the server.')
//     })

//     socket.on('receive_message', (data) => {
//         console.log('Message from server: ', data)
//         messageList.value.push(data);
//     })
// })

const sendApiMessage = async () => {
    const dialog = {
        messageText: currentMessage.value,
        readStatus: true,
    };

    try {
        const response = await sendMessage(1, dialog);
        return response.data;
    } catch (error) {
        console.error('Failed to send message:', error);
    }
}
onMounted(showMessages);
</script>

<style scoped lang="scss">
.text{
    padding:10px 15px;
}
.messages {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100vh - 140px);
    overflow-y: auto;

    &__info {
        color: #9E9E9E;
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: flex-end;
        padding-bottom:4px;
        padding-right:8px;

    }

    &__message {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 16px;
        gap: 16px;

        &__you {;
            // width:100px;
            border-radius: 12px 12px 2px 12px;
            border: 1px solid rgba(133, 207, 171, 0.15);
            background: var(--Primary-Variant2, #E1F5FE);
        }

        &__other {
            // padding: 10px 15px;
            border-radius: 12px 12px 12px 2px;
            border: 1px solid rgba(224, 224, 224, 0.80);
            background: var(--Background-Surface, #FFF);
        }

    }


}

.input {
    position: absolute;
    bottom: 1px;
    left: 0;
    right: 0;
    background-color: white;
    padding: 10px;

    .input-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        margin-bottom: 10px;
        padding: 10px;

        input {
            width: 100%;
            outline: none;
        }
    }
}
.date {
    display: flex;
    justify-content: center;
    width: 100px;
    background: rgba(224, 224, 224, 0.5);
    font-size: 13px !important;
    letter-spacing: 0.01em !important;
    padding: 6px 20px;
    line-height: 14px;
}
</style>