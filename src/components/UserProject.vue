<script lang="ts">
export default {
    name: 'UserProject',
}
</script>

<template>
    <div @click="modalState.open()" class="feedPanel bg-white rounded-[16px]">
        <div class="feedPanel__head flex flex-row">
            <div class="feedPanel__block">
                <div class="feedPanel__card__title align-center d-flex">
                    <p class="txt-cap2">Danger Flower</p>
                </div>
                <p class="feedPanel__card__subtitle txt-cap2">
                    HR Manager
                </p>
            </div>

            <v-spacer></v-spacer>
            <span class="back-messages"><img class="rounded-[12px]" src="/src/assets/prAva.svg" alt=""></span>
        </div>
        <div class="feedPanel__head flex flex-row">
            <div class="feedPanel__block">
                <div class="feedPanel__card__title align-center d-flex">
                    <p class="txt-cap2">Danger Flower</p>
                </div>
                <p class="feedPanel__card__subtitle txt-cap2">
                    HR Manager
                </p>
            </div>

            <v-spacer></v-spacer>
            <span class="back-messages"><img class="rounded-[12px]" src="/src/assets/prAva.svg" alt=""></span>
        </div>
    </div>
    <vue-bottom-sheet ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <div v-for="(item, id) in editableModalItems" :key="id" class="modal__list__item">
                    <img :src="`../src/assets/icons/footer/${item.icon}.svg`" alt="" />
                    <p :class="item.name === 'Удалить человека из проекта' && 'border-text'" class="txt-body1">
                        {{ item.name }}
                    </p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<script setup lang="ts">
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref } from 'vue';

const modalState = ref(null)

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
.feedPanel {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    &__head {
        padding: 0 0 0 48px;
    }

    &__block {
        display: flex;
        flex-direction: column;
        gap: 8px;
        justify-content: center;
        align-items: start;
    }

    &__card {
        &__title {
            color: #29b6f6;
        }

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
        }
    }
}
.border-text{
    border:#29b6f6 1px solid;
    border-radius: 12px;
    padding: 13px 10px 13px 10px;    
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
    right: 11px;
    top: 24px;
    width: 44px;
    height: 22px;
    position: absolute;
    background: #e1f5fe;
    border-radius: 16px;
}
</style>
