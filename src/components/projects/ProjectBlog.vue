<template>
    <div class="flex justify-center">
        <div class="w-1/4 date mb-4 rounded-xl">{{ $t('feed.today') }}</div>
    </div>
    <div class="feedCard mb-4">
        <!-- head -->
        <div class="feedCard__head"
            :style="{ 'background-image': 'url(' + backgroundImageUrl + ')', 'height': imageHeight, 'color' : Color }">
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
                <p class="txt-body3 mt-1">
                    Заходи, будет весело!
                </p>
            </div>
            

            <!-- Слайдер -->
            <div class="feedCard__body__slider" v-if="props.feedCardType === 'newProjectPhotos'">
                <img width="135" v-for="i in 5" height="204" src="../../assets/demo/demo-rec1.png" />
            </div>

           
            <div v-if="props.feedCardType === 'newProjectDiscussed'"> Проект активно обсуждается</div>
        </div>

        <!-- footer -->
        <div class="feedCard__footer">
            <div class="d-flex align-center">
                <UiButton
                    v-if="props.feedCardType != 'newProjectDiscussed'"
                    bgColor="def"
                    class="mr-3"
                    imgSrc="../src/assets/icons/share-black.svg"
                    style="padding: 10px 13px 9px 14px"
                    onlyIcon
                />
                <UiButton
                    v-if="props.feedCardType != 'newProjectDiscussed'"
                    bgColor="def"
                    class="mr-3"
                    imgSrc="../src/assets/icons/share-black.svg"
                    style="padding: 10px 13px 9px 14px"
                    onlyIcon
                />
            </div>
            <Fire />
        </div>
    </div>

    <vue-bottom-sheet v-if="props.userType =='user'" ref="modalState">
        <div class="modal"  >
            <div class="modal__list">
                <div v-for="(item, id) in userModal" :key="id" class="modal__list__item">
                    <img :src="`../src/assets/icons/footer/${item.icon}.svg`" alt="" />
                    <p class="txt-body1 text-[#FF3D00]">
                        {{ item.name }}
                    </p>
                </div>
            </div>
            
        </div>
    </vue-bottom-sheet>

    <vue-bottom-sheet v-if="props.userType =='me'" ref="modalState">
        <div class="modal"  >
            <div class="modal__list">
                <div v-for="(item, id) in me" :key="id" class="modal__list__item">
                    <img :src="`../src/assets/icons/footer/${item.icon}.svg`" alt="" />
                    <p class="txt-body1">
                        {{ item.name }}
                    </p>
                </div>
            </div>
            
        </div>
    </vue-bottom-sheet>
</template>

<script lang="ts" setup>
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
    userType:{
        type:String,
        default: '',
    }
})


const modalState = ref(null)

const userModal: modalActionsList[] = [
    {
        name: 'Сообщить о нарушении',
        icon: 'account',
    },
]

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

const backgroundImageUrl = ref("/src/assets/Frame221.png");

const hasImage = computed(() => {
    return backgroundImageUrl.value !== "/src/assets/Frame221.png";
});

const imageHeight = computed(() =>{
    return hasImage.value ? '0' : '120px';
})
const Color = computed(() => {
    return hasImage.value ? 'black' : 'white;'
})

const userModalType = computed(() =>{
    if (props.userType === 'me') {
        return me
    } else if (props.userType === 'user') {
        return userModal
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
.date {
    display: flex;
    justify-content: center;
    background: rgba(224, 224, 224, 0.5);
    font-size: 13px !important;
    letter-spacing: 0.01em !important;
    padding: 6px 20px;
    line-height: 14px;
}
.feedCard {
    // padding: 16px 14px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;
    &__head {
        padding: 16px 6px 16px 19px;
        background-size: cover;
        // height: 128px;
        background-position: center;
        display: flex;
        border-radius: 12px 12px 2px 2px;
        align-items:flex-start;
        color: #ffffff;
        justify-content: space-between;
        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
        }
    }
    &__body {
        padding: 0px 14px;

        text-align: left;
        &__slider {
            display: flex;
            gap: 16px;
            -ms-overflow-style: none; /* Internet Explorer 10+ */
            scrollbar-width: none;
            overflow-x: scroll;
            &::-webkit-scrollbar {
                display: none; /* Safari and Chrome */
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
