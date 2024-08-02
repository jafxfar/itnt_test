<template>
    <div class="">
        <Header showUserMinify :routeName="lastPart" :chat="true" />
        <!-- <div class="input px-2 pt-5 pb-0">
            <ChatInput :imgSrc="chat" :action="sendApiMessage" placeholder="Hey..." />
            <input type="text" @click="sendApiMessage">
        </div>
        <v-container class="chat-screen">
            <v-row justify="space-around d-flex flex-column">
                <v-card v-for="message in messages" :key="message.time" flat>
                    <v-list-item :key="message.time" v-if="message.from != 'You'" class="shadow-none">
                        <v-list-item-content class="received-message">
                            <v-card color="white" class="flex-none-sent">
                                <v-card-text class="white--text pa-2 d-flex flex-column">
                                    <span class="align-self-start text-subtitle-1">{{ message.message }}</span>
                                    <span class="text-caption font-italic align-self-end">{{ message.time }}</span>
                                </v-card-text>
                            </v-card>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-else :key="message.time">
                        <v-list-item-content class="sent-message justify-end">
                            <v-card color="#E1F5FE" class="flex-none">
                                <v-card-text class="white--text pa-2 d-flex flex-column">
                                    <span class="text-subtitle-1 chat-message">{{ message.message }}</span>
                                    <span class="text-caption align-self-end flex flex-row gap-2">{{ message.time }}<img
                                            :src="delivered" alt=""></span>
                                </v-card-text>
                            </v-card>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-row>
        </v-container> -->
        <div class="chat-container">
            <div class="date-container">
                <div class="date text-center rounded-xl d-inline-block">{{ $t('feed.today') }}</div>
            </div>
            <div class="messages-container">
                <div v-for="message in messagess" :key="message.id"
                    :class="['message', message.isMine ? 'my-message' : 'other-message']">
                    <div class="message-content">{{ message.text }}</div>
                    <div class="message-info">
                        <span class="message-time mr-1">{{ formatTime(message.timestamp) }}</span>
                        <span v-if="message.isMine" class="message-status">
                            <img :src="message.read ? delivered : chat" alt="">
                        </span>
                    </div>
                </div>
            </div>
            <div class="input-container">
                <div class="inner-input">
                    <input v-model="newMessage" @keyup.enter="sendMessages" placeholder="Type a message..." />
                    <button @click="sendMessages"><img :src="chat" alt=""></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { io } from '../../../node_modules/socket.io-client/build/esm/index';
import { sendMessage, getDialogByID } from '~/API/ways/dialog';
import { useRoute } from 'vue-router';
import chat from '../../assets/icons/chat.svg';
import ChatInput from '~/components/ui-kit/ChatInput.vue';
import Header from '~/components/Header.vue';
import delivered from '~/assets/chat/delivered.svg';

const messagess = ref([
    { id: 1, text: 'Привет! Слушай, тут в в обновлении статуса новых сообщений возникла какая-то ерунда, пока что в голову приходит только одно решение. Ставим в приоритет?', timestamp: '2024-08-01T10:00:00', isMine: false, read: true },
    { id: 2, text: 'Это не критично, давай через недельку вернёмся к этому вопросу 👍', timestamp: '2024-08-01T10:01:00', isMine: true, read: true },
    { id: 3, text: 'How are you?', timestamp: '2024-08-01T10:02:00', isMine: false, read: false },
]);

const newMessage = ref('');

const sendMessages = () => {
    if (newMessage.value.trim() !== '') {
        messages.value.push({
            id: Date.now(),
            text: newMessage.value,
            timestamp: new Date().toISOString(),
            isMine: true,
            read: false,
        });
        newMessage.value = '';
    }
};

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};
const route = useRoute();
const lastPart = ref(null);
const messages = ref([]);
const socket = ref(null);

const initializeSocket = () => {
    socket.value = io('ws://62.217.181.172:8080/user/5', {
        query: {
            userId: 1,
            dialogId: 9,
        },
    });
    // socket.value = io('http://62.217.181.172/dialog', {
    //     query: {
    //         userId: 1,
    //         dialogId: 9,
    //     },
    // });
    socket.value.on('connect', () => {
        console.log('Connected to the server.');
    });

    socket.value.on('disconnect', () => {
        console.log('Disconnected from the server.');
    });

    socket.value.on('message', (message) => {
        messages.value.push(message);
    });
};

const disconnectSocket = () => {
    if (socket.value) {
        socket.value.disconnect();
    }
};

onMounted(() => {
    initializeSocket();

    const fullPath = window.location.origin + route.fullPath;
    const parts = fullPath.split('/');
    lastPart.value = parts[parts.length - 1];
    showMessages();
});

onUnmounted(() => {
    disconnectSocket();
});

const showMessages = async () => {
    try {
        const response = await getDialogByID(lastPart.value);
        messages.value = response.data.messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

const sendApiMessage = async () => {
    const project = {
        messageText: 'sdsd',
        readStatus: true,
    };

    try {
        const response = await sendMessage(1, project);
        return response.data;
    } catch (error) {
        console.error('Failed to send message:', error);
    }
};
</script>

<style scoped lang="scss">
.v-application .v-card {
    box-shadow: none !important;
    background: none;
}

.v-application .v-list-item {
    box-shadow: none !important;
    background: none;
}

.v-application .v-card-text {
    box-shadow: none !important;
    background: none;
}

.chat-message {
    background: none;
    display: unset !important;
    white-space: break-spaces;
}

.chat-screen {
    height: calc(100vh - 140px);
    overflow-y: auto;
}

.sent-message {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.received-message {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
}

.flex-none {
    flex: unset;
    border: 1px solid rgba(133, 207, 171, 0.15);
    border-radius: 12px 12px 2px 12px;
}

.flex-none-sent {
    flex: unset;
    border: 1px solid rgba(133, 207, 171, 0.15);
    border-radius: 12px 12px 12px 2px;
}

.radius-sent {
    border-radius: 12px 2px 12px 12px;
}

.radius-recieved {
    border-radius: 12px 12px 12px 2px;
}

.input {
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 999;
    padding-top: 10px;
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

.chat-container {
    display: flex;
    flex-direction: column;
    height: auto;
}

.date-container {
    display: flex;
    justify-content: center;
    padding: 10px;
}

.messages-container {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.message {
    max-width: 100%;
    min-width: 10%;
    margin-bottom: 15px;
    padding: 10px;
    border: .1px solid #E0E0E0;
}

.my-message {
    border-radius: 12px 12px 2px 12px;
    background-color: #E1F5FE;
    align-self: flex-end;
}

.other-message {
    border-radius: 12px 12px 12px 2px;
    background-color: #ffffff;
    align-self: flex-start;
}

.message-info {
    font-size: 0.8em;
    color: #888;
    display: flex;
    justify-content: flex-end;
}

.input-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px;
    background-color: #ffffff;
}

.inner-input {
    border: 1px solid #ddd;
    outline-color: #29B6F6;
    flex: 1;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 12px;
}

.inner-input:focus-within {
    outline: 2px solid #29B6F6;
}

input {
    width: 100%;
    outline: none;
}

button {
    padding: 10px 0px;
    border: none;
    color: white;
}
</style>