<template>
    <Header showID :showUserMinify="true" />
    <ProfileHeader :read-only="true" :bg-pic="userStore.bgPicUrl" :ava-pic="userStore.pictureUrl" />
    <v-container style="padding: 0 20px; margin-bottom: 48px">
        <ProfileInfo :userName="userInfo.firstName" :userSurname="userInfo.lastName"
            :userDescription="userInfo.description" :status="status" />
        <UiSkills />

        <!-- <ProjectsList :projects="userInfo.projects" /> -->
        <ProjectsList class="mt-12 mb-4" :projects="userInfo.projects" />
        <UiButton @click="$router.push('/project/new')" bgColor="blue">Создать проект</UiButton>

        <div class="mt-[48px]">
            <h1>Что у меня нового:</h1>
            <UiButton @click="modalState.open()" bgColor="def">Расскажите, чем запомнился день</UiButton>
            <!-- <UiInput  class="mt-2" label="Расскажите, чем запомнился день"/> -->
        </div>

        <vue-bottom-sheet ref="modalState">
            <div class="min-h-[350px]">
                <div class="searchTeammateModal__items">
                    <UiPost card :data="demoVacancy" />
                </div>
            </div>

        </vue-bottom-sheet>
    </v-container>
    <Footer />
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import UiPost from '~/components/ui-kit/UiPost.vue'
import UiButton from '~/components/ui-kit/UiButton.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'
import ProfileInfo from '~/components/profile/ProfileInfo.vue'
import ProjectsList from '~/components/profile/ProjectsList.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import { onMounted, ref } from 'vue'
import { getUserByID } from '~/API/ways/user.ts'
import { isAuth } from '~/helpers/routerHandler'
import { useUserStore } from '~/store/user'; // убедитесь, что путь корректный
import { computed } from 'vue';


const userStore = useUserStore(); // Инициализируйте userStore
const projectsType = computed(() => userStore.$state.projectsType); const userInfo = ref({}); // Инициализируйте userInfo
const modalState = ref(null)

// console.log($cookies.get('jwtToken'))
// const editableModalItems: modalActionsList[] = [
//     {
//         name: 'Открыть профиль',
//         icon: 'account',
//     },
//     {
//         name: 'Настроить полномочия',
//         icon: 'account',
//     },
//     {
//         name: 'Удалить человека из проекта',
//         icon: 'account',
//     },
//     {
//         name: 'Передать полномочия владельца проекта',
//         icon: 'account',
//     },
// ]
isAuth()

onMounted(async () => {
    await getUserByID().then((response) => {
        try {
            userInfo.value = response.data.object
        } catch (e) {
            console.error('text error:', e)
        }
    })
})
</script>

<style scoped></style>
