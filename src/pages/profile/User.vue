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
import { onMounted, ref, computed } from 'vue';
import { getPost } from '~/API/ways/user';
import FeedCard from '~/components/feed/FeedCard.vue';

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
const modalState = ref(null);

isAuth();

let data = ref({});
onMounted(async () => {
    await getUserByID(Number(localStorage.getItem("userId"))).then((response) => {
        try {
            data.value = response.data.object;
        } catch (e) {
            console.error('text error:', e);
        }
    })
})
const baseURL = 'http://62.217.181.172/';

const fullAvatarUrl = computed(() => {
    return data.value.pictureUrl ? `${baseURL}files/${data.value.pictureUrl}` : '';
});
const fullBannerUrl = computed(() => {
    return data.value.backgroundPictureUrl ? `${baseURL}files/${data.value.backgroundPictureUrl}` : '';
});
</script>

<style scoped></style>
