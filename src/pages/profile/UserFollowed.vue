<template>
    <Header showUserMinify :routeName="'Мои подписки'" />
    <v-container style="padding: 0 20px">
        <UiSwitch @changeValue="searchPageSwitchState = $event" :items="['Проекты', 'Люди']" />
        <UiInput v-model="searchQuery" placeholder="Поиск..." />
        <FeedPanels :followed="true" />

    </v-container>
    <div v-for="(project, idx) in followed" :key="idx" class="searchUserCard m-4">
        <div class="searchUserCard__head">
            <div class="d-flex align-center">
                <img class="mr-3" width="37" height="37" src="../../assets/demo/ava-small-header.svg" />
                <div>
                    <div class="d-flex align-center">
                        <p class="txt-body3">{{ project.project.name }}</p>
                    </div>
                    <p class="searchUserCard__head__subtitle txt-cap1">
                        {{ project.project.slogan }}
                        {{ project.project.id }}
                    </p>
                </div>
            </div>
            <v-icon @click="modalState.open()" icon="mdi-dots-vertical" color="#263238" class="font-weight-bold" />
        </div>
    </div>
    <vue-bottom-sheet max-height="270px" full-screen ref="modalState">
        <div class="modal">
            <div class="modal__list">
                <div v-for="(item, id) in modalItems" @click="item?.func" :key="id" class="modal__list__item cursor-pointer">
                    <img :src="item.icon" alt="" />
                    <p :class="item.name === 'Пожаловаться' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>

    <Footer />
</template>

<script setup lang="ts">
import UiSwitch from '~/components/ui-kit/UiSwitch.vue'
import FeedPanels from '~/components/feed/FeedPanels.vue';
import UiInput from '~/components/ui-kit/UiInput.vue'

// ui-kit
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { onMounted, ref } from 'vue'
import { getUserByID } from '~/API/ways/user.ts'
import { addFollow } from '~/API/ways/project'
import project from "~/assets/project_modal/project.svg"
import share from "~/assets/icons/share-blue.svg"
import warning from "~/assets/icons/warning-red.svg"

// import statistic from "~/assets/modal_icon/statistic.svg"
import follow from "~/assets/modal_icon/follow.svg"
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { modalActionsList } from '~/helpers/types'

import { useRouter } from 'vue-router'
const router = useRouter()
let data = ref({})
let followed = ref([])
const isFollowing = ref(true)
const searchPageSwitchState = ref(0)
const modalState = ref(false)

const props = defineProps({
    projectInfoSet: {
        type: Object || Array,
        default: () => { },
    },
    listID: {
        type: Number,
    },
})

const modalItems: modalActionsList[] = [
    {
        name: 'Открыть проект',
        icon: project,
        func: () => {
            router.push('/project/' + project.project.id)
        },
    },
    {
        name: 'Отписаться',
        icon: follow,
        func: async () => {
            try {
                const response = await addFollow(Number(9), Number(localStorage.getItem("userId")));
                console.log(response);
                isFollowing.value = false
            } catch (error) {
                console.error('Ошибка при подписке на проект:', error);
            }
        }
    },
    {
        name: 'Поделиться',
        icon: share,
        func: () => {
            try {
                navigator.share({
                    title: 'ITNT',
                    text: 'Откройте для себя ITNT.',
                    url: 'http://62.113.105.220/project/' + props.projectInfoSet.id,
                })
            } catch (error) {
                console.log('error :' + error)
            }
        },
    },
    // {
    //     name: 'Статистика проекта',
    //     icon: statistic,
    // },
    {
        name: 'Пожаловаться',
        icon: warning,
    },
]

onMounted(async () => {
    await getUserByID(Number(localStorage.getItem("userId"))).then((response) => {
        try {
            data.value = response.data.object
            console.log('Full data:', data.value)

            if (Array.isArray(data.value.projects)) {
                data.value.projects.forEach((project, index) => {
                    console.log(`Project ${index}:`, project)
                })

                followed.value = data.value.projects.filter(project => project.relationType === 'PROJECT_FOLLOWER')
                console.log('Followed projects:', followed.value)
            } else {
                console.warn('Expected projects to be an array, but got:', data.value.projects)
            }
        } catch (e) {
            console.error('Error:', e)
        }
    })
})
// async function follow() {
//    
// }

</script>
<style scoped lang="scss">
.searchUserCard {
    padding: 16px 14px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
            text-wrap: balance;
        }
    }

    &__body {
        padding: 0px 2px;

        &__skills {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;

            &__item {
                padding: 3px 10px;
                color: $def-black;
                max-width: fit-content;
                border: 1.5px solid $primary;
                border-radius: 4px;
            }
        }

        &__info {
            margin-top: 16px;
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__button {
            padding: 17px 20px;
            font-size: 13px;
            font-weight: 400;
            line-height: 14px;
            box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
        }
    }
}
</style>