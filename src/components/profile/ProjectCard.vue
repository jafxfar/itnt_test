<script lang="ts">
export default {
    name: 'ProjectCard',
}
</script>

<template>
    <div v-if="!isHidden" @click="modalState.open()" class="project-card">
        <div v-if="!isAnonimus" class="">
            <div :style="props.projectInfo.isAnon === false ? 'padding-left: 52px' : ''" class="project-card__info">
                <img v-if="props.projectInfo.isAnon" width="41" height="38" src="../../assets/icons/anonProject.svg" />
                <div class="text-start px-[16vw]">
                    <p class="project-card__info__name">{{ props.projectInfo.project.name }}</p>
                    <p class="project-card__info__position">{{ props.projectInfo.project.slogan }}</p>
                </div>
            </div>
            <img class="project-card__img" :src="props.projectInfo.project.avatarUrl" alt="" />
        </div>
        <div v-else class="">
            <div :style="props.projectInfo.isAnon === false ? 'padding-left: 52px' : ''" class="project-card__info">
                <img v-if="props.projectInfo.isAnon" width="41" height="38" src="../../assets/icons/anonProject.svg" />
                <div class="text-start px-[16vw]">
                    <p class="project-card__info__name">{{ props.projectInfo.project.name }}</p>
                    <p class="project-card__info__position">{{ props.projectInfo.project.slogan }}</p>
                </div>
            </div>
            <div class="project-card__anominus">
                <img class="" :src="anonimus" alt="" />
            </div>
        </div>
    </div>
    <div v-else class="project-anonim " @click="modalState.open()">
        <div :style="props.projectInfo.isAnon === false ? 'padding-left: 52px' : ''" class="project-card__info">
            <img class="img" width="41" height="38" :src="hidden" />
            <div class="text-start px-[16vw]">
                <p class="project-anonim__info__name">{{ props.projectInfo.project.name }}</p>
                <p class="project-anonim__info__position">{{ props.projectInfo.project.slogan }}</p>
            </div>
        </div>
    </div>
    <vue-bottom-sheet ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <button class="modal__list__item" @click="hideContent"><img :src="hide" alt="">
                    <p v-if="!isHidden">Не показывать проект в профиле</p>
                    <p v-else>Показать проект в профиле</p>

                </button>
                <button class="modal__list__item" @click="anonimeContent"><img :src="anonimus" alt="">
                    <p v-if="!isAnonimus">Включить анонимное участие</p>
                    <p v-else>Выключить анонимное участие</p>

                </button>
                <button class="modal__list__item" @click="$router.push('/project/' + props.prjID)"><img :src="project" alt="">
                    <p>Открыть проект</p>
                </button>
                <button class="modal__list__item" @click="shareProject()"><img :src="share" alt="">
                    <p>Поделиться проектом</p>
                </button>
                <div v-for="(item, id) in modalItems" :key="id" class="modal__list__item cursor-pointer">
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
import hidden from "~/assets/Profile/hideProjectCard.svg"

import anonimus from "~/assets/project_modal/annonimus.svg"
import hide from "~/assets/project_modal/hide.svg"
import project from "~/assets/project_modal/project.svg"
import share from "~/assets/project_modal/share.svg"
import plus from "~/assets/project_modal/plus.svg"

import { ref, defineProps } from 'vue'
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useProjectStore } from '~/store/projectStore'
const projectStore = useProjectStore()
const { prjObject } = storeToRefs(useProjectStore())

const props = defineProps({
    projectInfo: {
        type: Object || Array,
    },
    projectInfoSet: {
        type: Object || Array,
        default: () => {},
    },
    prjID: {
        type: Number,
    },})

const router = useRouter();

const isHidden = ref(false)

const hideContent = () => {
    isHidden.value = !isHidden.value
}

function shareProject() {
    try {
        navigator.share({
            title: 'ITNT',
            text: 'Откройте для себя ITNT.',
            url: 'http://62.113.105.220/',
        })
    } catch (error) {
        console.log('error :' + error)
    }
}
const isAnonimus = ref(false)

const anonimeContent = () => {
    isAnonimus.value = !isAnonimus.value
}
const modalState = ref(false)

const modalItems: modalActionsList[] = [

]


</script>

<style lang="scss" scoped>
.btn {
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
    background-color: white;
    margin-bottom: 2px;
    border-top-left-radius: 12px;
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

    &__anominus {
        padding: 7px 8.5px;
        background-color: #E1F5FE;
        align-items: start;
        position: absolute;
        top: 30%;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }


    // &:last-child {}
}

.project-anonim {
    min-height: 94px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
    background-color: rgb(250, 250, 250);
    margin-bottom: 2px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);


    &__info {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 28px 0;

        &__name {
            color: black;
            font-size: 15px;
            font-weight: 500;
        }

        &__position {
            color: black;
            opacity: 0.5;
            font-size: 15px;
            font-weight: 400;
        }
    }

    &__img {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
        // position: absolute;
    }

    &__anominus {
        padding: 12px;
        align-items: start;
        position: absolute;
        top: 30%;
    }


    // &:last-child {}

}

.img {
    position: absolute;
    right: 12px;
}

.project-card:not(.project-card ~ .project-card) {
    border-radius: 12px 12px 2px 2px;
}
</style>
