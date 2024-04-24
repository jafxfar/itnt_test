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
            <UiInput label="Текст записи*" v-model="props.data.type" />
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
                        </label>
                    </div>
                </div>
            </template>

            <UiInput label="Что мы предлагаем* " class="mt-[48px]" v-model="props.data.offer" />
            <UiButton bg-color="def">Добавить обложку для записи <input type="file"></UiButton>
            <UiButton bg-color="smBlue" class="mt-[48px]">Опубликовать</UiButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import scrip from "~/assets/demo/scrip.svg"
import { defineProps, ref } from 'vue';
import UiButton from './UiButton.vue';
import UiInput from './UiInput.vue';
import UiTextArea from './UiTextArea.vue';

const props = defineProps({
    data: {
        type: Object || Array,
        default: () => [],
    },
    card: {
        type: Boolean,
        default: false,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
});

const showPhotos = ref(false);

const inputIds = Array.from({ length: 5 }, (_, i) => `file-upload-${i}`);
const imageUrls = ref(Array(10).fill(null));
const activeIndex = ref(0);

const handleFileChange = (event: Event, index: number) => {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                imageUrls.value[index] = reader.result.toString(); // Update the image URL at the specified index
                setNextActive(index);
            }
        };
        reader.readAsDataURL(file);
    }
};

const setNextActive = (index: number) => {
    if (index < inputIds.length - 1) {
        activeIndex.value = index + 1;
    } else {
        activeIndex.value = 0;
    }
};

const countUploadedPhotos = () => {
    return imageUrls.value.filter(url => url !== null).length;
};
const removeImage = (index) => {
    imageUrls.value.splice(index, 1);
};

const openFileInput = () => {
    const fileInput = $refs.fileInput;
    fileInput.click();
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
    min-height: 220px;
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
