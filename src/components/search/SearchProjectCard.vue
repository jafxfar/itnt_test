<template>
    <div class="searchProjectCard mt-4">
        <div class="searchProjectCard__head">
            <div class="d-flex align-center">
                <img @click="$router.push('/project/' + props.projectInfoSet.id)" class="mr-3 cursor-pointer" width="37"
                    height="37" src="../../assets/demo/ava-small-header.svg" />
                <div>
                    <div @click="$router.push('/project/' + props.projectInfoSet.id)"
                        class="d-flex cursor-pointer align-center">
                        <p class="txt-body3">{{ props.projectInfoSet.name }}</p>
                    </div>
                    <p class="searchProjectCard__head__subtitle txt-cap1">
                        {{ props.projectInfoSet.slogan }}
                    </p>
                </div>
            </div>
            <v-icon @click="modalState.open()" icon="mdi-dots-vertical" color="#263238" class="font-weight-bold" />
        </div>

        <div class="searchProjectCard__body">
            <div class="searchProjectCard__body__slider">
                <img width="85" height="122" v-for="i in 5" src="../../assets/demo/demo-rec1.png" />
            </div>

            <div class="searchProjectCard__body__info">
                <p class="searchProjectCard__body__info__title txt-body1">{{ props?.projectInfoSet.descHeader }}</p>
                <p class="searchProjectCard__body_info__sub txt-body2">
                    {{ props?.projectInfoSet.desc }}
                </p>
            </div>
        </div>

        <div class="searchProjectCard__footer">
            <UiButton bgColor="def" class="searchProjectCard__footer__button" fit
                @click="$router.push('/project/' + props.projectInfoSet.id)">Открыть проект
            </UiButton>
            <UiButton @click="shareProject" bgColor="def" :imgSrc="share" style="padding: 10px 13px 9px 14px"
                onlyIcon />
        </div>
        <vue-bottom-sheet max-height="270px" full-screen ref="modalState">
            <div class="modal">
                <div class="modal__list">
                    <div v-for="(item, id) in modalItems" @click="item?.func" :key="id" class="modal__list__item">
                        <img :src="item.icon" alt="" />
                        <p v-on:click.native="item.name === 'Пожаловаться' ? complainState.open() : null"
                            :class="{ 'error-txt': item.name === 'Пожаловаться' }" class="txt-body1">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </div>
        </vue-bottom-sheet>
        <vue-bottom-sheet max-height="480px" full-screen ref="complainState">
            <div class="searchTeammateModal modal">
                <p class="mb-[24px]">Выберите причину жалобы на пользователя:</p>
                <div class="d-flex align-center mb-[24px]">
                    <img @click="$router.push('/user/' + props.projectInfoSet.id)" class="mr-3 cursor-pointer" width="37"
                        height="37" src="../../assets/demo/ava-small-header.svg" />
                    <div>
                        <div class="d-flex cursor-pointer align-center">
                            <p class="txt-body3">{{ props.projectInfoSet.name }}</p>
                        </div>
                    </div>
                </div>
                <v-radio-group v-model="complaint" color="#29b6f6">
                    <v-radio class="mb-[20px]" base-color="#29b6f6" label="Спам" value="Спам"></v-radio>
                    <v-radio class="mb-[20px]" base-color="#29b6f6" label="Агрессивное поведение"
                        value="Агрессивное поведение"></v-radio>
                    <v-radio class="mb-[20px]" base-color="#29b6f6"
                        label="Взрослый контент (ссылки, картинки, видео и т.п.)" value="Взрослый контент"></v-radio>
                </v-radio-group>
                <UiButton bg-color="blue" @click="sendComplaint">Отправить жалобу</UiButton>
            </div>
        </vue-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import UiButton from '../ui-kit/UiButton.vue'
import project from "~/assets/project_modal/project.svg"
import share from "~/assets/icons/share-blue.svg"
import warning from "~/assets/icons/warning-red.svg"
import UiTextArea from "~/components/ui-kit/UiTextArea.vue"
// import statistic from "~/assets/modal_icon/statistic.svg"
import follow from "~/assets/modal_icon/follow.svg"
import { ref, computed } from 'vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { modalActionsList } from '~/helpers/types'
import { addFollow, addComplaint } from "~/API/ways/project"
import { useRouter } from 'vue-router'
const modalState = ref(false)
const complainState = ref(false)

// const props = defineProps({
//     project: Object,
//     desc: String,
//     descHeader: String,
//     name: String,
//     slogan: String,
//     type: String,
//     id: Number
// })
const props = defineProps({
    projectInfoSet: {
        type: Object || Array,
        default: () => { },
    },
    listID: {
        type: Number,
    },
})
const router = useRouter()
const complaint = ref('')

const sendComplaint = async () => {
    await addComplaint(props.projectInfoSet.id, Number(localStorage.getItem('userId')), complaint.value,)
}
const modalItems: modalActionsList[] = [
    {
        name: 'Открыть проект',
        icon: project,
        func: () => {
            router.push('/project/' + props.projectInfoSet.id)
        },
    },
    {
        name: 'Подписаться',
        icon: follow,
        func: async () => {
            try {
                const response = await addFollow(Number(props.projectInfoSet.id), Number(localStorage.getItem("userId")));
                console.log(response);
            } catch (error) {
                console.error('Ошибка при подписке на проект:', error);
            }
        }
    },
    {
        name: 'Поделиться',
        icon: share,
        func: () => {
            try {
                navigator.share({
                    title: 'ITNT',
                    text: 'Откройте для себя ITNT.',
                    url: 'http://62.113.105.220/project/' + props.projectInfoSet.id,
                })
            } catch (error) {
                console.log('error :' + error)
            }
        },
    },
    // {
    //     name: 'Статистика проекта',
    //     icon: statistic,
    // },
    {
        name: 'Пожаловаться',
        icon: warning,
    },
]
const shareProject = () => {
    try {
        navigator.share({
            title: 'ITNT',
            text: 'Откройте для себя ITNT.',
            url: 'http://62.113.105.220/project/' + props.projectInfoSet.id,
        })
    } catch (error) {
        console.log('error :' + error)
    }
}
</script>

<style scoped lang="scss">
.searchProjectCard {
    padding: 16px 14px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
            text-wrap: balance;
        }
    }

    &__body {
        &__slider {
            display: flex;
            gap: 11px;
            -ms-overflow-style: none;
            /* Internet Explorer 10+ */
            scrollbar-width: none;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                display: none;
                /* Safari and Chrome */
            }
        }

        &__info {
            &__title {
                margin-top: 24px;
                margin-bottom: 12px;
            }
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__button {
            padding: 17px 20px;
            font-size: 13px;
            font-weight: 400;
            line-height: 14px;
            box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
        }
    }
}
</style>
