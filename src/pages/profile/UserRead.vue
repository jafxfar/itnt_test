<template>
    <Header showID showUserMinify showControlDots />
    <ProfileHeader :bg-pic="fullBannerUrl" :ava-pic="fullAvatarUrl" readOnly />
    <v-container class="pa-6" style="padding: 0 20px; margin-bottom: 48px">
        <div v-if="!hasData">
            <ProfileInfo :profile="true" :userName="data.firstName" :userSurname="data.lastName"
                :userDescription="data.fullDescription" />
            <p class="text-center text-[18px] font-[16px]">Пользователь ещё не поделился подробной информацией о себе и своих
                навыках.</p>
        </div>
        <div class="" v-else>
            <ProfileInfo :profile="true" :userName="data.firstName" :userSurname="data.lastName"
                :userDescription="data.fullDescription" />
            <UiSkills readOnly />
            <ProjectsList class="my-8" :projects="data.projects" />
        </div>
    </v-container>
    <!-- <UiInput v-model="data.firstName" class="mb-4" label="Имя" :required="true" />
    <UiInput v-model="data.lastName" class="mb-4" label="Фамилия" :required="true" />
    <UiInput v-model="data.fullDescription" class="mb-4" label="Фамилия" :required="true" />

    <button @click="changeUser">clicked</button> -->

    <Footer />
</template>

<script setup lang="ts">
// ui-kit
// import UiButton from '~/components/ui-kit/UiButton.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
// page components
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import ProfileInfo from '~/components/profile/ProfileInfo.vue'
import ProjectsList from '~/components/profile/ProjectsList.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import ProjectBlog from '~/components/projects/ProjectBlog.vue'
import { onMounted, ref, computed } from 'vue'
import { getUserByID, patchUser } from '~/API/ways/user.ts'
import { useRoute } from 'vue-router'
const route = useRoute();
let data = ref({})

onMounted(async () => {
    try {
        const userId = route.params.id;
        const response = await getUserByID(Number(userId));
        data.value = response.data.object;
        // data.value.firstName = '';
        // data.value.lastName = '';
        // data.value.fullDescription = '';
        console.log(response);
    } catch (e) {
        console.error('error:', e);
    }
})

// const changeUser = async () => {
//     try {
//         await patchUser(data.value);
//         console.log('clicked');
//         // router.push('/me')
//     } catch (e) {
//         console.error('error :', e);
//     }
// }
const hasData = computed(() => {
    const excludedKeys = ['id', 'login', 'confirmed', 'loginType', 'errorConfirm', 'firstEntry', '', '', '']
    return Object.entries(data.value).some(([key, value]) => {
        return !excludedKeys.includes(key) && value !== null && value !== '' && (Array.isArray(value) ? value.length > 0 : true)
    })
})
const baseURL = 'http://62.217.181.172/';

const fullAvatarUrl = computed(() => {
    return data.value.pictureUrl ? `${baseURL}files/${data.value.pictureUrl}` : '';
});
const fullBannerUrl = computed(() => {
    return data.value.backgroundPictureUrl ? `${baseURL}files/${data.value.backgroundPictureUrl}` : '';
});
</script>

<style scoped></style>
