<template>
    <div class="userPics">
        <!-- Отображение загруженного баннера -->
        <div  v-if="uploadedBgImageUrl || props.bgPic" class="userPics__bg">
            <img v-if="props.bgPic" :src="`http://62.217.181.172:8080/var/itnt-files/${props.bgPic}`" />
            <img v-if="uploadedBgImageUrl" :src="uploadedBgImageUrl" />
        </div>

        <!-- Отображение загруженной аватарки -->
        <div v-if="uploadedAvaImageUrl || props.avaPic" class="userPics__ava">
            <img v-if="props.avaPic" :src="`http://62.217.181.172:8080/var/itnt-files/${props.avaPic}`" />
            <img v-if="uploadedAvaImageUrl" :src="uploadedAvaImageUrl" />
        </div>

        <!-- Загрузка баннера -->
        <div v-if="!uploadedBgImageUrl && !props.bgPic" class="userPics__upload">
            <input type="file" ref="bgFileInput" style="display: none;" @change="handleFileInputChange">
            <button class="userPics__btn" @click="uploadBg">
                <img src="/src/assets/Profile/icons.svg" alt="">
            </button>
        </div>

        <!-- Загрузка аватарки -->
        <div v-if="!uploadedAvaImageUrl && !props.avaPic" class="userPics__ava">
            <input type="file" ref="avaFleInput" style="display: none;" @change="handleFileAva">
            <button class="" @click="uploadAva">
                <img src="/src/assets/Profile/Photo.svg" alt="">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { postAddUserPicture, postAddBackgroundPicture } from '~/API/ways/user';

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
const bgFileInput = ref<HTMLInputElement | null>(null);
const uploadedBgImageUrl = ref<string>('');

const avaFleInput = ref<HTMLInputElement | null>(null);
const uploadedAvaImageUrl = ref<string>('');

const handleFileInputChange = () => {
    const files = bgFileInput.value?.files;
    if (files && files.length > 0) {
        const selectedFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile); // Асинхронное чтение файла
        reader.onload = async () => {
            uploadedBgImageUrl.value = reader.result as string;
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const response = await postAddBackgroundPicture(formData);
                console.log('success:', response);
            } catch (error) {
                console.error('error:', error);
            }
        };
    }
}

const handleFileAva = () => {
    const files = avaFleInput.value?.files;
    if (files && files.length > 0) {
        const selectedFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile); // Асинхронное чтение файла
        reader.onload = async () => {
            uploadedAvaImageUrl.value = reader.result as string;
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const response = await postAddUserPicture(formData);
                console.log('success:', response);
            } catch (error) {
                console.error('error:', error);
            }
        };
    }
}

const uploadBg = async () => {
    bgFileInput.value?.click();
}

const uploadAva = async () => {
    avaFleInput.value?.click();
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
        left: 50%;
        right: 50%;
        top: 33px;
        width: 104px;
        height: 104px;
        background-size: cover;
        background-position: center;
        border-radius: 100%;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
        @media (max-width:567px) {
            left: 36%;
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
        padding: 0px 20px;
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
