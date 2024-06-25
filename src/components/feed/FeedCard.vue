<template>
    <div class="feedCard">
        <!-- head -->
        <div class="feedCard__head">
            <div class="d-flex align-center">
                <img class="mr-3" width="30" height="30" src="../../assets/demo/ava-small-header.svg" />
                <div>
                    <div class="d-flex align-center">
                        <p class="txt-body3">Save and Brave</p>
                        <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feed.time') }}</span>
                    </div>

                    <p class="feedCard__head__subtitle txt-cap1">
                        <!-- {{ post.offer }} -->
                        <!-- <span v-if="props.feedCardType === 'newProjectStage'" class="color-blue">{{post.type}}</span> -->
                    </p>
                </div>
            </div>
            <v-icon @click="modalState.open()" icon="mdi-dots-vertical" color="#263238" class="font-weight-bold" />
        </div>

        <!-- body -->
        <div class="feedCard__body">
            <p> {{ postDescHeader }}</p>
            <p> {{ postDesc }}</p>

            <!-- Новый этап проекта -->
            <div v-if="props.feedCardType === 'newProjectStage'">
                <p class="txt-cap1">
                    {{ $t('feed.feedBack') }}
                </p>
            </div>
            <!-- !Новый этап проекта -->

            <!-- Новый файл -->
            <div v-if="props.feedCardType === 'newFile'" class="d-flex">
                <img style="margin-right: 3px" src="../../assets/icons/media/ppt-blue.svg" alt="" />
                <div class="d-flex flex-column justify-space-between">
                    <p class="txt-cap1 color-blue">{{ $t('feed.invest') }}</p>
                    <p style="color: #9e9e9e" class="txt-cap1">7.2 Mb</p>
                </div>
            </div>

            <!-- Слайдер -->
            <div class="feedCard__body__slider" v-if="props.feedCardType === 'newProjectPhotos'">
                <img width="135" v-for="i in 5" height="204" src="../../assets/demo/demo-rec1.png" />
            </div>

            <!-- Проекту требуются специалисты -->
            <div v-if="props.feedCardType === 'newProjectVacancies'">
                <UiVacancyPanel readOnly :data="demoVacancy" />
            </div>

            <!-- Проект активно обсуждается -->
            <div v-if="props.feedCardType === 'newProjectDiscussed'"></div>
        </div>

        <!-- footer -->
        
        <div class="feedCard__footer">
            <!-- <UiButton bgColor="def" class="feedCard__footer__button" fit>
                <p v-if="props.feedCardType != 'newProjectDiscussed'" class="txt-cap1">{{ $t('feed.GoTo') }}</p>
                <p v-else class="txt-cap1">{{ $t('feed.comments') }}</p>
            </UiButton> -->
            <UiButton  onlyIcon :imgSrc="chat" is-Xsmall="true" @click="$router.push('/project/' + '/comment')" bgColor="def"/>
            <div class="d-flex align-center">
                <UiButton v-if="props.feedCardType != 'newProjectDiscussed'" bgColor="def" class="mr-3" :imgSrc="share"
                    style="padding: 10px 13px 9px 14px" onlyIcon />

                <Fire :id="props.postID" />
            </div>
        </div>
    </div>
    <vue-bottom-sheet max-height="100px" full-screen ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <div v-for="(item, id) in modalItems" @click="item?.func" :key="id" class="modal__list__item">
                    <img :src="item.icon" alt="" />
                    <p class="error-txt txt-body1">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<script lang="ts" setup>
import warning from "~/assets/icons/warning-red.svg"

import chat from "~/assets/icons/chat-black.svg"
import share from "~/assets/icons/share-black.svg";
import Fire from '../Fire.vue'
import UiButton from '../ui-kit/UiButton.vue'
import UiVacancyPanel from '../ui-kit/UiVacancyPanel.vue'
import { computed,ref } from 'vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { modalActionsList } from '~/helpers/types'
// import { postAddUserPicture } from "~/API/ways/user";
const modalState = ref(false)
const modalItems: modalActionsList[] = [
    // {
    //     name: 'Статистика проекта',
    //     icon: statistic,
    // },
    {
        name: 'Сообщить о нарушении',
        icon: warning,
    },
]
const props = defineProps({
    feedCardType: {
        type: String,
        default: '',
    },
    comment: {
        type: Boolean,
        default: '',
    },
    message: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
    post: {
        type: Object,
        default: () => { },
    },
    postID: {
        type: Number,
        default: 0,
    },
    postDescHeader: {
        type: String,
        required: false,
    },
    postDesc: {
        reqired: false,
        type: String
    }
})

const feedCardSubtitle = computed(() => {
    if (props.feedCardType === 'newProjectDiscussed') {
        return 'Проект активно обсуждается'
    } else if (props.feedCardType === 'newProjectVacancies') {
        return 'Проекту требуются специалисты'
    } else if (props.feedCardType === 'newProjectStage') {
        return ' Перешли на новый этап:'
    } else if (props.feedCardType === 'newProjectPhotos') {
        return ' В проекте обновились фото: '
    } else if (props.feedCardType === 'newFile') {
        return 'Добавили вложение: '
    }
})
</script>

<style scoped lang="scss">
.feedCard {
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
        }
    }

    &__body {
        text-align: left;

        &__slider {
            display: flex;
            gap: 16px;
            -ms-overflow-style: none;
            /* Internet Explorer 10+ */
            scrollbar-width: none;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                display: none;
                /* Safari and Chrome */
            }
        }
    }

    &__vacancy {
        &__head {
            padding: 10px 20px;
            display: flex;
            gap: 10px;
            align-items: center;
            max-width: fit-content;
            border-radius: 8px;
            background: #e1f5fe;
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__button {
            padding: 14.5px 20px;
            box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
        }
    }
}

.feedCard__panel :deep() {
    border: 1px solid $def-white;

    .v-expansion-panel__shadow {
        display: none;
    }

    .v-expansion-panel-title__overlay {
        opacity: 0;
    }

    .v-expansion-panel-text__wrapper {
        padding: 23px 20px;
        padding-top: 8px;
    }
}

.v-expansion-panel--active {
    border-radius: 12px !important;
    background: #ffffff;
    border: #c7edff 1px solid !important;
}
</style>
<script lang="ts">
export default {
    name: 'FeedCard',
}
</script>