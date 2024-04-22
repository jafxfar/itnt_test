<script lang="ts">
export default {
    name: 'ProjectCard',
}
</script>

<template>
    <div @click="modalState.open()" class="project-card">
        <div :style="props.projectInfo.isAnon === false ? 'padding-left: 52px' : ''" class="project-card__info">
            <img v-if="props.projectInfo.isAnon" width="41" height="38" src="../../assets/icons/anonProject.svg" />
            <div class="text-start px-[16vw]">
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
                    <img :src="item.icon" alt="" />
                    <p class="txt-body1">{{ item.name }}</p>
                </div>
                <button class="btn"><img :src="plus" alt="">Добавить проект в быстрое меню</button>
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<script setup lang="ts">
// icons
import anonimus from "~/assets/project_modal/annonimus.svg"
import hide from "~/assets/project_modal/hide.svg"
import project from "~/assets/project_modal/project.svg"
import share from "~/assets/project_modal/share.svg"
import plus from "~/assets/project_modal/plus.svg"

import { ref } from 'vue'
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'

const modalState = ref(false)

const modalItems: modalActionsList[] = [
    {
        name: 'Не показывать проект в профиле',
        icon: hide,
    },
    {
        name: 'Включить анонимное участие',
        icon: anonimus,
    },
    {
        name: 'Открыть проект',
        icon: project,
    },
    {
        name: 'Поделиться проектом',
        icon: share,
    },
]

const props = defineProps({
    projectInfo: {
        type: Object || Array,
    },
})
</script>

<style lang="scss" scoped>
.btn{
    display: flex;
    flex-direction: row;
    text-align: center;
    border: 2px solid #29B6F6;
    gap: 5%;
    border-radius: 12px;
    padding: 10px 13px;
}
.project-card {
    min-height: 94px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
    background: #fff;
    margin-bottom: 2px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;


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
            color: #1769AA;
            opacity: 0.5;
            font-size: 15px;
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
