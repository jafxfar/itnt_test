<template>
    <ChatFolders />
    <div class="" @click="showSheet = false">


        <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-gray-200 border-b-[1px]">
            <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
            <div class="flex flex-col flex-1">
                <div class="flex flex-row justify-between flex-1">
                    <h1>1ddsdsdsdsd</h1>
                    <div class="flex flex-row items-center gap-[6px]">
                        <img :src="send" alt="">
                        <h2>time</h2>
                    </div>
                </div>
                <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                    ipsa?
                </h1>
            </div>
        </div>
        <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-gray-200 border-b-[1px]">
            <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
            <div class="flex flex-col flex-1">
                <div class="flex flex-row justify-between flex-1">
                    <h1>1ddsdsdsdsd</h1>
                    <div class="flex flex-row items-center gap-[6px]">
                        <img :src="delivered" alt="">
                        <h2>time</h2>
                    </div>
                </div>
                <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                    ipsa?
                </h1>
            </div>
        </div>
        <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-gray-200 border-b-[1px]">
            <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
            <div class="flex flex-col flex-1">
                <div class="flex flex-row justify-between flex-1">
                    <h1>1ddsdsdsdsd</h1>
                    <div class="flex flex-row items-center gap-[6px]">
                        <img :src="seen" alt="">
                        <h2>time</h2>
                    </div>
                </div>
                <h1><span class="text-gray-400">Вы:</span>Lorem ipsum dolor sit amet, consectetur adipisicing,
                    ipsa?
                </h1>
            </div>
        </div>
        <div class="flex flex-row bg-white pl-[13px] pb-[13px] pt-[9px] pr-[6px] border-gray-200 border-b-[1px]">
            <span class="border-[3px] w-[40px] h-[40px] border-chatThird rounded-full"></span>
            <div class="flex flex-col flex-1">
                <div class="flex flex-row justify-between flex-1">
                    <h1>1ddsdsdsdsd</h1>
                    <div class="flex flex-row items-center">
                        <img class='hidden' :src="seen" alt="">
                        <h2>time</h2>
                    </div>
                </div>
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing,
                    ipsa?
                </h1>
            </div>
        </div>

    </div>

    <div class="absolute bottom-20 right-6 bg-marine  rounded-[12px]">
        <button @click="showSheet = true" class="p-[10px]"><img :src="plus" alt=""></button>
        <transition name="bottom-sheet">
            <div v-if="showSheet" style="overflow-y: auto;" class="bottom-sheet bg-white text-left"
                @click="showPopup = false">
                <div class="searchTeammateModal modal">
                    <h6 class="text mb-2">Создание новой беседы</h6>
                    <UiInput prepend-icon="magnify" label="Введите данные для поиска" v-model="searchQuery" />
                    <div class="searchTeammateModal__items">
                        <div v-for="user in filteredUsers" :key="user.id" class="d-flex align-center"
                            @click="() => handleUserClick(user.id)">
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
                <v-btn @click="showSheet = false" class="close-btn mr-2" icon="mdi-check" color="#00e676" />
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
import send from '~/assets/chat/send.svg'
import seen from '~/assets/chat/seen.svg'
import delivered from '~/assets/chat/delivered.svg'
import ChatFolders from './ChatFolders.vue'
import plus from '~/assets/modal_icon/plus.svg'
import UiInput from '~/components/ui-kit/UiInput.vue'
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { getUserSearch } from '~/API/ways/user'
import { getDialog, createDialog } from '~/API/ways/dialog';
const router = useRouter()
const showSheet = ref(false)

let showPopup = ref(false)
const openUser = (id: any) => {

    router.push(`/messenger/chat/${id}`);
};
const createDialogAPI = async () => {
    try {
        const response = await createDialog('GROPE', 1)
        console.log(response)
    }
    catch (error) {
        console.error('Error fetching users:', error);
    }
}
const handleUserClick = async (id: any) => {
    const dialogResponse = await createDialogAPI();
    openUser(id);
}
const showDialog = async () => {
    try {
        const response = await getDialog();
        // console.log('response', response)
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
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
.text {
    font-size: 16px;
    font-weight: 18px;
    color: 263238;
}

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