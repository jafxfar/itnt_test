<template>
    <div class="feedCard mb-4">
        <!-- head -->
        <div v-if="props.withoutBg" class="feedCard__head-empty">
            <div class="d-flex align-center">
                <div>
                    <div class="d-flex align-center">
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feed.time') }}</span>
                    </div>
                    <p class="txt-body3 text-black mb-2">Save and Brave</p>
                </div>
            </div>
            <button @click="modalState.open()">
                <v-icon class="text-black" icon="mdi-dots-vertical" />
            </button>
        </div>
        <div v-else class="feedCard__head"
            :style="{ 'background-image': 'url(' + backgroundImageUrl + ')', 'height': imageHeight, 'color': Color }">
            <div class="d-flex align-center">
                <div>
                    <div class="d-flex align-center">
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feed.time') }}</span>
                    </div>
                    <p class="txt-body3 mb-2">Save and Brave</p>
                </div>
            </div>
            <button @click="modalState.open()">
                <v-icon icon="mdi-dots-vertical" />
            </button>
        </div>

        <!-- body -->
        <div class="feedCard__body">
            <!-- Новый этап проекта -->
            <div v-if="props.feedCardType === 'newProjectStage'">
                <p class="txt-cap1">
                    {{ $t('feed.feedBack') }}
                </p>
                <p class="txt-cap1 mt-4">
                    192.168.0.1:27015
                </p>
                <p class="txt-cap1 mt-1">
                    Заходи, будет весело!
                </p>
            </div>


            <!-- Слайдер -->
            <div v-if="props.feedCardType === 'newProjectPhotos'">
                <p class="txt-cap1">
                    {{ $t('feed.feedBack') }}
                </p>
                <p class="txt-cap1 my-4">
                    192.168.0.1:27015
                </p>
                <div class="feedCard__body__slider">
                    <img width="135" v-for="i in 5" height="204" src="../../assets/demo/demo-rec1.png" />
                </div>
            </div>
        </div>

        <!-- footer -->
        <div class="feedCard__footer">
            <div class="d-flex align-center">
                <UiButton bgColor="def" class="mr-3" :imgSrc="share" style="padding: 10px 13px 9px 14px" onlyIcon />
                <UiButton bgColor="def" class="mr-3" :imgSrc="chat" style="padding: 10px 13px 9px 14px" onlyIcon
                    @click="$router.push(props.blogID + '/blogComment')" />
            </div>
            <Fire />
        </div>
    </div>

    <vue-bottom-sheet v-if="props.userType == 'user'" ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <div class="modal__list__item">
                    <img src="../../assets/icons/warning-red.svg" alt="" />
                    <p class="txt-body1 text-[#FF3D00]">
                        <!-- {{ item.name }} -->
                        Сообщить об нарушении
                    </p>
                </div>
            </div>

        </div>
    </vue-bottom-sheet>

    <vue-bottom-sheet v-if="props.userType == 'me'" ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <div v-for="(item, id) in me" :key="id" class="modal__list__item">
                    <img :src="item.icon" alt="" />
                    <p class="txt-body1">
                        {{ item.name }}
                    </p>
                </div>
            </div>

        </div>
    </vue-bottom-sheet>
</template>

<script lang="ts" setup>
import share from "~/assets/icons/share-black.svg"
import chat from "~/assets/icons/chat-black.svg"
import bgImage from "~/assets/Frame221.png"
import trash from "~/assets/trash_blue.svg"
import edit_icon from "~/assets/edit_icon.svg"
import Fire from '../Fire.vue'
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import UiButton from '../ui-kit/UiButton.vue'
import { computed, ref } from 'vue'

const props = defineProps({
    feedCardType: {
        type: String,
        default: '',
    },
    userType: {
        type: String,
        default: '',
    },
    blogID: {
        type: Number,
    },
    withoutBg: {
        type: Boolean,
    }
})


const modalState = ref(null)

const me: modalActionsList[] = [
    {
        name: 'Удалить запись',
        icon: trash,
    },
    {
        name: 'Редактировать',
        icon: edit_icon,
    }
]

const backgroundImageUrl = ref(bgImage);

const hasImage = computed(() => {
    return backgroundImageUrl.value !== bgImage;
});

const imageHeight = computed(() => {
    return hasImage.value ? '0' : '120px';
})
const Color = computed(() => {
    return hasImage.value ? 'black' : 'white;'
})

const userModalType = computed(() => {
    if (props.userType === 'me') {
        return me
    } else if (props.userType === 'user') {
        return userModal
    }
})

const feedCardSubtitle = computed(() => {
    if (props.feedCardType === 'newProjectStage') {
        return ' Перешли на новый этап:'
    } else if (props.feedCardType === 'newProjectPhotos') {
        return ' В проекте обновились фото: '
    }
})
</script>

<style scoped lang="scss">
.feedCard {
    padding: 0px 0px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__head,
    &__head-empty {
        padding: 16px 6px 16px 19px;
        background-size: cover;
        // height: 128px;
        background-position: center;
        display: flex;
        border-radius: 12px 12px 2px 2px;
        align-items: flex-start;
        color: #ffffff;
        justify-content: space-between;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
        }
    }

    &__head {
        padding: 16px 6px 16px 19px;
    }

    &__head-empty {
        padding: 16px 6px 0px 19px;

    }

    &__body {
        padding: 0px 14px;

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
        padding: 12px 14px;
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
