<template>
    <Header showID showUserMinify showControlDots />
    <ProjectHeader readOnly :prj-name="data.name" :prjID="data.id" :prj-slogan="data.slogan" />
    <v-container>
        <ProjectCard readOnly class="mt-12" :prj-desc-body="data.description" :prj-desc-head="data.descriptionHeader" />
        <ProjectTeam :team="data.users" class="mt-12" readOnly />
        <ProjectVacancys class="mt-12" readOnly />
        <ProjectMedia class="mt-12" readOnly />
    </v-container>
    <Footer />
</template>

<script setup lang="ts">
// import ProjectStage from '~/components/projects/ProjectStage.vue'
import { onMounted, ref } from 'vue'
import { getProjectByID } from '~/API/ways/project.ts'
import { useRoute } from 'vue-router'

let data = ref({})
const route = useRoute()
onMounted(async () => {
    await getProjectByID(route.params.ID).then((response) => {
        try {
            data.value = response.data.object
        } catch (e) {
            console.error('error:', e)
        }
    })
})

import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'

import ProjectHeader from '~/components/projects/ProjectHeader.vue'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectMedia from '~/components/projects/ProjectMedia.vue'
import ProjectTeam from '~/components/projects/ProjectTeam.vue'
import ProjectVacancys from '~/components/projects/ProjectVacancys.vue'
</script>
