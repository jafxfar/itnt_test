<script lang="ts">
export default {
    name: 'ProjectsList',
}
</script>
<template>
    <div class="list">
        <div :class="props.showAdder ? 'list__head--showAdder' : 'list__head'">
            <p class="txt-cap2">Участие в проектах:</p>
            <div v-if="props.showAdder" class="blue-small-btn">
                <p class="txt-body1" @click="$router.push('/project/new')">Новый</p>
                <v-icon icon="mdi-plus" size="x-small" />
            </div>
        </div>
        <UiSwitch @changeValue="currentProjects = $event" :items="['Текущие', 'Прошлые']" />
        <template v-if="props.projects">
            <template v-for="(project, id) in visibleProjects" :key="id">
                <ProjectCard v-if="project.relationType !== 'PROJECT_FOLLOWER' && !project.isAnon && !project.isHiden"
                    :projectInfo="project" />
            </template>

            <div v-if="showMoreButton" class="show-more">
                <button @click="showMore" class="show-more-btn">
                    {{ showAllProjects ? 'Скрыть' : `Показать все проекты ` }}
                </button>
                <button @click="showMore" class=" items-center rounded-[8px] px-[10px] gap-0 py-[2px] second-btn">
                    <p class="text-[#1769AA] "> {{ showAllProjects ? '' : filteredProjects.length -
            visibleProjects.length }}
                    </p>
                    <v-icon color="#1769AA" :icon="showAllProjects ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
                </button>
            </div>
        </template>
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import ProjectCard from "../profile/ProjectCard.vue"
import UiSwitch from "../ui-kit/UiSwitch.vue"
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
const currentProjects = ref('Текущие');
const showAllProjects = ref(false);

const filteredProjects = computed(() => {
    if (!props.projects) return [];
    return props.projects.filter(project =>
        project.relationType !== 'PROJECT_FOLLOWER' && !project.isAnon && !project.isHiden
    );
});

const visibleProjects = computed(() => {
    return showAllProjects.value ? filteredProjects.value : filteredProjects.value.slice(0, 3);
});

const showMoreButton = computed(() => {
    return filteredProjects.value.length > 3;
});

const showMore = () => {
    showAllProjects.value = !showAllProjects.value;
};

</script>


<style lang="scss" scoped>
.show-more {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 14px;
    width: 100%;
    margin-bottom: 4px;
    border-radius: 0 0 12px 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    gap: 16px;
}

.show-more-btn {
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    color: #29B6F6;
}

.second-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E1F5FE;

}

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