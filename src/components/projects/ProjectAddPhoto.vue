<template>
    <div>
        <!-- Счетчик загруженных фотографий -->
        <div class="m-2">
            <p>Презентация {{ countUploadedPhotos() }} / 8</p>
        </div>

        <!-- Форма загрузки фотографий -->
        <draggable class="photo-upload" v-model="imageUrls" @end="onEnd">
            <template #item="{ element, index }">
                <div :key="index" class="upload-wrapper">
                    <label :for="inputIds[index]"
                        :class="['file-upload-label', { 'with-image': element }]"
                        :style="{ backgroundImage: element ? 'url(' + element + ')' : 'none' }">
                        <input :id="inputIds[index]" type="file" @change="handleFileChange($event, index)"
                            accept="image/*" />
                        <span class="icon" v-show="!element">
                            <v-icon icon="mdi-plus" />
                        </span>
                        <div>
                            <!-- Отображение иконки, если файл не является изображением и был добавлен -->
                            <span class="file-icon flex justify-center"
                                v-show="fileNames[index] && !isImageType(fileTypes[index])">
                                <img :src="file" alt="">
                            </span>
                            <!-- Отображение имени файла внутри блока фотографии, если файл не является изображением -->
                            <p class="text-center" v-show="fileNames[index] && !isImageType(fileTypes[index])">{{ truncateFileName(fileNames[index]) }}</p>
                        </div>
                        <button v-show="fileNames[index]" @click="deleteFile(index)" class="delete p-1">
                            <div class="rounded-[50%] bg-[#FFEBEE] p-[2px]">
                                <v-icon icon="mdi-close" />
                            </div>
                        </button>
                    </label>
                </div>
            </template>
        </draggable>
        <div class="text-center">
            <v-snackbar color="white" v-model="snackbar" multi-line>
                {{ text }}
                <template v-slot:actions v-if="showContent">
                    <v-btn color="#29B6F6" variant="text" @click="snackbar = false">Отменить</v-btn>
                </template>
            </v-snackbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import file from "~/assets/icons/media/ppt-blue.svg";
import draggable from 'vuedraggable';

const inputIds = Array.from({ length: 8 }, (_, i) => `file-upload-${i}`);
const imageUrls = ref(Array(8).fill('')); // Инициализируем пустыми строками вместо null
const fileTypes = ref(Array(8).fill(''));
const fileTypeText = ref('');
const fileNames = ref(Array(8).fill(''));
const snackbar = ref(false);
const showContent = ref(false);
const text = ref('I am a multi-line snackbar.\nI can have more than one line. This is another line that is quite long.');

watch(snackbar, (newValue) => {
    if (newValue) {
        showContent.value = false;
        setTimeout(() => {
            showContent.value = true;
        }, 3000);
    }
});

const handleFileChange = (event: Event, index: number) => {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            fileNames.value[index] = file.name;
        } else {
            fileNames.value[index] = '';
        }
        fileTypes.value[index] = file.type;
        fileTypeText.value = file.type;
        fileNames.value[index] = file.name;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                imageUrls.value[index] = reader.result.toString();
            }
        };
        reader.readAsDataURL(file);
    }
};

const truncateFileName = (fileName: string): string => {
    if (fileName && fileName.length > 7) {
        return fileName.substring(0, 7) + '...';
    }
    return fileName;
};

const countUploadedPhotos = () => {
    return imageUrls.value.filter(url => url !== '').length;
};

const isImageType = (type: string | null): boolean => {
    return type ? type.startsWith('image/') : false;
};

const deleteFile = (index: number) => {
    imageUrls.value[index] = '';
    fileNames.value[index] = '';
    fileTypes.value[index] = '';
    snackbar.value = true;
};

const onEnd = (event: any) => {
    console.log('Sorted images:', imageUrls.value);
};
</script>

<style scoped lang="scss">
.photo-upload {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
}

.upload-wrapper {
    flex-basis: calc(25% - 12px); /* 2 колонки */
}

.file-upload-label {
    display: flex;
    position: relative;
    width: 100%;
    height: 220px;
    background-color: white;
    cursor: pointer;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #E0E0E0;
    border-radius: 12px;
    margin-bottom: 10px;
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease; /* Добавление плавности */
}

.upload-wrapper.dragging {
    transition: transform 0.3s ease; /* Добавление плавности */
}

.delete {
    position: absolute;
    right: -8px;
    bottom: -8px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
}

.file-upload-label.with-image {
    height: 220px;
    width: 100%;
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
