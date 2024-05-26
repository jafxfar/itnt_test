<template>
    <!-- <div v-for="contact in contacts" :key="contact.id" @click="joinChat(contact.id)"
        class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-b-[1px]">
        <span class="border-[3px] w-[40px] h-[40px] border-chatSecond rounded-full"></span>
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between flex-1">
                <h1>{{ contact.name }}</h1>
                <h2>{{ contact.lastMessage }}</h2>
            </div>

            <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                ipsa?
            </h1>
        </div>
    </div> -->
    <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-b-[1px]" @click="handleClick">
        <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between flex-1">
                <h1>1ddsdsdsdsd</h1>
                <h2>time <span>seen</span></h2>
            </div>

            <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                ipsa?
            </h1>
        </div>
    </div>
    <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-b-[1px] ">
        <span class="border-[3px] w-[40px] h-[40px] border-chatSecond rounded-full"></span>
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between flex-1">
                <h1>Евгений Анисимов</h1>
                <h2>time <span>seen</span></h2>
            </div>

            <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                ipsa?
            </h1>
        </div>
    </div>
    <div class="absolute bottom-20 right-6 bg-marine  rounded-[12px]">
        <button @click="open" class="p-[10px]"><img src="@/assets/modal_icon/plus.svg" alt="">
        </button>
        <!-- <vue-bottom-sheet ref="myBottomSheet">
            <div class="flex flex-col justify-center mx-2 text-sm">
                <div class="flex flex-row justify-between itemc-center">
                    <h1 class="mt-1">Создание новой беседы</h1>
                    <button @click="close"><img src="@/assets/chatModal_close.svg"></button>
                </div>
                <div class="flex flex-row  mb-[24px] px-[8px] py-[8px] border-[1.6px] rounded-[6px] gap-[8px]">
                    <img src="@/assets/search_icon.svg" alt="">
                    <input class="w-full outline-none" placeholder="Введите данные для поиска" type="search" name="" id="">
                </div>
                <div class="mb-4">
                    <button class="bg-chatModal rounded-[20px] cursor-default">
                        <h3 class="px-3 py-1">Пользователи из ваших контактов:</h3>
                    </button>
                    <div class="ml-8 m-2 cursor-pointer" v-for=" contact  in  contacts.yourContacts " :key="contact.id"
                        @click="goToChat(contact)">
                        <h4>{{ contact.name }}</h4>
                        <h2>{{ contact.status }}</h2>
                    </div>
                </div>
                <div class="mb-4">
                    <button class="bg-chatModal rounded-[20px] cursor-default">
                        <h3 class="px-3 py-1">Взаимная подписка:</h3>
                    </button>
                    <div v-for=" contact  in  contacts.mutualSubscription " :key="contact.id" @click="goToChat(contact)"
                        class="cursor-pointer ml-8 m-2">
                        <h4>{{ contact.name }}</h4>
                        <h2>{{ contact.status }}</h2>
                    </div>
                </div>
                <div class="mb-4">
                    <button class="bg-chatModal rounded-[20px] cursor-default">
                        <h3 class="px-3 py-1">Вы подписаны</h3>
                    </button>
                    <div class="ml-8">
                        <div class="mb-4 mt-4 cursor-pointer">
                            <h4>Lorem, ipsum dolor.</h4>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                        <div class="mb-6 cursor-pointer">
                            <h4>Lorem, ipsum dolor.</h4>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <button class="bg-chatModal rounded-[20px] cursor-default">
                        <h3 class="px-3 py-1">Другие совпадениея</h3>
                    </button>
                    <div class="ml-8">
                    </div>
                </div>
            </div>
        </vue-bottom-sheet> -->
    </div>
</template>
<script setup>
import { io } from "socket.io-client";
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref } from "vue";
import { useRouter } from 'vue-router'
const router = useRouter()
const handleClick = () => {
    // Создание нового WebSocketHere are a few WebSocket servers that you can use for testing:
    router.push('/messenger/chat/:ID')
}



</script>



<style scoped>
h1 {
    color: var(--Background-OnBackground, #263238);
    /* font-family: Roboto; */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    /* 128.571% */
    letter-spacing: 0.14px;
    padding-left: 13px;
    padding-right: 13px;
}

h2 {
    color: var(--Optional-Optional2, #9E9E9E);

    /* Caption/Caption1 Roboto Regular */
    /* font-family: Roboto; */
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    /* 107.692% */
    letter-spacing: 0.13px;
}
</style>