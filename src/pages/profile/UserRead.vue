<template>
    <Header showID showUserMinify showControlDots />
    <ProfileHeader />

    <v-container class="pa-6" style="padding: 0 20px; margin-bottom: 48px">
        <ProfileInfo
            :userName="userInfo.firstName"
            :userSurname="userInfo.lastName"
            :userDescription="userInfo.fullDescription"
        />
        <UiSkills readOnly />

        <!-- <ProjectsList :projects="userInfo.projects" /> -->
        <ProjectsList class="my-8" :projects="userInfo.projects" />

        <div class="my-8">
            <h1>Что у меня нового:</h1>
            <UiInput  class="mt-2" label="Расскажите, чем запомнился день"/>
        </div>
        <div class="date color-white mb-4 rounded-xl d-inline-block">{{ $t('feed.today') }}</div>

        <ProjectBlog feedCardType="newProjectStage"/>

        <ProjectBlog feedCardType="newProjectPhotos"/>

    </v-container>
    <Footer />
</template>

<script setup lang="ts">
// ui-kit
// import UiButton from '~/components/ui-kit/UiButton.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'

// page components
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ProfileInfo from '~/components/profile/ProfileInfo.vue'
import ProjectsList from '~/components/profile/ProjectsList.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import ProjectBlog from '~/components/ProjectPage/ProjectBlog.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserByID } from '~/API/ways/user.ts'

let userInfo = ref({})
const router = useRoute()

onMounted(async () => {
    await getUserByID(router.params.ID).then((response) => {
        try {
            userInfo.value = response.data.object
        } catch (e) {
            console.error('error:', e)
        }
    })
})
</script>

<style scoped>
/* .date {
    background: rgba(224, 224, 224, 0.5);
    font-size: 13px !important;
    letter-spacing: 0.01em !important;
    padding: 6px 20px;
    line-height: 14px;
} */
</style>
