<script lang="ts">
export default {
    name: 'UiVacancyPanel',
}
</script>

<template>
    <!-- READONLY -->
    <div v-if="props.readOnly">
        <v-expansion-panels>
            <v-expansion-panel class="ui-vacancyPanel rounded-lg">
                <v-expansion-panel-title :class="props.card && 'ui-vacancyPanel--card'" class="pa-0 pl-2 pr-4">
                    <div class="ui-vacancyPanel__head txt-body2">
                        <v-icon icon="mdi-account-outline" size="small" />
                        {{ props.data.type }}
                    </div>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <p class="txt-body2 mb-4">
                        {{ props.data.description }}
                    </p>

                    <div class="ui-vacancyPanel__head mb-2">
                        <v-icon icon="mdi-wallet-outline" />
                        Мы предлагаем
                    </div>

                    <p class="txt-body2 mb-6">{{ props.data.offer }}</p>

                    <UiButton @click="modalState.open()" bg-color="def">Мне это подходит!</UiButton>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <vue-bottom-sheet ref="modalState">
            <div class="ui-vacancyPanel__modal px-4">
                <p>Запрос на вступление в проект</p>

                <div class="ui-vacancyPanel__modal__info">
                    <div>
                        <p>iTalent</p>
                        <p>Driver</p>
                    </div>

                    <UiTextArea label="Сопроводительное письмо*" />
                </div>

                <UiButton bgColor="blue" @click="confirm" class="mt-8">Подтвердить</UiButton>
            </div>
        </vue-bottom-sheet>
    </div>

    <!-- EDITABLE -->
    <div class="card" style="padding: 15px; padding-bottom: 20px" v-else>
        <div class="d-flex mb-2">
            <p>Вакансия</p>
            <v-spacer />
            <v-icon @click="vacancyPanel.open()" icon="mdi-dots-vertical" />
        </div>

        <div class="ui-vacancyPanel__inputs">
            <UiInput label="Должность*" v-model="props.data.type" />
            <UiTextArea label="Описание*" v-model="props.data.description" />
            <UiInput label="Что мы предлагаем*" v-model="props.data.offer" />
        </div>

        <vue-bottom-sheet ref="vacancyPanel">
            <div class="modal">
                <div class="modal__list">
                    <div v-for="(item, id) in editableModalItems" :key="id" class="modal__list__item">
                        <img :src="item.icon" alt="" />
                        <p :class="item.name === 'Удалить человека из проекта' && 'error-txt'" class="txt-body1">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </div>
        </vue-bottom-sheet>
    </div>
</template>

<script lang="ts" setup>
import delate from "~/assets/demo/delate.svg"
import archieve from "~/assets/demo/archieve.svg"

import UiButton from './UiButton.vue'
import UiInput from './UiInput.vue'
import UiTextArea from './UiTextArea.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref, defineEmits } from 'vue'
import { modalActionsList } from '~/helpers/types'
const emit = defineEmits(['confirm'])

const modalState = ref(null)
const vacancyPanel = ref(null)
const confirm = () => {
    emit('confirm', user.value)
}
const props = defineProps({
    data: {
        type: Object || Array,
        default: () => [],
    },
    card: {
        type: Boolean,
        default: false,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
})

const editableModalItems: modalActionsList[] = [
    {
        name: 'Удалить вакансию',
        icon: delate,
    },
    {
        name: 'Архивировать',
        icon: archieve,
    },
]
</script>

<style lang="scss" scoped>
.ui-vacancyPanel {
    &__head {
        padding: 10px 20px;
        display: flex;
        gap: 10px;
        align-items: center;
        max-width: fit-content;
        border-radius: 8px;
        background: #e1f5fe;
    }
    &__inputs {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    &--card {
        border-radius: 12px;
        background: $def-white;
        padding: 23px 20px !important;
    }
}
.ui-vacancyPanel :deep() {
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
    .v-expansion-panel-title__overlay {
        border-radius: 12px;
        background: $def-white;
        padding: 23px 20px !important;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    }
}
.v-expansion-panel--active {
    border-radius: 12px !important;
    background: #ffffff;
    border: #c7edff 1px solid !important;
}
</style>
