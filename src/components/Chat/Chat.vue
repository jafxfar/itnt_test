<template>
    <div class="">
        <Header showUserMinify :routeName="lastPart" :chat="true" />
        <div class="input px-2 pt-5 pb-0">
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
                                    <!-- <span class="text-caption">{{ message.from }} </span> -->
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
                                    <span class="text-caption align-self-end flex flex-row gap-2">{{ message.time }}<img :src="delivered" alt=""></span>
                                </v-card-text>
                            </v-card>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import chat from "../../assets/icons/chat.svg";
import ChatInput from '~/components/ui-kit/ChatInput.vue';
import send from '~/assets/chat/send.svg';
import seen from '~/assets/chat/seen.svg';
import delivered from '~/assets/chat/delivered.svg';
import Header from "~/components/Header.vue";
import { ref, onMounted, onUnmounted } from "vue";
import {io} from "socket.io-client";
import { sendMessage } from '~/API/ways/dialog';
import { getDialogByID } from "~/API/ways/dialog";
import { useRoute } from "vue-router";

const route = useRoute();
const lastPart = ref(null);
const messages = ref([
    {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
    },
    {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
    },
    {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
    },
    {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
    },
    {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
    },
    {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
    },
    {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
    },
]);
const socket = io('http://62.217.181.172/dialog');
const initializeSocket = () => {
  socket.value = io('http://62.217.181.172/dialog', {
    query: {
      userId: 1,
      dialogId: 9,
    },
  });

  socket.value.on('connect', () => {
    console.log('Connected to the server.');
  });

  socket.value.on('disconnect', () => {
    console.log('Disconnected from the server.');
  });
};

onMounted(() => {
  initializeSocket();
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
  }
});

onMounted(() => {
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
        console.log('response', response);
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
        // socket.emit('send_message', project);
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
</style>