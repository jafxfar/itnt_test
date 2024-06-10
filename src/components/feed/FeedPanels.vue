<script lang="ts">
export default {
    name: 'FeedPanel',
}
</script>

<template>
    <v-expansion-panels v-if="props.notification">
        <v-expansion-panel class="feedPanel">
            <v-expansion-panel-title class="feedPanel__head">
                <template v-slot:actions="{ expanded }">
                    <v-icon color="#1769AA" :icon="expanded ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                </template>
                <img width="30" height="30" class="mr-3" src="../../assets/demo/ava-small-header.svg" alt="" />

                <div>
                    <div class="feedPanel__card__title align-center d-flex">
                        <p class="txt-body3">Danger Flower</p>
                        <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feedPanels.time') }}</span>
                    </div>

                    <p class="feedPanel__card__subtitle txt-cap1">
                        {{ $t('feedPanels.addToProject') }} {{ demoInfo.length }} {{ $t('feedPanels.specialist') }}
                    </p>
                </div>

                <v-spacer></v-spacer>
                <span class="back-messages">{{ demoInfo.length }}</span>
                <div class="back-messages-after"></div>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
                <div class="feedPanel__card d-flex align-center">
                    <div>
                        <p class="txt-body3">
                            Здравствуйте, Том!
                            Нам кажется, вы то самое, недостающее звено в нашей команде. Мы сосредоточены на самых
                            крупных проектах
                            Англии и нам очень импонируют ваши методы работы.
                            Будем рады видеть в наших рядах!
                            P.S. У нас есть шляпы с полями и Томпсоны 🙄
                        </p>
                        <div class="w-full  flex flex-row mt-3">
                            <UiButton bgColor="def" class="mr-3" style="padding: 10px 13px 9px 14px">Открыть диалог
                            </UiButton>
                            <UiButton @click="openModal" bgColor="smBlue" class="mr-3"
                                style="padding: 10px 13px 9px 14px">
                                Отреагировать</UiButton>
                        </div>
                    </div>
                    <v-dialog v-model="searchModalState" width="100%">

                        <v-card class="ui-skills__search">
                            <div class="flex flex-row items-start justify-center mb-[48px]">
                                <img class="w-[47px] h-[47px] mr-[16px]" src="../../assets/demo/ava-small-header.svg"
                                    alt="" />
                                <h3 class="text-left">Вас приглашают присоединиться к проекту: <h3
                                        class="text-[#12b7ec]">Candy
                                        Gangsters </h3>
                                </h3>
                            </div>
                            <div>
                                <v-row class="mb-[20px]" align="center" justify="center">
                                    <v-btn @click="togleState" class="pa-0 mr-7" min-width="32" min-href="32"
                                        variant="outlined" color="#29B6F6">
                                        <v-icon icon="mdi-check" :color="state ? '#29B6F6' : '#E0E0E0'" />
                                    </v-btn>

                                    <p class="license-text ma-0">
                                        Участвовать анонимно (Команда<br />
                                        проекта сможет вас опознать) <br />
                                    </p>
                                </v-row>
                            </div>
                            <UiButton class="mb-[13px]" x-large bgColor="blue">Присоединиться</UiButton>
                            <UiButton block x-large bgColor="def">Отправить отказ</UiButton>
                        </v-card>
                    </v-dialog>
                    <v-spacer />
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels v-if="props.reply">
        <v-expansion-panel class="feedPanel">
            <v-expansion-panel-title class="feedPanel__head">
                <template v-slot:actions="{ expanded }">
                    <div class="bg-[#e1f5fe] px-2 rounded-[16px]">
                        <v-icon color="#1769AA" :icon="expanded ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                    </div>
                </template>
                <img width="30" height="30" class="mr-3" src="../../assets/demo/ava-small-header.svg" alt="" />

                <div>
                    <div class="feedPanel__card__title align-center d-flex">
                        <p class="txt-body3">Danger Flower</p>
                        <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feedPanels.time') }}</span>
                    </div>

                    <p class="feedPanel__card__subtitle txt-cap1">
                        {{ $t('feedPanels.addToProject') }} {{ demoInfo.length }} {{ $t('feedPanels.specialist') }}
                    </p>
                </div>

                <v-spacer></v-spacer>
                <!-- <span class="back-messages"></span>
                <div class="back-messages-after"></div> -->
            </v-expansion-panel-title>

            <v-expansion-panel-text>
                <div class="feedPanel__card d-flex align-center">
                    <img width="30" height="30" src="../../assets/demo/ava-small-header.svg" class="mr-3" />

                    <div>
                        <div class="feedPanel__card__title d-flex align-center">
                            <p class="txt-body3">Евгений Анисимов </p>
                            <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                            <span style="color: #9e9e9e" class="txt-cap1">3ч назад </span>
                        </div>

                        <p class="feedPanel__card__subtitle text-black text-xs txt-body3">
                            @realthomashardy, Проверь личку, скинул тебе ссылку, отпишись ;)
                            А то иногда ссылка почему то не доходит 🤔
                        </p>
                    </div>
                    <v-spacer />
                </div>
                <div class="w-full  flex flex-row mt-3">
                    <UiButton :is-small="true" bgColor="def" class="mr-3" style="padding: 10px 13px 9px 14px">Ответить
                    </UiButton>
                    <UiButton :fit="true" bgColor="smBlue" class="mr-3" style="padding: 10px 13px 9px 14px">
                        К коментарию <img width="30" height="30" :src="left" alt=""></UiButton>
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels v-if="props.default">
        <v-expansion-panel class="feedPanel">
            <v-expansion-panel-title class="feedPanel__head">
                <template v-slot:actions="{ expanded }">
                    <v-icon color="#1769AA" :icon="expanded ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                </template>
                <img width="30" height="30" class="mr-3" src="../../assets/demo/ava-small-header.svg" alt="" />

                <div>
                    <div class="feedPanel__card__title align-center d-flex">
                        <p class="txt-body3">Danger Flower</p>
                        <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feedPanels.time') }}</span>
                    </div>

                    <p class="feedPanel__card__subtitle txt-cap1">
                        {{ $t('feedPanels.addToProject') }} {{ demoInfo.length }} {{ $t('feedPanels.specialist') }}
                    </p>
                </div>

                <v-spacer></v-spacer>
                <span class="back-messages">{{ demoInfo.length }}</span>
                <div class="back-messages-after"></div>
            </v-expansion-panel-title>

            <v-expansion-panel-text v-for="(info, id) in demoInfo" :key="id">
                <div class="feedPanel__card d-flex align-center">
                    <img width="30" height="30" src="../../assets/demo/ava-small-header.svg" class="mr-3" />

                    <div>
                        <div class="feedPanel__card__title d-flex align-center">
                            <p class="txt-body3">{{ info.name }}</p>
                            <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                            <span style="color: #9e9e9e" class="txt-cap1">{{ info.time }} {{ $t('feedPanels.back')
                                }}</span>
                        </div>

                        <p class="feedPanel__card__subtitle txt-cap1">
                            {{ info.spec }}
                        </p>
                    </div>

                    <v-spacer />
                    <v-icon icon="mdi-dots-vertical" />
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels v-if="props.project">
        <v-expansion-panel class="feedPanel">
            <v-expansion-panel-title class="feedPanel__head">
                <template v-slot:actions="{ expanded }">
                    <div class="bg-[#e1f5fe] px-2 rounded-[16px]">
                        <v-icon color="#1769AA" :icon="expanded ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                    </div>
                </template>
                <img width="30" height="30" class="mr-3" src="../../assets/demo/ava-small-header.svg" alt="" />

                <div>
                    <div class="feedPanel__card__title align-center d-flex">
                        <p class="txt-body3">Danger Flower</p>
                        <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feedPanels.time') }}</span>
                    </div>

                    <p class="feedPanel__card__subtitle txt-cap1">
                        {{ $t('feedPanels.addToProject') }} {{ demoInfo.length }} {{ $t('feedPanels.specialist') }}
                    </p>
                </div>

                <v-spacer></v-spacer>
            </v-expansion-panel-title>

            <v-expansion-panels v-for="(info, id) in demoInfo" :key="id">
                <v-expansion-panels>
                    <v-expansion-panel class="feedPanel">
                        <v-expansion-panel-title class="feedPanel">
                            <template v-slot:actions="{ expanded }">
                                <div class="bg-[#e1f5fe] px-2 rounded-[16px]">
                                    <v-icon color="#1769AA"
                                        :icon="expanded ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                                </div>
                            </template>
                            <img width="30" height="30" class="mr-3" src="../../assets/demo/ava-small-header.svg"
                                alt="" />

                            <div>
                                <div class="feedPanel__card__title align-center d-flex">
                                    <p class="txt-body3">Danger Flower</p>
                                    <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                                    <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feedPanels.time') }}</span>
                                </div>

                                <p class="feedPanel__card__subtitle txt-cap1">
                                    {{ $t('feedPanels.addToProject') }} {{ demoInfo.length }} {{
        $t('feedPanels.specialist')
                                    }}
                                </p>
                            </div>

                            <v-spacer></v-spacer>
                        </v-expansion-panel-title>

                        <v-expansion-panel-text>
                            <div class="feedPanel__card d-flex align-center">
                                <div>
                                    <p class="txt-body3">
                                        Здравствуйте, Том!
                                        Нам кажется, вы то самое, недостающее звено в нашей команде. Мы сосредоточены на
                                        самых
                                        крупных проектах
                                        Англии и нам очень импонируют ваши методы работы.
                                        Будем рады видеть в наших рядах!
                                        P.S. У нас есть шляпы с полями и Томпсоны 🙄
                                    </p>

                                </div>
                                <v-spacer />
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-expansion-panels>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts">
import left from '../../assets/left_arrrow-white.svg';
import UiButton from '../../components/ui-kit/UiButton.vue';
import { defineProps, ref } from 'vue';

const props = defineProps({
    notification: {
        type: Boolean,
        default: false
    },
    reply: {
        type: Boolean,
        default: false
    },
    project: {
        type: Boolean,
        default: false
    },
    default: {
        type: Boolean,
        default: false
    }
});
const searchModalState = ref(false)
function openModal() {
    // chosenModalSkill.value = skill
    searchModalState.value = true
}
const demoInfo = [
    {
        name: 'Евгений Анисимов',
        time: '3ч',
        spec: 'Младший Шеф-Повар',
    },
    {
        name: 'Евгений Анисимов',
        time: '3ч',
        spec: 'Младший Шеф-Повар',
    },
]
</script>

<style lang="scss" scoped>
.feedPanel {
    // box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    &__head {
        padding: 16px 14px;
    }

    &__card {
        &__title {
            margin: 0;
        }

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
        }
    }
}

.feedPanel :deep() {
    .v-expansion-panels {
        border: 1px solid blue !important;
        border-radius: 12px 12px 2px 2px !important;
    }

    .v-expansion-panel__shadow {
        display: none;
    }

    .v-expansion-panel-title__overlay {
        border-radius: 12px 12px 2px 2px;
        opacity: 0;
    }

    .v-expansion-panel-text__wrapper {
        padding: 16px 14px;
        // border-top: 1px solid #e0e0e0;
    }
}

.v-expansion-panel-title {
    border-radius: 12px;

}

.v-expansion-panel-text {
    &:last-child {
        border-radius: 2px 2px 12px 12px;

    }
}

.v-expansion-panel-title--active {
    border-radius: 12px 12px 2px 2px !important;

}

.back-messages {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.01em;
    color: #1769aa;
    position: relative;
    text-align: right;
    z-index: 1;
}

.back-messages-after {
    right: 10px;
    top: 24px;
    width: 44px;
    height: 22px;
    position: absolute;
    background: #e1f5fe;
    border-radius: 16px;
}
</style>
