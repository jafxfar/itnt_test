<script lang="ts">
export default {
    name: 'Header',
}
</script>

<template>
    <v-app-bar class="px-4" :elevation="0" height="46" color="white">
        <v-icon class="mr-3" @click="$router.back()" icon="mdi-arrow-left" />

        <img v-show="props.showLogo" :src="user.pictureUrl" />

        <h2 @click="copyID" v-show="props.showID">{{ chosenId }}</h2>

        <h2 v-show="props.routeName">{{ props.routeName }}</h2>
        <v-spacer v-if="search === false" />

        <img @click="toggleTopModal" style="padding: 10px" v-if="props.showUserMinify === true"
            :src="user.userObj.pictureUrl" />

        <img @click="toggleUserModal" style="padding: 10px" v-if="props.showControlDots" :src="dots" />
        <img @click="toggleProjectModal" style="padding: 10px" v-if="props.showControlDotsProject" :src="dots" />

        <img @click="modalState.open()" style="padding: 10px" v-if="props.chat" :src="dots" />
        <vue-bottom-sheet ref="modalState">
            <div class="searchTeammateModal modal">
                <div class="modal__list">
                    <div class="modal__list__item">
                        <img :src="plus" alt="" />
                        <p class="txt-body1" @click="invite.open()">
                            Пригласить в проект
                        </p>
                    </div>
                    <div class="modal__list__item">
                        <img :src="complain" alt="" />
                        <p class="txt-body1 text-[#FF3D00]" @click="chat.open()">
                            Пожаловаться
                        </p>
                    </div>
                </div>

            </div>
        </vue-bottom-sheet>
        <vue-bottom-sheet ref="invite">
            <div class="searchTeammateModal modal">
                <p class="mb-2">Выберите проект, в который хотите пригласить участника:</p>
                <div class="searchTeammateModal__items">
                    <div v-for="(project, idx) in followed" :key="idx" class="gap-2">
                        <input type="radio" name="project" id="">{{ project.project.name }}
                    </div>
                    <UiTextArea v-model="props.textarea" />
                    <UiButton bg-color="blue" @click="sendProp" >Отправить приглашение</UiButton>
                </div>
            </div>
        </vue-bottom-sheet>
        <vue-bottom-sheet ref="chat">
            <div class="searchTeammateModal modal">
                <p class="mb-2">Выберите причину жалобы на пользователя:</p>
                <div class="searchTeammateModal__item">
                    <input type="radio" name="complaint" id=""> Спам
                </div>
                <div class="searchTeammateModal__item">
                    <input type="radio" name="complaint" id=""> Агрессивное поведение
                </div>
                <div class="searchTeammateModal__item">
                    <input type="radio" name="complaint" id=""> Взрослый контент (ссылки, картинки, видео и т.п.)
                </div>
                <UiTextArea v-model="complaint"/>
                <UiButton bg-color="blue" @click="sendComplaint">Отправить жалобу</UiButton>
            </div>
        </vue-bottom-sheet>
        <div v-if="props.search" class="d-flex w-full align-center">
            <!-- <UiInput noStyle v-model="searchBarValue" /> -->
            <v-spacer />
            <v-icon icon="mdi-magnify" />
        </div>
    </v-app-bar>
    <UserModal v-if="user.userObj.userModalState === true" />

    <TopModal v-if="user.userObj.topModalState === true" />
</template>

<script lang="ts" setup>
import complain from '../assets/icons/warning-red.svg'
import plus from '../assets/project_modal/plus.svg'
import dots from "~/assets/icons/dots-black.svg"
import UserModal from './UserModal.vue'
import TopModal from './TopModal.vue'
import UiButton from "./ui-kit/UiButton.vue"
// import UiInput from './ui-kit/UiInput.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
// import { storeToRefs } from 'pinia'
import UiTextArea from "./ui-kit/UiTextArea.vue"
import { useRoute } from 'vue-router'
import { useUserStore } from '~/store/user'
import { ref, computed, onMounted } from 'vue'
import { getUserByID, postAddComplaint } from '~/API/ways/user'
import { sendProposition } from '~/API/ways/notifications'
const lastPart = ref(null);
const router = useRoute()

onMounted(() => {
    const fullPath = window.location.origin + router.fullPath;
    const parts = fullPath.split('/');
    lastPart.value = parts[parts.length - 1];
});
const modalState = ref(null)
const chat = ref(null)
const invite = ref(null)
const user = useUserStore()
const me: modalActionsList[] = [
    {
        name: 'Удалить запись',
        icon: 'account',
    },
    {
        name: 'Редактировать',
        icon: 'account',
    }
]
const sendProp = async () => {
    await sendProposition(1, 1,1,'dd',"PROJECT_TO_USER")
}
const complaint = ref('')
const sendComplaint = async () => {
    await postAddComplaint(lastPart.value, localStorage.getItem('userId'), complaint.value,)
}
const props = defineProps({
    showLogo: {
        type: Boolean,
        default: false,
    },
    showID: {
        type: Boolean,
        default: false,
    },
    showUserMinify: {
        type: Boolean,
        default: false,
    },
    showControlDots: {
        type: Boolean,
        default: false,
    },
    showControlDotsProject: {
        type: Boolean,
        default: false,
    },
    search: {
        type: Boolean,
        default: false,
    },
    routeName: {
        type: String,
        default: '',
    },
    chat: {
        type: Boolean,
        default: false,
    }
})
let data = ref({})
let followed = ref([])
onMounted(async () => {
    await getUserByID(Number(localStorage.getItem("userId"))).then((response) => {
        try {
            data.value = response.data.object
            console.log('Full data:', data.value)

            if (Array.isArray(data.value.projects)) {
                data.value.projects.forEach((project, index) => {
                    // console.log(`Project ${index}:`, project)
                })

                followed.value = data.value.projects.filter(project => project.relationType === 'PROJECT_OWNER')
                // console.log('Followed projects:', followed.value)
            } else {
                // console.warn('Expected projects to be an array, but got:', data.value.projects)
            }
        } catch (e) {
            console.error('Error:', e)
        }
    })
})

function toggleTopModal() {
    user.userObj.topModalState = !user.userObj.topModalState
}
function toggleUserModal() {
    user.userObj.userModalState = !user.userObj.userModalState
}
function toggleProjectModal() {
    user.userObj.userModalState = !user.userObj.userModalState
}
const chosenId = computed(() => {
    return '@' + (router.params.ID ? router.params.ID : localStorage.getItem('userId'))
})

function copyID() {
    navigator.clipboard.writeText(chosenId.value)
}
</script>

<style scoped lang="scss">
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