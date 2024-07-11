<template>
    <div class="searchUserCard mb-2">
        <div class="searchUserCard__head">
            <div class="d-flex align-center">
                <img class="mr-3" width="37" height="37" src="../../assets/demo/ava-small-header.svg" />
                <div>
                    <div class="d-flex align-center">
                        <p class="txt-body3">{{ props.userInfoSet.id }}</p>
                    </div>
                    <!-- <p class="searchUserCard__head__subtitle txt-cap1">г. Санкт-Петербург</p> -->
                    <p class="searchUserCard__head__subtitle txt-cap1">{{ props.userInfoSet.login }}</p>
                </div>
            </div>
            <v-icon @click="modalState.open()" icon="mdi-dots-vertical" color="#263238" class="font-weight-bold" />
        </div>

        <div class="searchUserCard__body">
            <div class="searchUserCard__body__skills">
                <div v-for="(skill, id) in demoSkills" :key="id">
                    <div class="searchUserCard__body__skills__item txt-body1">{{ skill }}</div>
                </div>
            </div>

            <div class="searchUserCard__body__info">
                <p class="txt-body1">
                    Я сюда припёрся, чтобы нормально постартапить! Ждал нормального стартапа с нормальными мужиками.©
                    Легенда
                </p>
            </div>
        </div>
        <vue-bottom-sheet max-height="270px" full-screen ref="modalState">
            <div class="modal">
                <div class="modal__list">
                    <div v-for="(item, id) in modalItems" @click="item?.func" :key="id" class="modal__list__item">
                        <img :src="item.icon" alt="" />
                        <p @click="complainState.open()" :class="item.name === 'Пожаловаться' && 'error-txt'"
                            class="txt-body1">{{ item.name }}</p>
                    </div>
                </div>
            </div>
        </vue-bottom-sheet>
        <vue-bottom-sheet max-height="380px" full-screen ref="complainState">
            <div class="searchTeammateModal modal">
                <p class="mb-2">Выберите причину жалобы на пользователя:</p>
                <div class="searchTeammateModal__item">
                    <input type="radio" name="complaint" id=""> Спам
                </div>
                <div class="searchTeammateModal__item">
                    <input type="radio" name="complaint" id=""> Агрессивное поведение
                </div>
                <div class="searchTeammateModal__item">
                    <input type="radio" name="complaint" id=""> Взрослый контент (ссылки, картинки, видео и
                    т.п.)
                </div>
                <UiTextArea v-model="complaint" />
                <UiButton bg-color="blue" @click="sendComplaint">Отправить жалобу</UiButton>
            </div>
        </vue-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import project from "~/assets/icons/footer/account.svg"
import share from "~/assets/icons/share-blue.svg"
import warning from "~/assets/icons/warning-red.svg"
// import defAva from "~/assets/demo/projectsmallphoto.svg"
// import statistic from "~/assets/modal_icon/statistic.svg"
import follow from "~/assets/modal_icon/follow.svg"
import UiTextArea from "~/components/ui-kit/UiTextArea.vue"
import UiButton from "~/components/ui-kit/UiButton.vue"

import { ref } from 'vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { modalActionsList } from '~/helpers/types'
import { useRouter } from 'vue-router'
import {postAddComplaint} from '~/API/ways/user.ts'
const modalState = ref(false)
const complainState = ref(false)
const complaint = ref('')
const router = useRouter()

const props = defineProps({
    userInfoSet: {
        type: Object || Array,
        default: () => { },
    },
    listID: {
        type: Number,
    },
})
const sendComplaint = async () => {
    await postAddComplaint(props.userInfoSet.id, Number(localStorage.getItem('userId')), complaint.value,)
}
const modalItems: modalActionsList[] = [
    {
        name: 'Открыть профиль',
        icon: project,
        func: () => {
            router.push('/user/' + props.userInfoSet.id)
        },
    },
    {
        name: 'Подписаться',
        icon: follow,
        // func: async () => {
        //     try {
        //         const response = await addFollow(Number(props.projectInfoSet.id), Number(localStorage.getItem("userId")));
        //         console.log(response);
        //     } catch (error) {
        //         console.error('Ошибка при подписке на проект:', error);
        //     }
        // }
    },
    {
        name: 'Поделиться',
        icon: share,
        func: () => {
            try {
                navigator.share({
                    title: 'ITNT',
                    text: 'Откройте для себя ITNT.',
                    url: 'http://62.113.105.220/user/' + props.userInfoSet.id,
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
const demoSkills = ['User Experience Designer (UX)', 'Team Lead', 'Product Owner']
</script>

<style scoped lang="scss">
.searchUserCard {
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

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
            text-wrap: balance;
        }
    }

    &__body {
        padding: 0px 2px;

        &__skills {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;

            &__item {
                padding: 3px 10px;
                color: $def-black;
                max-width: fit-content;
                border: 1.5px solid $primary;
                border-radius: 4px;
            }
        }

        &__info {
            margin-top: 16px;
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
