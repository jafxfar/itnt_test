<template>
    <ChatFolders />
    <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-b-[1px]">
        <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between flex-1">
                <h1>1ddsdsdsdsd</h1>
                <div class="flex flex-row items-center gap-[6px]">
                    <h2>time</h2>
                    <img :src="send" alt="">
                </div>
            </div>
            <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                ipsa?
            </h1>
        </div>
    </div>
    <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-b-[1px]">
        <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between flex-1">
                <h1>1ddsdsdsdsd</h1>
                <div class="flex flex-row items-center gap-[6px]">
                    <h2>time</h2>
                    <img :src="delivered" alt="">
                </div>
            </div>
            <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                ipsa?
            </h1>
        </div>
    </div>
    <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-b-[1px]">
        <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between flex-1">
                <h1>1ddsdsdsdsd</h1>
                <div class="flex flex-row items-center gap-[6px]">
                    <h2>time</h2>
                    <img :src="seen" alt="">
                </div>
            </div>
            <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                ipsa?
            </h1>
        </div>
    </div>
    <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-b-[1px]">
        <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between flex-1">
                <h1>1ddsdsdsdsd</h1>
                <div class="flex flex-row items-center mr-2">
                    <h2>time</h2>
                    <img class='hidden' :src="seen" alt="">
                </div>
            </div>
            <h1>Lorem ipsum dolor sit amet, consectetur adipisicing,
                ipsa?
            </h1>
        </div>
    </div>
    <div class="absolute bottom-20 right-6 bg-marine  rounded-[12px]">
        <button @click="searchTeammateModal.open()" class="p-[10px]"><img :src="plus" alt=""></button>
        <vue-bottom-sheet ref="searchTeammateModal">
            <div class="searchTeammateModal modal">
                <p class="mb-2">Поиск человека для добавления в проект</p>
                <UiInput prepend-icon="magnify" label="Введите данные для поиска" v-model="searchQuery" />
                <div class="searchTeammateModal__items">
                    <div v-for="user in filteredUsers" :key="user.id" class="d-flex align-center"
                        @click="openUser(user.id)">
                        <img class="mr-3" width="37" height="37" src="../../assets/demo/ava-small-header.svg" />
                        <div>
                            <div class="d-flex align-center">
                                <p class="txt-body3">{{ user.id }}</p>
                            </div>
                            <p class="searchUserCard__head__subtitle txt-cap1">{{ user.login }}</p>
                        </div>

                    </div>
                </div>

            </div>
        </vue-bottom-sheet>
    </div>
</template>
<script setup lang="ts">
import send from '~/assets/chat/send.svg'
import seen from '~/assets/chat/seen.svg'
import delivered from '~/assets/chat/delivered.svg'
import ChatFolders from './ChatFolders.vue'
import plus from '~/assets/modal_icon/plus.svg'
// import { io } from "socket.io-client";
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import UiInput from '~/components/ui-kit/UiInput.vue'
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { getUserSearch } from '~/API/ways/user'
import { getDialog } from '~/API/ways/dialog';
const router = useRouter()
const openUser = (id) => {
    router.push(`/messenger/chat/${id}`);
};
const showDialog = async () => {
    try {
        const response = await getDialog();
        // console.log('response', response)
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
const searchTeammateModal = ref(null)
interface User {
    id: number;
    roles: Array<any>;
    login: string;
    confirmed: boolean;
    errorConfirm: boolean;
}
const users = ref<User[]>([]);
const searchQuery = ref('');
const filteredUsers = computed(() => {
    if (!Array.isArray(users.value)) {
        console.error('Users is not an array:', users.value);
        return [];
    }
    return users.value.filter(user => {
        const searchLower = searchQuery.value.toLowerCase();
        return Object.values(user).some(value =>
            String(value).toLowerCase().includes(searchLower)
        );
    });
});
const fetchUsers = async () => {
    try {
        const response = await getUserSearch();
        if (response.data && Array.isArray(response.data.object)) {
            users.value = response.data.object;
        } else {
            console.error('Fetched data is not in expected format:', response.data);
            users.value = [];
        }
        // console.log('Fetched users:', users.value);
    } catch (error) {
        console.error('Error fetching users:', error);
        users.value = [];
    }
};
onMounted(fetchUsers);
onMounted(showDialog);
</script>



<style scoped lang="scss">
h1 {
    color: var(--Background-OnBackground, #263238);
    font-size: 14px;
    font-style: medium;
    font-weight: 500;
    line-height: 18px;
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

p {
    font-size: 13px;
    font-style: normal;
    line-height: 14px;
    letter-spacing: 1%;
}

.searchTeammateModal {
    &__items {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        min-height: 350px;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 16px;
    }
}

</style>