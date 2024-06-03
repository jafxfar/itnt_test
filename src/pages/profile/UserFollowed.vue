<template>
    <Header showID showUserMinify showControlDots />
    <div v-for="(project, idx) in followed" :key="idx" class="searchProjectCard m-4">
        <div class="searchProjectCard__head">
            <div class="d-flex align-center">
                <img class="mr-3" width="37" height="37" src="../../assets/demo/ava-small-header.svg" />
                <div>
                    <div class="d-flex align-center">
                        <p class="txt-body3">{{ project.project.name }}</p>
                    </div>
                    <p class="searchProjectCard__head__subtitle txt-cap1">
                        {{ project.project.slogan }}
                        {{ project.project.id }}
                    </p>
                </div>
            </div>
            <UiButton  @click="follow(project.project.id)" style="max-width: 152px">{{ isFollowing ? 'Отписаться' :'Подписаться' }}</UiButton>
        </div>
    </div>
    <Footer />
</template>

<script setup lang="ts">
// ui-kit
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import UiButton from '~/components/ui-kit/UiButton.vue'

import { onMounted, ref } from 'vue'
import { getUserByID } from '~/API/ways/user.ts'
import { addFollow } from '~/API/ways/project'
let data = ref({})
let followed = ref([])
const isFollowing = ref(true)


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
async function follow() {
    try {
        const response = await addFollow(Number(9), Number(localStorage.getItem("userId")));
        console.log(response);
        isFollowing.value = false
    } catch (error) {
        console.error('Ошибка при подписке на проект:', error);
    }
}

</script>
<style scoped lang="scss">
.searchProjectCard {
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
        margin-bottom: 16px;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
            text-wrap: balance;
        }
    }

    &__body {
        &__slider {
            display: flex;
            gap: 11px;
            -ms-overflow-style: none;
            /* Internet Explorer 10+ */
            scrollbar-width: none;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                display: none;
                /* Safari and Chrome */
            }
        }

        &__info {
            &__title {
                margin-top: 24px;
                margin-bottom: 12px;
            }
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