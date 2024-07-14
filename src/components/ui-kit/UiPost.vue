<script lang="ts">
export default {
    name: 'UiPost',
}
</script>

<template>
    <div class="card" style="padding: 15px; padding-bottom: 20px">
        <div class="d-flex mb-2">
            <p>Публикация новой записи</p>
            <v-spacer />
        </div>

        <div class="ui-vacancyPanel__inputs">
            <UiInput label="Текст записи*" v-model="localData.type" />
            <!-- <UiTextArea label="Описание*"  v-model="props.data.description" /> -->

            <!-- Показываем кнопку "Добавить фотографии" только если блок фотографий не отображается -->
            <template v-if="!showPhotos">
                <UiButton bg-color="def" :img-src="scrip" @click="showPhotos = true">Добавить фотографии</UiButton>
            </template>

            <!-- Отображаем блок с фотографиями если showPhotos равно true -->
            <template v-else>
                <div class="photo-upload flex w-full flex-wrap">
                    <div v-for="(inputId, index) in inputIds" :key="index" class="upload-wrapper">
                        <label :for="inputId"
                            :class="['file-upload-label', { 'with-image': imageUrls[index], 'active': index === activeIndex }]"
                            :style="{ backgroundImage: 'url(' + imageUrls[index] + ')' }">
                            <input :id="inputId" type="file" @change="handleFileChange($event, index)" accept="image/*"
                                :disabled="index !== activeIndex" />
                            <span class="icon" v-show="!imageUrls[index]">
                                <v-icon icon="mdi-plus" />
                            </span>
                            <div class="">
                                <!-- Отображение иконки, если файл не является изображением и был добавлен -->
                                <span class="file-icon flex justify-center"
                                    v-show="fileNames[index] && !isImageType(fileTypes[index])">
                                    <img :src="file" alt="">
                                </span>
                                <!-- Отображение имени файла внутри блока фотографии, если файл не является изображением -->
                                <p class="text-center" v-show="fileNames[index] && !isImageType(fileTypes[index])">{{
                truncateFileName(fileNames[index])
            }}</p>
                            </div>
                            <button v-show="fileNames[index]" @click="deleteFile(index)" class="delete p-1">
                                <div class="rounded-[50%] bg-[#FFEBEE] p-[2px]">
                                    <v-icon icon="mdi-close" />
                                </div>
                            </button>
                        </label>
                    </div>
                </div>
            </template>

            <UiInput label="Что мы предлагаем* " class="mt-[48px]" v-model="localData.offer" />
            <UiButton bg-color="def">Добавить обложку для записи <input type="file"></UiButton>
            <UiButton @click="postBlog" bg-color="smBlue" class="mt-[48px]">Опубликовать</UiButton>
        </div>
    </div>
    <!-- <v-snackbar color='white' rounded="lg" v-model="snackbar" :timeout="timeout">
        <div class="snacbar">
            <img :src="trashBlack" alt="">
            Навык удалён
        </div>
        <template v-slot:actions>
            <v-btn color="blue" variant="text" @click="cancelDelete">
                Отмена
            </v-btn>
        </template>
    </v-snackbar> -->
</template>

<script lang="ts" setup>
import trashBlack from '~/assets/demo/trash_black.svg';
import scrip from "~/assets/demo/scrip.svg";
import UiButton from './UiButton.vue';
import UiInput from './UiInput.vue';
import file from "~/assets/icons/media/ppt-blue.svg";
import { addPost } from "~/API/ways/user";
import { usePostStore } from '~/store/post';
import { ref, watch, withDefaults } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const postStore = usePostStore();
// const snackbar = ref(true);
// const timeout = 2000;

const props = withDefaults(defineProps<{
    data?: {
        type: string;
        offer: string;
    };
    author: {
        type: string,
    }
}>(), {
    data: {
        type: '',
        offer: '',
    },
});

const localData = ref({ ...props.data });

const deleteFile = (index: number) => {
    imageUrls.value[index] = null;
    fileNames.value[index] = null;
    fileTypes.value[index] = null;
    snackbar.value = true;
    if (index < activeIndex.value) {
        activeIndex.value = index;
    } else if (index === activeIndex.value && index > 0) {
        activeIndex.value = index - 1;
    }
};

watch(() => props.data, (newVal) => {
    if (newVal) {
        localData.value = { ...newVal };
    }
});

const postBlog = async () => {
    const { type, offer } = localData.value;
    const authorUser = Number(localStorage.getItem("userId"));
    const authorProject = route.params.ID
    if (props.author = "User") {
        try {
            const response = await addPost(type, offer, authorUser);
            postStore.addPost(response.data.object);
            console.log(postStore.posts);
        } catch (e) {
            console.error('error:', e);
        }
    }
    if (props.author = "Project") {
        try {
            const response = await addPost(type, offer, authorProject);
            postStore.addPost(response.data.object);
            console.log(postStore.posts);
        } catch (e) {
            console.error('error:', e);
        }
    }
}

const showPhotos = ref(false);
const inputIds = Array.from({ length: 5 }, (_, i) => `file-upload-${i}`);
const imageUrls = ref(Array(5).fill(null));
const activeIndex = ref(0);
const fileTypes = ref(Array(5).fill(null));
const fileTypeText = ref('');
const fileNames = ref(Array(5).fill(null));

const handleFileChange = (event: Event, index: number) => {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
        fileNames.value[index] = !file.type.startsWith('image/') ? file.name : null;
        fileTypes.value[index] = file.type;
        fileTypeText.value = file.type;

        const reader = new FileReader();
        reader.onload = () => {
            imageUrls.value[index] = reader.result?.toString() || null;
            setNextActive(index);
        };
        reader.readAsDataURL(file);
    }
};

const setNextActive = (index: number) => {
    activeIndex.value = (index < inputIds.length - 1) ? index + 1 : 0;
};

const truncateFileName = (fileName: string): string => {
    return fileName && fileName.length > 7 ? `${fileName.substring(0, 7)}...` : fileName;
};

const isImageType = (type: string | null): boolean => {
    return !!type?.startsWith('image/');
};
</script>


<style lang="scss" scoped>
.ui-vacancyPanel {
    &__head {
        padding: 10px 20px;
        display: flex;
        gap: 10px;
        align-items: center;
        max-width: fit-content;
        border-radius: 8px;
        background: #e1f5fe;
    }

    &__inputs {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    &--card {
        border-radius: 12px;
        background: $def-white;
        padding: 23px 20px !important;
    }
}

.photo-upload {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
}

.upload-wrapper {
    flex-basis: calc(20% - 12px);
}

.file-upload-label {
    display: flex;
    min-width: 100%;
    min-height: 120px;
    background-color: white;
    cursor: pointer;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #E0E0E0;
    border-radius: 12px;
    margin-bottom: 10px;
    background-size: cover;
    cursor: default;
    background-position: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    position: relative;

    .delete {
        position: absolute;
        right: -8px;
        bottom: -8px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    }
}

@media (max-width: 576px) {
    .file-upload-label {
        min-height: 110px;
    }
}

@media (max-width: 440px) {
    .file-upload-label {
        min-height: 110px;
    }
}

@media (max-width: 380px) {
    .file-upload-label {
        min-height: 100px;
    }
}


.file-upload-label.with-image {
    min-height: 120px;
    min-width: 100%;
}

@media (max-width: 576px) {
    .file-upload-label.with-image {
        min-height: 110px;
    }
}

@media (max-width: 440px) {
    .file-upload-label.with-image {
        min-height: 110px;
    }
}

@media (max-width: 380px) {
    .file-upload-label.with-image {
        min-height: 100px;
    }
}

.file-upload-label.active {
    cursor: pointer;
}

input[type="file"] {
    display: none;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
}
</style>
