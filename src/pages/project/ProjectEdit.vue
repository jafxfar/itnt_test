<template>
    <Header showID showUserMinify />
    <ProjectHeader />
    <v-container>
        <ProjectCard />
        <ProjectTeam class="mt-12" />
        <!-- <ProjectInvesting /> -->
        <ProjectVacancys class="mt-12" />
        <ProjectMedia class="mt-12" />
        <!-- <ProjectStage /> -->
        <!-- <ProjectStage readOnly /> -->
        <UiButton @click="changeProject" bgColor="blue" class="mt-12"> Опубликовать проект </UiButton>
    </v-container>
    <Footer />
</template>

<script setup lang="ts">
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'

import UiButton from '~/components/ui-kit/UiButton.vue'
import ProjectHeader from '~/components/projects/ProjectHeader.vue'
import ProjectMedia from '~/components/projects/ProjectMedia.vue'
import ProjectTeam from '~/components/projects/ProjectTeam.vue'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectVacancys from '~/components/projects/ProjectVacancys.vue'

import { getProjectByID, patchProject } from '~/API/ways/project'

import { onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useProjectStore } from '~/store/projectStore'

const prjStore = useProjectStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    await getProjectByID(route.params.ID).then((response) => {
        try {
            prjStore.$state.prjObject.name = response.data.object.name
            prjStore.$state.prjObject.slogan = response.data.object.slogan
            prjStore.$state.prjObject.nickName = response.data.object.nickName
            prjStore.$state.prjObject.description = response.data.object.description
            prjStore.$state.prjObject.descriptionHeader = response.data.object.descriptionHeader
            prjStore.$state.prjObject.avatarUrl= response.data.object.avatarUrl
        } catch (e) {
            console.error('error:', e)
        }
    })
})

async function changeProject() {
    prjStore.$state.prjObject.id = route.params.ID
    await patchProject(prjStore.$state.prjObject).then(() => {
        try {
            router.push('/project/' + route.params.ID)
        } catch (e) {
            console.error('error :', e)
        }
    })
}
</script>
