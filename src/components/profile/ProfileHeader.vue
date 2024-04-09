<template>
    <div class="userPics">
        <div class="userPics__bg" v-if="props.bgPic">
            <img :src="`http://62.217.181.172:8080/var/itnt-files/${props.bgPic}`" />
        </div>
        <div class="userPics__ava" v-if="props.avaPic">
            <img alt="ava" :src="`http://62.217.181.172:8080/var/itnt-files/${props.avaPic}`" />
        </div>

        <!-- Загрузка банера -->

        <div class="userPics__upload bg-[FAFAFA] px-[20px]" v-if="!props.bgPic && !uploadedBgImage">
            <input type="file" ref="fileInput" style="display: none;" @change="handleFileInputChange">
            <button class="userPics__btn" @click="uploadBg">
                <img src="/src/assets/Profile/icons.svg" alt="">
            </button>
        </div>
        <!--  -->

        <!-- Загрузка аватарки -->
        <div class="userPics__ava" v-if="!props.avaPic && !uploadedAvaImage">
            <input type="file" ref="fileInput" style="display: none;" @change="handleFileAva">
            <button class="" @click="uploadAva">
                <img src="/src/assets/Profile/Photo.svg" alt="">
            </button>
        </div>
        <!-- Отоброжение банера -->
        <div v-if="uploadedBgImage" :style="{ backgroundImage: `url(${uploadedBgImage})` }" class="userPics__bg"></div>

        <!-- Отоброжение аватарки -->
        <div v-if="uploadedAvaImage" :style="{ backgroundImage: `url(${uploadedAvaImage})` }" class="userPics__ava">
            <img :src="`url(${uploadedAvaImage})`" alt="">
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
    avaPic: {
        type: String,
    },
    bgPic: {
        type: String,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
})
const fileInput = ref<HTMLInputElement | null>(null);
const uploadedBgImage = ref<string>('');
const uploadedAvaImage = ref<string>('');

const handleFileInputChange = () => {
    const files = fileInput.value?.files;
    if (files && files.length > 0) {
        const selectedFile = files[0];
        const reader = new FileReader();
        reader.onload = () => {
            uploadedBgImage.value = reader.result as string;
        };
        reader.readAsDataURL(selectedFile);
    }
}
const uploadBg = () => {
    fileInput.value?.click();
}

const handleFileAva = () => {
    const files = fileInput.value?.files;
    if (files && files.length > 0) {
        const selectedFile = files[0];
        const reader = new FileReader();
        reader.onload = () => {
            uploadedAvaImage.value = reader.result as string;
        };
        reader.readAsDataURL(selectedFile);
    }
}
const uploadAva = () => {
    fileInput.value?.click();
}
</script>

<style lang="scss" scoped>
.userPics {
    position: relative;
    margin-bottom: 32px;
    background-size: cover;
    height: auto;
    background-position: center;

    &__bg {
        width: 100%;
        height: 117px;
        background-size: cover;
        background-position: center;
    }

    &__ava {
        position: absolute;
        left: 36%;
        right: 50%;
        top: 33px;
        width: 104px;
        height: 104px;
        background-size: cover;
        background-position: center;
        border-radius: 100%;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
        @media (min-width:480px) {
            left: 44%;
        }
        img {
            // border: 1.5px solid #e0e0e0;
            border-radius: 100%;
        }
    }

    &__upload {
        align-items: end;
        justify-content: end;
        // width: 100%;
        height: 120px;
        display: flex;
    }

    &__btn {
        background-color: white;
        padding: 7px;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    }

}
</style>
