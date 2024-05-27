<script lang="ts">
export default {
    name: 'ProjectHeader',
}
</script>

<template>
    <div class="projectHeader">
        <!-- TODO: READONLY PROJECT PICTURE -->
        <div v-if="props.readOnly || props.commentText" class="">
            <img style="width: 100%; height:fit-content;" src="../../assets/demo/project-head.svg" />
            <img :src="prjAva" class=" m-8 p-8" />
        </div>
        <div class="back w-full" v-else>
            <div style="display: flex; align-items: start" class="rounded-circle mx-auto mt-6">
                <v-file-input @change="uploadImage" height="200" accept="image/png, image/jpeg, image/bmp"
                    class="input-file">
                </v-file-input>
                <img v-if="!prjAva" src="../../assets/img/regSteps/addProfilePic.svg" class="rounded-circle mx-auto"
                    height="208" width="208" />
                <img v-else :src="prjAva" class="rounded-circle " height="208" width="208" />
            </div>
        </div>

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
                    <UiButton bgColor="blue" @click="follow" style="max-width: 152px">{{ isFollowing ? 'Подписан' :
            'Подписаться' }}</UiButton>
                    <UiButton @click="shareProject()" :imgSrc="share" onlyIcon />
                    <Fire :id="props.prjID" />
                </div>
                <UiButton @click="$router.push('/project/' + props.prjID + '/comment')" bgColor="def" :imgSrc="message">
                    Обсуждение проекта</UiButton>
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
        <div class="projectHeader__edit" v-if="!props.commentText && !props.readOnly">
            <UiInput label="Название проекта*" v-model="prjObject.name" :required="true" />
            <UiInput label="Слоган" v-model="prjObject.slogan" :required="true" />
            <UiInput label="id проекта" v-model="prjObject.nickName" :required="true" />
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
import { addProjectAvatar, addFollow } from '~/API/ways/project.ts';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useProjectStore } from '~/store/projectStore'
import { getUserNotifications, getProjectPropositions, getUserProjectPropositions, getUserPropositions } from "~/API/ways/notifications"
import { onMounted } from "vue"
const route = useRoute()
const { prjObject } = storeToRefs(useProjectStore())
// const onlyENGletters = computed(() => {
//     var reg = /^[a-z]+$/i
//     return '+' + prjObject.nickName.match(reg)[0]
// })
// const getUserProp = async () => {
//     try {
//         const response = await getUserPropositions(Number(localStorage.getItem("userId")))
//         console.log(response)
//     } catch (error) {
//         console.error('Ошибка при получении предложений пользователя:', error)
//     }
// }
// const getUserProp = async () => {
//     try {
//         const response = await getProjectPropositions(route.params.ID)
//         console.log(response ,"getProjectPropositions")
//     } catch (error) {
//         console.error('Ошибка при получении предложений пользователя:', error)
//     }
// }
// const getUserProjectProp = async () => {
//     try {
//         const response = await getUserProjectPropositions(route.params.ID, localStorage.getItem("userId"))
//         console.log(response ,"getUserProjectPropositions")
//     } catch (error) {
//         console.error('Ошибка при получении предложений пользователя:', error)
//     }
// }
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
    prjAva: {
        type: String,
    }

})

let prjAva = ref(props.prjAva)
async function uploadImage(e: any) {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    try {
        const response = await addProjectAvatar(formData,Number(route.params.ID), )
        prjAva.value = URL.createObjectURL(file)
        console.log(response)
    } catch (error) {
        console.error('Ошибка при загрузке аватара проекта:', error)
    }
}

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
        const response = await addFollow(Number(props.prjID), Number(localStorage.getItem("userId")));
        console.log(response);
        isFollowing.value = true
    } catch (error) {
        console.error('Ошибка при подписке на проект:', error);
    }
}
// onMounted(() => {
//     getUserProp(),getUserProjectProp()
// })
</script>

<style lang="scss" scoped>
.projectHeader {
    width: 100%;
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

.back {
    width: 100%;
    background-image: url('../../assets/demo/project-head.svg');
    height: fit-content;
}

.input-file {
    min-width: 208px;
    min-height: 220px;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -12%);
    position: absolute;
    opacity: 0;
}
</style>
