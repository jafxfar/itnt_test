<template>
    <Header showID showUserMinify showControlDots />
    <ProfileHeader readOnly />

    <v-container class="pa-6" style="padding: 0 20px; margin-bottom: 48px">
        <ProfileInfo
            :read-only="true"
            :userName="data.firstName"
            :userSurname="data.lastName"
            :userDescription="data.fullDescription"
        />
        <UiSkills readOnly />

        <ProjectsList class="my-8" :projects="data.projects" />
        <div class="date color-white mb-4 rounded-xl d-inline-block">{{ $t('feed.today') }}</div>

        <ProjectBlog userType="user" feedCardType="newProjectStage"/>

        <ProjectBlog user-type="user" feedCardType="newProjectPhotos"/>

    </v-container>
    <Footer />
</template>

<script setup lang="ts">
// ui-kit
// import UiButton from '~/components/ui-kit/UiButton.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'
// page components
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ProfileInfo from '~/components/profile/ProfileInfo.vue'
import ProjectsList from '~/components/profile/ProjectsList.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import ProjectBlog from '~/components/projects/ProjectBlog.vue'
import { onMounted, ref } from 'vue'
import { getUserByID } from '~/API/ways/user.ts'
// import { useRoute } from 'vue-router'

let data = ref({})
onMounted(async () => {
    await getUserByID(Number(localStorage.getItem('userId'))).then((response) => {
        try {
            data.value = response.data.object
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
