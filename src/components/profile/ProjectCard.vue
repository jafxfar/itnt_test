<script lang="ts">
export default {
    name: 'ProjectCard',
}
</script>

<template>
    <div @click="modalState.open()" class="project-card">
        <div :style="props.projectInfo.isAnon === false ? 'padding-left: 52px' : ''" class="project-card__info">
            <img v-if="props.projectInfo.isAnon" width="41" height="38" src="../../assets/icons/anonProject.svg" />
            <div>
                <p class="project-card__info__name">{{ props.projectInfo.project.name }}</p>
                <p class="project-card__info__position">{{ props.projectInfo.project.slogan }}</p>
            </div>
        </div>
        <img class="project-card__img" :src="props.projectInfo.project.avatarUrl" alt="" />
    </div>

    <vue-bottom-sheet ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <div v-for="(item, id) in modalItems" :key="id" class="modal__list__item">
                    <img :src="`../src/assets/icons/footer/${item.icon}.svg`" alt="" />
                    <p :class="item.name === 'Пожаловаться' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'

const modalState = ref(false)

const modalItems: modalActionsList[] = [
    {
        name: 'Не показывать проект в профиле',
        icon: 'account',
    },
    {
        name: 'Включить анонимное участие',
        icon: 'account',
    },
    {
        name: 'Открыть проект',
        icon: 'account',
    },
    {
        name: 'Поделиться проектом',
        icon: 'account',
    },
]

const props = defineProps({
    projectInfo: {
        type: Object || Array,
    },
})
</script>

<style lang="scss" scoped>
.project-card {
    min-height: 94px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
    background: #fff;
    margin-bottom: 2px;
    border-radius: 2px;

    &__info {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 28px 0;
        &__name {
            color: $primary;
            font-size: 15px;
            font-weight: 500;
        }
        &__position {
            color: #1769aa;
            font-size: 16px;
            font-weight: 400;
        }
    }
    &__img {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
        // position: absolute;
    }

    // &:last-child {}
}
.project-card:not(.project-card ~ .project-card) {
    border-radius: 12px 12px 2px 2px;
}
</style>
