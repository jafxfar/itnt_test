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
                <div class="text-start px-4">
                    <p class="project-card__info__name">{{ props.projectInfo.project.name }}</p>
                    <p class="project-card__info__position">{{ props.projectInfo.project.slogan }}</p>
                </div>
            </div>
            <img v-if="fullAvatarUrl !== `${baseURL}files/string` && fullAvatarUrl !== `${baseURL}files/`"
                class="project-card__img" :src="fullAvatarUrl" alt=" " />
        </div>
    </div>
    <div v-else class="">
        <div :style="props.projectInfo.isAnon === false ? 'padding-left: 52px' : ''" class="project-card__info">
            <img v-if="props.projectInfo.isAnon" width="41" height="38" src="../../assets/icons/anonProject.svg" />
            <div class="text-start px-4">
                <p class="project-card__info__name">{{ props.projectInfo.project.name }}</p>
                <p class="project-card__info__position">{{ props.projectInfo.project.slogan }}</p>
            </div>
        </div>
        <div class="project-card__anominus">
            <img class="" :src="anonimus" alt="" />
        </div>
    </div>
    <vue-bottom-sheet ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <div v-for="(item, id) in modalItems" @click="item?.func" :key="id" class="modal__list__item">
                    <img :src="item.icon" alt="" />
                    <p :class="item.name === 'Пожаловаться' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<script setup lang="ts">
// import hidden from "~/assets/Profile/hideProjectCard.svg"

import anonimus from "~/assets/project_modal/annonimus.svg"
import hide from "~/assets/project_modal/hide.svg"
import project from "~/assets/project_modal/project.svg"
import share from "~/assets/project_modal/share.svg"
// import plus from "~/assets/project_modal/plus.svg"

import { useRouter } from 'vue-router';
import { ref, computed } from 'vue'
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'


const props = defineProps({
    projectInfo: {
        type: Object || Array,
    },
    prjID: {
        type: Number,
    },
})

const router = useRouter();

const isHidden = ref(false)

const hideContent = () => {
    isHidden.value = !isHidden.value
}
const isAnonimus = ref(false)

const anonimeContent = () => {
    isAnonimus.value = !isAnonimus.value
}
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
        func: () => {
            router.push('/project/' + props.projectInfo.project.id)
        },
    },
    {
        name: 'Поделиться проектом',
        icon: share,
        func: () => {
            try {
                navigator.share({
                    title: 'ITNT',
                    text: 'Откройте для себя ITNT.',
                    url: 'http://62.113.105.220/project/' + props.projectInfo.project.id,
                })
            } catch (error) {
                console.log('error :' + error)
            }
        },
    },
]
const baseURL = 'http://62.217.181.172/';

const fullAvatarUrl = computed(() => {
    return `${baseURL}files/${props.projectInfo.project.avatarUrl}`;
})

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
    border-radius: 4px;
    overflow: hidden;

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
        // box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
        position: absolute;
        right: -18px;
        top: -18px;
        overflow: hidden;
        width: 96px;
        height: 96px;
        border-radius: 100%;
        border: 6px #E1F5FE solid;
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

    :first-child {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }

    &:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
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

    
    &:last-child {
        border-bottom-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }

}

.img {
    position: absolute;
    right: 12px;
}

.project-card:not(.project-card ~ .project-card) {
    border-radius: 12px 12px 2px 2px;
}
</style>