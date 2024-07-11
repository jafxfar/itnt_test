<template>
    <Header showID :showUserMinify="true" />
    <ProfileHeader :read-only="true" :bg-pic="fullBannerUrl" :ava-pic="fullAvatarUrl" />
    <v-container style="padding: 0 20px; margin-bottom: 48px">
        <ProfileInfo :read-only="true" />
        <UiSkills />

        <UiButton class="mt-4" @click="$router.push('/project/new')" bgColor="blue">Создать проект</UiButton>

        <div class="mt-[48px]">
            <h1>Что у меня нового:</h1>
            <UiButton @click="modalState.open()" bgColor="def">Расскажите, чем запомнился день</UiButton>
        </div>

        <vue-bottom-sheet ref="modalState">
            <div class="min-h-[350px]">
                <div class="searchTeammateModal__items">
                    <UiPost card :data="demoVacancy" />
                </div>
            </div>
        </vue-bottom-sheet>
        <!-- {{ userInfo.projects }} -->
        <ProjectsList class="mt-12" :projects="userInfo.projects" />
        <div class="" v-for="(prj, id) in userInfo.projects" :key="id">
            <!-- {{ prj.relationType }} -->
            <ProjectsList v-show="prj.relationType == 'PROJECT_OWNER'" class="mt-12" :projects="[prj.project]" />
        </div>
        <div v-for="(post, id) in posts" :key="id" class="mt-6">
            <div class="" v-for="(object, id) in post.object" :key="id">
                <FeedPost :post="object" :id="object.id" />
            </div>
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
import { onMounted, ref, computed } from 'vue';
import { getPost } from '~/API/ways/user';
import FeedPost from '~/components/feed/FeedPost.vue';
import {projectStatByID} from "~/API/ways/project-stat"
let posts = ref();

const getPosts = async () => {
    try {
        const data = await getPost();
        posts.value = data;
    } catch (error) {
        console.error(error);
    }
};
let stat = ref()
// const projectStatByIDAPI = async () => {
//     try {
//         const data = await projectStatByID('sds',10, 'sdsd');
//         stat.value = data;
//     } catch (error) {
//         console.error(error);
//     }
// };
onMounted(getPosts);
// onMounted(projectStatByIDAPI)
const modalState = ref(null);

isAuth();

let userInfo = ref({});
onMounted(async () => {
    await getUserByID(Number(localStorage.getItem("userId"))).then((response) => {
        try {
            userInfo.value = response.data.object;
            console.log(userInfo.value)
        } catch (e) {
            console.error('text error:', e);
        }
    })
})
const ownerProjects = computed(() => {
    return userInfo.value?.projects?.filter(project => project.relationType === 'PROJECT_OWNER') || [];
});
const baseURL = 'http://62.217.181.172/';

const fullAvatarUrl = computed(() => {
    return userInfo.value.pictureUrl ? `${baseURL}files/${userInfo.value.pictureUrl}` : '';
});
const fullBannerUrl = computed(() => {
    return userInfo.value.backgroundPictureUrl ? `${baseURL}files/${userInfo.value.backgroundPictureUrl}` : '';
});
</script>

<style scoped></style>
