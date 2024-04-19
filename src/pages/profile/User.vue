<template>
    <Header showID showUserMinify />
    <ProfileHeader :bg-pic="userInfo.pictureUrl" :ava-pic="userInfo.pictureUrl" />
    <v-container style="padding: 0 20px; margin-bottom: 48px">
        <ProfileInfo
            :userName="userInfo.firstName"
            :userSurname="userInfo.lastName"
            :userDescription="userInfo.fullDescription"
        />
        <UiSkills />
        
        <!-- <ProjectsList :projects="userInfo.projects" /> -->
        <ProjectsList class="mt-12 mb-4" :projects="userInfo.projects" />
        <UiButton @click="$router.push('/project/new')" bgColor="blue">Создать проект</UiButton>

        <div class="mt-[48px]">
            <h1>Что у меня нового:</h1>
            <UiInput  class="mt-2" label="Расскажите, чем запомнился день"/>
        </div>
    </v-container>
    <Footer />
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

import UiButton from '~/components/ui-kit/UiButton.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'
import ProfileInfo from '~/components/profile/ProfileInfo.vue'
import ProjectsList from '~/components/profile/ProjectsList.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import { onMounted, ref } from 'vue'
import { getUserByID } from '~/API/ways/user.ts'
import { isAuth } from '~/helpers/routerHandler'
let userInfo = ref({})

// console.log($cookies.get('jwtToken'))

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
