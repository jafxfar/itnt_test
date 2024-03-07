<template>
    <div>
        <div class="d-flex mb-2 align-center justify-space-between">
            <p v-show="props.readOnly" style="color: #263238" class="txt-cap2">Наша команда:</p>
            <p v-show="!props.readOnly" style="color: #263238" class="txt-cap2">Участники проекта:</p>

            <UiButton fit style="height: 36px; padding: 11px 16px" bgColor="smBlue" isSmall>
                <p class="txt-cap2">Заявки</p>
            </UiButton>
        </div>

        <!-- READONLY -->
        <div v-if="props.readOnly" class="projectTeam">
            <div class="projectTeam__list">
                <div v-for="item in demoTeam">
                    <div class="projectTeam__item d-flex justify-space-between">
                        <div class="d-flex projectTeam__item__main">
                            <img class="mr-5" src="../../assets/demo/projectsmallphoto.svg" alt="" />
                            <div class="txt-body2">
                                <p style="color: #263238">{{ item.name }}</p>
                                <p style="color: #9e9e9e">{{ item.role }}</p>
                            </div>
                        </div>
                        <v-icon @click="modalState.open()" icon="mdi-dots-vertical" />
                    </div>
                </div>
            </div>

            <vue-bottom-sheet max-height="115px" full-screen ref="modalState">
                <div class="modalList">
                    <div v-for="(item, id) in readOnlyModalItems" :key="id" class="modalList__item">
                        <img :src="`../src/assets/icons/footer/${item.icon}.svg`" alt="" />
                        <p :class="item.name === 'Пожаловаться' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                    </div>
                </div>
            </vue-bottom-sheet>
        </div>

        <!-- EDITABLE -->
        <div v-else>
            <div class="projectTeam__list">
                <div v-for="item in demoTeam">
                    <div class="projectTeam__item--edit d-flex justify-space-between">
                        <div class="projectTeam__item__header--edit">
                            <div class="d-flex">
                                <img
                                    class="mr-7"
                                    width="37"
                                    height="37"
                                    src="../../assets/demo/ava-small-header.svg"
                                    alt=""
                                />

                                <p class="txt-body2">Нейромонах Феофан</p>
                            </div>
                            <div class="d-flex">
                                <!-- TODO: проверка что участник CEO проекта -->
                                <div class="isCEO">CEO</div>
                                <v-icon @click="modalState.open()" icon="mdi-dots-vertical" />
                            </div>
                        </div>
                        <div class="projectTeam__item__body--edit">
                            <v-icon icon="mdi-eye-off-outline" />
                            <UiInput style="max-width: 250px" label="Должность*" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex mt-2 justify-space-between align-center">
                Пригласить участника
                <UiButton @click="searchTeammateModal.open()" plus />
            </div>
        </div>

        <vue-bottom-sheet ref="modalState">
            <div class="modal">
                <div class="modal__list">
                    <div v-for="(item, id) in editableModalItems" :key="id" class="modal__list__item">
                        <img :src="`../src/assets/icons/footer/${item.icon}.svg`" alt="" />
                        <p :class="item.name === 'Удалить человека из проекта' && 'error-txt'" class="txt-body1">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </div>
        </vue-bottom-sheet>

        <vue-bottom-sheet ref="searchTeammateModal">
            <div class="searchTeammateModal modal">
                <p class="mb-2">Поиск человека для добавления в проект</p>
                <UiInput prepend-icon="magnify" label="Введите данные для поиска" />
                <div class="searchTeammateModal__items">
                    <template v-for="i in 3">
                        <div class="searchTeammateModal__item">
                            <img width="37" height="37" src="../../assets/demo/ava-small-header.svg" alt="" />
                            <div>
                                <p class="txt-body2">Нейромонах Феофан</p>
                                <p class="color-gray txt-body2">Team mood</p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </vue-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import UiButton from '../ui-kit/UiButton.vue'
import UiInput from '../ui-kit/UiInput.vue'
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref } from 'vue'

const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    team: {
        type: Object,
    },
})

const modalState = ref(null)
const searchTeammateModal = ref(null)

const demoTeam = [
    {
        name: 'Евгений Анисимов',
        role: 'Database ninja',
    },
    {
        name: 'Евгений Анисимов',
        role: 'Database ninja',
    },
]

const readOnlyModalItems: modalActionsList[] = [
    {
        name: 'Открыть профиль',
        icon: 'account',
    },
]

const editableModalItems: modalActionsList[] = [
    {
        name: 'Открыть профиль',
        icon: 'account',
    },
    {
        name: 'Настроить полномочия',
        icon: 'account',
    },
    {
        name: 'Удалить человека из проекта',
        icon: 'account',
    },
    {
        name: 'Передать полномочия владельца проекта',
        icon: 'account',
    },
]
</script>

<style lang="scss" scoped>
.projectTeam {
    &__list {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }
    &__item {
        align-items: center;
        padding: 16px 9px 15px 16px;
        border-radius: 12px 12px 2px 2px;
        background: #fff;
        &--edit {
            display: flex;
            flex-direction: column;
            background: white;
        }
        &__header {
            &--edit {
                display: flex;
                justify-content: space-between;
                padding-top: 16px;
                padding-left: 24px;
                padding-right: 8px;
            }
        }
        &__body {
            &--edit {
                display: flex;
                justify-content: space-between;
                padding-right: 14px;
                padding-bottom: 23px;
                padding-left: 30px;

                align-items: center;
            }
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
.isCEO {
    color: #29b6f6;
    font-weight: 400;
}
.modalList {
    padding: 0 20px;
}
</style>
