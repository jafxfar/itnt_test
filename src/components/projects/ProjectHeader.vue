<script lang="ts">
export default {
    name: 'ProjectHeader',
}
</script>

<template>
    <div class="projectHeader">
        <!-- TODO: READONLY PROJECT PICTURE -->
        <img style="width: 100%; height:fit-content;" src="../../assets/demo/project-head.svg" />

        <!-- READONLY -->
        <div class="projectHeader__container" v-if="props.readOnly">
            <div class="mt-5 mb-7">
                <div class="d-flex justify-space-between">
                    <h2>{{ props.prjName }}</h2>
                    <div v-show="props.prjType" class="projectHeader__capital txt-body1">{{ props.prjType }}</div>
                </div>
                <p class="txt-body1">{{ props?.prjSlogan }}</p>
            </div>
            <div class="projectHeader__controls">
                <div class="d-flex justify-space-between mb-4">
                    <UiButton bgColor="blue" @click="follow" style="max-width: 152px">{{ isFollowing ? 'Подписан' : 'Подписаться' }}</UiButton>
                    <UiButton @click="shareProject()" :imgSrc="share" onlyIcon />
                    <Fire :id="props.prjID" />
                </div>
                <UiButton @click="$router.push('/project/' + props.prjID + '/comment')" bgColor="def" :imgSrc="message">Обсуждение проекта</UiButton>
            </div>
        </div>

        <!-- comment page -->
        <div v-if="props.commentText" class="">
            <div class="mt-5 mb-7 mx-4">
                <div class="d-flex justify-space-between">
                    <h2>{{ props.prjName }}</h2>
                    <div v-show="props.prjType" class="projectHeader__capital txt-body1">{{ props.prjType }}</div>
                </div>
                <p class="txt-body1">{{ props?.prjSlogan }}</p>
            </div>
        </div>
        
        <!-- EDITABLE -->
        <div class="projectHeader__edit" v-if="!props.commentText && !props.readOnly" >
            <UiInput label="Название проекта*" v-model="prjObject.name" />
            <UiInput label="Слоган" v-model="prjObject.slogan" />
            <UiInput label="id проекта" v-model="prjObject.nickName" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import message from "~/assets/icons/message-black.svg"
import share from "~/assets/icons/share-black.svg"
import { ref } from 'vue'
import Fire from '../Fire.vue'
import UiButton from '../ui-kit/UiButton.vue'
import UiInput from '../ui-kit/UiInput.vue'
import { addFollow } from '~/API/ways/project'
import { addComment } from '~/API/ways/project'; // Импортируйте addComment

import { storeToRefs } from 'pinia'
import { useProjectStore } from '~/store/projectStore'
import {useUserStore} from '~/store/user'
const commentText = ref(''); // Для хранения текста комментария, если нужно
const userStore = useUserStore()
const { prjObject } = storeToRefs(useProjectStore())
// const onlyENGletters = computed(() => {
//     var reg = /^[a-z]+$/i
//     return '+' + prjObject.nickName.match(reg)[0]
// })

const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    commentText: {
        type: Boolean,
        default: false,
    },
    prjName: {
        type: String,
    },
    prjSlogan: {
        type: String,
    },
    prjType: {
        type: String,
    },
    prjID: {
        type: Number,
    },
    id: {
        type: Number,
    },
})

function shareProject() {
    try {
        navigator.share({
            title: 'ITNT',
            text: 'Откройте для себя ITNT.',
            url: 'http://62.113.105.220/',
        })
    } catch (error) {
        console.log('error :' + error)
    }
}
const isFollowing = ref(false) 

async function follow() {
    try {
        const response = await addFollow(props.prjID, props.id);
        isFollowing.value = true 
    } catch (error) {
        console.error('Ошибка при подписке на проект:', error);
    }
}
async function handleAddComment() {
    try {
        const response = await addComment(props.prjID, commentText.value);
        console.log('Комментарий добавлен:', response);
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
    }
}
</script>

<style lang="scss" scoped>
.projectHeader {
    padding-top: 18px;
    &__container {
        padding: 20px;
    }
    &__edit {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
    }
    &__capital {
        padding: 5px 15px;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        background: $def-white;
    }
}
</style>
