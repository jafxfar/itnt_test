<template>
    <Header showUserMinify showID />
    <ProfileHeader />
    <v-container>
        <div class="userEdit mt-4">
            <UiInput v-model="user.firstName" class="mb-4" label="Имя" />
            <UiInput v-model="user.lastName" class="mb-4" label="Фамилия" />
            <v-select v-model="user.country" variant="outlined" label="Страна" class="mb-2" color="active"
                :items="Object.keys(list)" hide-details></v-select>
            <v-select v-model="user.city" :disabled="user.country ? false : true" variant="outlined" color="active"
                label="Выберите город" :items="(list as any)[user.country]"></v-select>
        </div>
        <div class="mb-[48px] mt-[32px]">
            <UiCoop @change-value="projectsType = $event"
                :items="['Мне не интересно сотрудничество', 'Я хочу получать предложения о сотрудничестве']" />
        </div>

        <div class="about">
            <UiTextArea :rules="[(v) => v.length <= 300 || 'Max 300 characters']" label="О себе"
                v-model="user.fullDescription" />
        </div>

        <div class="userEdit__components">
            <UiSkills />
            <div>
                <div class="flex justify-between">
                    <p>Учасьте в проектах</p>
                    <div class="ui-skills__btn">
                        <p @click="$router.push('/project/new')" class="txt-body1">Новый </p>
                        <v-icon icon="mdi-plus" size="x-small" />
                    </div>
                </div>

                <UiSwitch @change-value="projectsType = $event" :items="['Текущие', 'Прошлые']" />
                <ProjectsList class="mt-12" :projects="userInfo.projects" />
            </div>

            <!-- <UiSwitch v-if="projectsType === 1" @change-value="topProjectsData = $event" :items="['Неделя', 'Месяц', 'Год']" /> -->

            <div v-for="(project, id) in projectsInfo" :key="id" class="mt-6">
                <RatingProjectCard :listID="++id" :projectInfoSet="project" />
            </div>

            <!-- <ProjectsList showAdder /> -->
        </div>

        <div class="date mb-4 color-white rounded-xl d-inline-block">{{ $t('feed.today') }}</div>

        <div class="mt-[48px]">
            <p>Что у меня нового:</p>
            <UiButton @click="modalState.open()" bgColor="def">Расскажите, чем запомнился день</UiButton>
            <!-- <UiInput  class="mt-2" label="Расскажите, чем запомнился день"/> -->
        </div>
        <vue-bottom-sheet ref="modalState">
            <div class="min-h-[350px]">
                <div class="searchTeammateModal__items">
                    <UiPost card :data="demoVacancy" />
                </div>
            </div>

        </vue-bottom-sheet>
        <div class="date color-white mb-8 rounded-xl d-inline-block">{{ $t('feed.today') }}</div>

        <div class="mb-16">

            <ProjectBlog user-type="me" feedCardType="newProjectStage" />

            <ProjectBlog user-type="me" feedCardType="newProjectPhotos" />
        </div>


    </v-container>

    <UiAgree @click="patchUserInfo()" />
</template>

<script setup lang="ts">
import UiPost from '~/components/ui-kit/UiPost.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import UiButton from '~/components/ui-kit/UiButton.vue'
import Header from '~/components/Header.vue'
import UiAgree from '~/components/ui-kit/UiAgree.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import ProjectsList from '~/components/profile/ProjectsList.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'
import UiTextArea from '~/components/ui-kit/UiTextArea.vue'
import UiCoop from '~/components/ui-kit/UiCoop.vue'
import UiSwitch from '~/components/ui-kit/UiSwitch.vue'
import ProjectBlog from '~/components/projects/ProjectBlog.vue'
import RatingProjectCard from '~/components/projects/RatingProjectCard.vue'
import Arr from '~/helpers/set'
import { ref, reactive, onMounted } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { getUserByID, patchUser } from '~/API/ways/user'
let userInfo = ref({})
const modalState = ref(null)

const list = ref(Arr)
const projectsType = ref(0)
const topProjectsData = ref(null)

let projectsInfo = ref({})

let user = reactive({
    city: null,
    country: null,
    firstName: null,
    lastName: null,
    openedForProposition: true,
    roles: [''],
    shortDescription: '',
    fullDescription: null,
})

onMounted(async () => {
    await getUserByID().then((response) => {
        try {
            let data = response.data.object

            user.firstName = data.firstName
            user.lastName = data.lastName
            user.fullDescription = data.fullDescription
        } catch (e) {
            console.error('error:', e)
        }
    })
})

async function patchUserInfo() {
    await patchUser(user).then(() => {
        try {
            router.push('/me')
        } catch (e) {
            console.error('error :', e)
        }
    })
}
</script>

<style lang="scss" scoped>
.userEdit {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__components {
        display: flex;
        flex-direction: column;
        gap: 48px;
        margin-top: 48px;
    }
}

.about {
    position: relative;
    height: auto;
}

.about-before {
    position: absolute;
    bottom: -37px;
    right: 10px;
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
}
</style>
