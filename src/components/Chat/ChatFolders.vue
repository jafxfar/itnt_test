<template>
    <div class="folder">
        <div class="folder__item" v-for="folder in folders" :key="folder.id" @click="openFolder(folder.id)">
            {{ folder.name }}
        </div>

        <button class="bg-marine  rounded-[12px] px-1" @click="openModal"><img :src="plus" alt=""></button>
        <v-dialog v-model="searchModalState" width="100%">
            <v-card class="ui-skills__search">
                <p>
                    <span>Введите название для папки</span>
                </p>
                <UiInput :label="'Название папки'" v-model="folderName" />
                <div class="mt-2 ui-skills__search__actions">
                    <UiButton class="cursor-pointer" gColor="smOutlined" @click="closeModal" isSmall>Отмена</UiButton>
                    <UiButton class="cursor-pointer" bgColor="smOutlined" @click="createFolder" isSmall>Подтвердить</UiButton>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import UiInput from '~/components/ui-kit/UiInput.vue';
import plus from '~/assets/modal_icon/plus.svg'
import { ref } from "vue";
import { useRouter } from 'vue-router'
const folderName = ref('');

const router = useRouter();
const folders = ref([
    // { id: 1, name: 'Folder 1' },
    // { id: 2, name: 'Folder 2' },
]);

const openFolder = (id) => {
    router.push(`/messenger/folder/${id}`);
};
const searchModalState = ref(false)
const openModal = () => {
    searchModalState.value = true;
};

const closeModal = () => {
    searchModalState.value = false;
};
const createFolder = () => {
    const newFolder = { id: Date.now(), name: folderName.value };
    folders.value.push(newFolder);
    folderName.value = ''; // Reset the input field
    closeModal(); // Close the modal
};
</script>

<style scoped lang="scss">
.folder {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px;

    &__item {
        cursor: pointer;
        font-weight: 500;
        letter-spacing: 1%;
        line-height: 14px;
    }
}
</style>