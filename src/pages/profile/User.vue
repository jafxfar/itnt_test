<template>
    <Header showID :showUserMinify="true" />
    <ProfileHeader :read-only="true" :bg-pic="userStore.bgPicUrl" :ava-pic="userStore.pictureUrl" />
    <v-container style="padding: 0 20px; margin-bottom: 48px">
        <ProfileInfo :read-only="true" />
        <UiSkills />

        <!-- <ProjectsList :projects="userInfo.projects" /> -->
        <ProjectsList class="mt-12" :projects="userInfo.projects" />
        <UiButton class="mt-4" @click="$router.push('/project/new')" bgColor="blue">Создать проект</UiButton>

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

        <div v-for="(post, id) in feedInfo" :key="id" class="mt-6">
            <FeedCard :post="post" :post-desc-header="post.descriptionHeader || 'Нет заголовка'"
                :post-desc="post.description || 'Нет описания к посту'" />
        </div>
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
import { getUserByID } from '~/API/ways/user.ts'
import { isAuth } from '~/helpers/routerHandler'
import { useUserStore } from '~/store/user'; // убедитесь, что путь корректный
import { onMounted, ref } from 'vue';
import { getPost } from '~/API/ways/user';
import FeedCard from '~/components/feed/FeedCard.vue';
import { getUserPropositions,getUserNotifications } from '~/API/ways/notifications'
onMounted (async () => {
    //есть 6 ответов в id 1
    await getUserNotifications(1).then((response) => {
        try {
            console.log('response', response)
        } catch (e) {
            console.error('text error:', e)
        }
    })
})

onMounted (async () => {
    //есть 2 ответа в userId 1
    await getUserPropositions(5).then((response) => {
        try {
            console.log('response', response)
        } catch (e) {
            console.error('text error:', e)
        }
    })
})
let posts = ref();
let feedInfo = ref();
const userId = Number(localStorage.getItem('userId'));

const getPosts = async () => {
    try {
        const data = await getPost(userId);
        posts.value = data;
        feedInfo.value = data;
    } catch (error) {
        console.error(error);
    }
};
onMounted(getPosts);
const userStore = useUserStore(); // Инициализируйте userStore
let userInfo = ref({})
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
let data = ref()
onMounted(async () => {
    await getUserByID(Number(localStorage.getItem("userId"))).then((response) => {
        try {
            data.value = response.data.object
        } catch (e) {
            console.error('text error:', e)
        }
    })
})

</script>

<style scoped></style>
