<script lang="ts">
export default {
    name: 'Header',
}
</script>

<template>
    <v-app-bar class="px-4" :elevation="0" height="46" color="white">
        <v-icon class="mr-3" @click="$router.back()" icon="mdi-arrow-left" />

        <img v-show="props.showLogo" src="../assets/img/logos/itntLogoHeader.svg" />

        <h2 @click="copyID" v-show="props.showID">{{ chosenId }}</h2>

        <h2 v-show="props.routeName">{{ props.routeName }}</h2>
        <v-spacer v-if="search === false" />

        <img
            @click="toggleTopModal"
            style="padding: 10px"
            v-if="props.showUserMinify === true"
            src="../assets/demo/ava-small-header.svg"
        />

        <img @click="toggleUserModal" style="padding: 10px" v-if="props.showControlDots" src="../assets/icons/dots-black.svg" />

        <div v-if="props.search" class="d-flex align-center">
            <UiInput noStyle v-model="searchBarValue" />
            <v-spacer />
            <v-icon @click="searchValueByHeader" icon="mdi-magnify" />
        </div>
    </v-app-bar>
    <UserModal v-if="user.userModalState === true" />

    <TopModal v-if="user.topModalState === true" />
</template>

<script lang="ts" setup>
import UserModal from './UserModal.vue'
import TopModal from './TopModal.vue'
import UiInput from './ui-kit/UiInput.vue'

import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/store/user'

import { getProjectsByValue } from '~/API/ways/project'

const router = useRoute()
const user = useUserStore()

const { searchBarValue, searchBarResponse } = storeToRefs(useUserStore())

const props = defineProps({
    showLogo: {
        type: Boolean,
        default: false,
    },
    showID: {
        type: Boolean,
        default: false,
    },
    showUserMinify: {
        type: Boolean,
        default: false,
    },
    showControlDots: {
        type: Boolean,
        default: false,
    },
    search: {
        type: Boolean,
        default: false,
    },
    routeName: {
        type: String,
        default: '',
    },
})

async function searchValueByHeader() {
    await getProjectsByValue(searchBarValue.value).then((response) => {
        console.log(response.data.object.content)
        searchBarResponse.value = response.data.object.content
    })
}

function toggleTopModal() {
    user.topModalState = !user.topModalState
}
function toggleUserModal(){
    user.userModalState = !user.userModalState
}

const chosenId = computed(() => {
    return '@' + (router.params.ID ? router.params.ID : localStorage.getItem('userId'))
})

function copyID() {
    navigator.clipboard.writeText(chosenId.value)
}
</script>
