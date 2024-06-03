<script lang="ts">
export default {
    name: 'Header',
}
</script>

<template>
    <v-app-bar class="px-4" :elevation="0" height="46" color="white">
        <v-icon class="mr-3" @click="$router.back()" icon="mdi-arrow-left" />

        <img v-show="props.showLogo" :src="user.pictureUrl" />

        <h2 @click="copyID" v-show="props.showID">{{ chosenId }}</h2>

        <h2 v-show="props.routeName">{{ props.routeName }}</h2>
        <v-spacer v-if="search === false" />

        <img
            @click="toggleTopModal"
            style="padding: 10px"
            v-if="props.showUserMinify === true"
            :src="user.userObj.pictureUrl" />
            
        <img @click="toggleUserModal" style="padding: 10px" v-if="props.showControlDots" :src="dots" />
        <img @click="toggleProjectModal" style="padding: 10px" v-if="props.showControlDotsProject" :src="dots" />

        <div v-if="props.search" class="d-flex w-full align-center">
            <!-- <UiInput noStyle v-model="searchBarValue" /> -->
            <v-spacer />
            <v-icon icon="mdi-magnify" />
        </div>
    </v-app-bar>
    <UserModal v-if="user.userObj.userModalState === true" />

    <TopModal v-if="user.userObj.topModalState === true" />
</template>

<script lang="ts" setup>
import dots from "~/assets/icons/dots-black.svg"
import UserModal from './UserModal.vue'
import TopModal from './TopModal.vue'
// import UiInput from './ui-kit/UiInput.vue'

// import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/store/user'

// import { getProjectsByValue } from '~/API/ways/project'

const router = useRoute()
const user = useUserStore()

// const { searchBarValue, searchBarResponse } = storeToRefs(useUserStore())

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
    showControlDotsProject: {
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


function toggleTopModal() {
    user.userObj.topModalState = !user.userObj.topModalState
}
function toggleUserModal(){
    user.userObj.userModalState = !user.userObj.userModalState
}
function toggleProjectModal(){
    user.userObj.userModalState = !user.userObj.userModalState
}
const chosenId = computed(() => {
    return '@' + (router.params.ID ? router.params.ID : localStorage.getItem('userId'))
})

function copyID() {
    navigator.clipboard.writeText(chosenId.value)
}
</script>
