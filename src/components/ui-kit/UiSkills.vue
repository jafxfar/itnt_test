<script lang="ts">
export default {
    name: 'UiSkills',
}
</script>

<template>
    <v-card v-if="props.skillsType != 'Project'" class="ui-skills">
        <div class="ui-skills__head" v-if="props.readOnly === false">
            <p class="txt-cap2">{{ $t('me.skills') }} </p>
            <div v-if="deleteMode === false" @click="modalState.open()" class="ui-skills__btn">
                <p class="txt-body1">{{ $t('me.add') }} </p>
                <v-icon icon="mdi-plus" size="x-small" />
            </div>
            <div v-else @click="deleteMode = false" class="ui-skills__btn">
                <p class="txt-body1">{{ $t('me.cancel') }} </p>
            </div>
            <div v-if="chosenSkills?.length > 0" @click="deleteMode = true" class="ui-skills__trash">
                <img src="../../assets/icons/trash.svg" alt="" />
            </div>
        </div>
        <div class="ui-skills__list">
            <div v-for="(skill, id) in chosenSkills" :key="id">
                <div @click="openModal(skill)" class="ui-skills__skill txt-body1">{{ skill }}</div>
            </div>
        </div>
    </v-card>
    <div class="ui-skills__projects" v-else>
        <div @click="openModal(skill)" class="ui-skills__projects__tag" v-for="(skill, id) in chosenSkills" :key="id">
            <p class="txt-body2">{{ skill }}</p>
        </div>
        <div v-show="chosenSkills.length < 3" @click="modalState.open()" class="ui-skills__projects__tag">
            <v-icon size="x-small" icon="mdi-plus" />
        </div>
    </div>
    <!-- TODO: убрать логику модалки в имзенение проекта  -->
    <v-dialog v-model="searchModalState" width="100%">
        <v-card class="ui-skills__search">
            <p>
                <span v-show="props.skillsType === 'Project'"> Найти: </span>
                <span v-show="props.skillsType != 'Project'">Найти специалистов с навыком: </span>
                <span>{{ chosenModalSkill }}</span>
            </p>
            <div class="ui-skills__search__actions">
                <UiButton @click="searchModalState = false" bgColor="smOutlined" isSmall> Отмена </UiButton>
                <UiButton bgColor="smBlue" isSmall>Найти</UiButton>
            </div>
        </v-card>
    </v-dialog>
    <vue-bottom-sheet :full-screen="true" ref="modalState">
        <div class="scroll">
            <div class="txt-body1 mb-2 mx-4">Выбрано : {{ chosenSkills.length }}</div>
            <UiInput class="mx-4" label="Введите навык для поиска" />
            <div class="ui-skills__choser mt-2 " v-for="(skillObj, skill, id) in skills" :key="id">
                <div class="ui-skills__choser" v-for="(skill, id) in skillObj" :key="id">
                    <p v-if="skill.title" class="text-[#29b6f6] text-lg mx-5 ml-[3%] ui-skills__choser__title">
                        {{ skill.title }}
                    </p>
                    <p @click="addSkill(skill.name)" v-if="skill.name" class="txt-body1 ui-skills__choser__skill"
                        :class="{ 'skill-chosen': chosenSkills.includes(skill.name) }">
                        {{ skill.name }}
                    </p>
                </div>
            </div>
            <UiAgree @click="modalState.close()" />
        </div>
        <div class="scroll">
            <div class="h-44 xl:h-4 lg:h-4 md:h-36"></div>
        </div>
    </vue-bottom-sheet>
</template>
<script lang="ts" setup>
// ui-kit
import UiInput from './UiInput.vue'
import UiButton from './UiButton.vue'
import UiAgree from './UiAgree.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref, Ref } from 'vue'
import { skills } from '~/helpers/skills'
// import { storeToRefs } from 'pinia'
// import { useProjectStore } from '~/store/projectStore'
// const { prjObject } = storeToRefs(useProjectStore())
const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    skillsType: {
        type: String,
    },
})
const deleteMode = ref(false)
// const searchProjectTagsModalState = ref(false)
const chosenModalSkill = ref(null)
const modalState = ref(false)
const searchModalState = ref(false)
function openModal(skill: any) {
    chosenModalSkill.value = skill
    searchModalState.value = true
}
const addSkill = (skillName) => {
    const index = chosenSkills.value.indexOf(skillName);
    if (index !== -1) {
        chosenSkills.value.splice(index, 1);
    } else {
        chosenSkills.value.push(skillName);
    }
}
// const demoSkills: Ref<Array<string>> = ref(['User Experience Designer (UX)', 'Team Lead', 'Product Owner'])
const chosenSkills: Ref<Array<string>> = ref([])
</script>

<style lang="scss">
.scroll {
  scroll-behavior: smooth;
}
.selected {
    background-color: #FFEBEE;
    border: 1px solid red;
    color: white;
}

.skill-chosen {
    background-color: #E1F5FE;
    margin-bottom: 1px;
}

.ui-skills {
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    &__head {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 17.5px;
        gap: 25px;
    }

    &__btn {
        display: flex;
        align-items: center;
        background: $primary;
        color: white;
        max-width: 133px;
        width: 100%;
        justify-content: center;
        padding: 5px 10px 5px 12px;
        gap: 4px;
        border-radius: 100px;
    }

    &__trash {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        width: 31px;
        height: 31px;
        background: #ff3d00;
        box-shadow: 0px 3px 6px -3px #ff3d00;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    &__search {
        padding: 40px 30px 30px 30px;
        border-radius: 20px !important;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05) !important;

        p {
            margin-bottom: 24px;
            text-align: center;
        }

        &__actions {
            display: flex;
            justify-content: space-between;
        }
    }

    &__skill {
        padding: 6px 16px;
        color: $def-black;
        max-width: fit-content;
        border: 1.5px solid $primary;
        border-radius: 8px;
    }

    &__choser {
        display: flex;
        flex-direction: column;
        margin-bottom: 0px;
        &__title {
            margin-bottom: 12px;
            color: $def-gray;
        }

        &__skill {
            padding: 9px 0px 7px 47px;
            color: $def-black;
        }
    }

    &__projects {
        display: flex;
        gap: 8px;

        &__tag {
            padding-top: 6px;
            width: 100%;
            border: 1px solid #e0e0e0;

            border-radius: 8px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 7px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
        }
    }
}
</style>