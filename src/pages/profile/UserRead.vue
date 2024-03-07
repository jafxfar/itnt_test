<template>
    <Header showID showUserMinify showControlDots />
    <ProfileHeader />

    <v-container style="padding: 0 20px; margin-bottom: 48px">
        <ProfileInfo
            :userName="userInfo.firstName"
            :userSurname="userInfo.lastName"
            :userDescription="userInfo.fullDescription"
        />
        <UiSkills readOnly />

        <!-- <ProjectsList :projects="userInfo.projects" /> -->
        <ProjectsList :projects="userInfo.projects" />
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

<style scoped></style>
