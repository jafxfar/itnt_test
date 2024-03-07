<template>
    <Header showUserMinify showID />
    <ProfileHeader />
    <v-container>
        <div class="userEdit">
            <UiInput v-model="user.firstName" class="mb-4" label="Имя" />
            <UiInput v-model="user.lastName" class="mb-4" label="Фамилия" />
            <v-select
                v-model="user.country"
                variant="outlined"
                label="Страна"
                class="mb-2"
                color="active"
                :items="Object.keys(list)"
                hide-details
            ></v-select>
            <v-select
                v-model="user.city"
                :disabled="user.country ? false : true"
                variant="outlined"
                color="active"
                label="Выберите город"
                :items="(list as any)[user.country]"
            ></v-select>
        </div>

        <div class="about">
            <UiTextArea
                :rules="[(v) => v.length <= 300 || 'Max 300 characters']"
                label="О себе"
                v-model="user.fullDescription"
            />
        </div>

        <div class="userEdit__components">
            <UiSkills />
            <ProjectsList showAdder />
        </div>
    </v-container>

    <UiAgree @click="patchUserInfo()" />
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import UiAgree from '~/components/ui-kit/UiAgree.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'
import UiTextArea from '~/components/ui-kit/UiTextArea.vue'
import ProjectsList from '~/components/profile/ProjectsList.vue'
import Arr from '~/helpers/set'
import { ref, reactive, onMounted } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { getUserByID, patchUser } from '~/API/ways/user'

const list = ref(Arr)

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
</style>
