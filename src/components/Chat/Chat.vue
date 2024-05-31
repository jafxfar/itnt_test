<template>
    <div class="flex flex-col items-stretch">
        <Header showUserMinify :routeName="'s'" />
        <div v-for="(messageContent, index) in messageList" :key="index" class="py-[10px] px-[15px] m-[16px]"
            :class="['message ', { 'you': username === messageContent.author, 'other': username !== messageContent.author }]">
            <div clыыass="flex justify-center">
                <p>{{ messageContent.message }}</p>
            </div>
            <div class="message-meta flex justify-end">
                <p class="time">{{ messageContent.time }}</p>
                <!-- <p class="author">{{ messageContent.author }}</p> -->
            </div>
        </div>
        <div class="input">
            <div class="input-container">
                <input class="pl-[16px] outline-none w-full" type="text" v-model="currentMessage" placeholder="Hey..."
                    @keypress.enter="sendMessage(currentMessage)">
                <button @click="sendMessage(currentMessage)" class="cursor pointer py-[9px] pr-[13px]">
                    <img src="../../assets/icons/chat.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import { ref, onMounted } from "vue";
import { io } from "socket.io-client";
import { sendMessage as sendApiMessage } from '~/API/ways/dialog'
import { getDialogByID} from "~/API/ways/dialog";
const showMessages = async () => {
    try {
        const response = await getDialogByID(1);
        console.log('response', response)
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
let socket;
let currentMessage = ref('');
let messageList = ref([]); // Объявите messageList как реактивное свойство

onMounted(() => {
    socket = io("http://localhost:8080")

    socket.on('connect', () => {
        console.log('Connected to the server.')
    })

    socket.on('receive_message', (data) => {
        console.log('Message from server: ', data)
        messageList.value.push(data);
    })
})

const sendMessage = async (message) => {
    const dialogId = 123;
    const messageBody = {
        "dialog": {
            "dialogType": "GROPE",
            "id": dialogId,
            "users": [
                {
                    "id": 0,
                    "login": "string",
                    "roles": [
                        "string"
                    ]
                }

            ]
        },
        "id": 0,
        "messageDate": new Date().toISOString(),
        "messageText": message,
        "readStatus": true,
        "user": {
            "id": 0,
            "login": "string",
            "roles": [
                "string"
            ]
        }
    }

    try {
        await sendApiMessage(dialogId, messageBody);
        currentMessage.value = '';
    } catch (error) {
        console.error('Failed to send message:', error);
    }
}
onMounted(showMessages);
</script>

<style scoped lang="scss">
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

.message.you {

    border-radius: 12px 12px 2px 12px;
    border: 1px solid rgba(133, 207, 171, 0.15);
    background: var(--Primary-Variant2, #E1F5FE);
}

.message.other {
    border-radius: 12px 12px 12px 2px;
    border: 1px solid rgba(224, 224, 224, 0.80);
    background: var(--Background-Surface, #FFF);
}
</style>