<template>
    <Header showUserMinify showControlDots />
    <ProjectHeader />
    <v-container>
        <ProjectCard />

        <UiButton @click="postNewProject" class="mt-12" bgColor="blue">Опубликовать проект</UiButton>
    </v-container>
    <Footer />
</template>

<script setup lang="ts">
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'
import UiButton from '~/components/ui-kit/UiButton.vue'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectHeader from '~/components/projects/ProjectHeader.vue'
// import ProjectMedia from '~/components/projects/ProjectMedia.vue'
// import ProjectVacancys from '~/components/projects/ProjectVacancys.vue'

import { postProject } from '~/API/ways/project'

import { useProjectStore } from '~/store/projectStore'

const prjStore = useProjectStore()

async function postNewProject() {
    await postProject(prjStore.$state.prjObject).then((response: any) => {
        try {
            console.log(response)
        } catch (e) {
            console.log('error : ', e)
        }
    })
}
</script>
