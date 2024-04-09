<script lang="ts">
export default {
    name: 'ProjectsList',
}
</script>

<template>
    <div v-if="projects?.length > 0" class="list">
        <div :class="props.showAdder ? 'list__head--showAdder' : 'list__head'">
            <p class="txt-cap2">Участие в проектах:</p>

            <div v-if="props.showAdder" class="blue-small-btn">
                <p class="txt-body1">Новый</p>
                <v-icon icon="mdi-plus" size="x-small" />
            </div>
        </div>

        <UiSwitch @changeValue="currentProjects = $event" :items="['Текущие', 'Прошлые']" />

        <!-- <div style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05)"> -->
        <template v-for="(project, id) in projects" :key="id">
            <ProjectCard v-if="!project.isAnon && !project.isHiden" :projectInfo="project" />
        </template>
        <!-- </div> -->
    </div>

</template>

<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'
import UiSwitch from '../ui-kit/UiSwitch.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import { ref } from 'vue'

const currentProjects = ref(null)

const props = defineProps({
    projects: {
        type: Array,
        required: true,
    },
    showAdder: {
        type: Boolean,
        default: false,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped>
.list {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__head {
        &--showAdder {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }
    }
}
</style>
