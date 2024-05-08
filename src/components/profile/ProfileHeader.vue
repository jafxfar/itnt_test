<template>
    <div v-if="props.readOnly" class="userPics">
        <div class="userPics__uploadEdit">
            <img v-show="props.bgPic" :src="props.bgPic" alt="User background picture">
        </div>
        <div class="userPics__ava">
            <img v-show="props.avaPic" :src="props.avaPic" alt="User avatar">
        </div>
    </div>

    <div v-else class="userPics">
        <div @click="openModal" v-if="uploadedBgImageUrl || userStore.bgPicUrl" class="userPics__bg">
            <img v-if="uploadedBgImageUrl" :src="uploadedBgImageUrl" />
            <img v-else-if="userStore.bgPicUrl" :src="userStore.bgPicUrl" />
        </div>

        <v-dialog v-model="searchModalState" width="100%">
            <v-card class="ui-skills__search">
                <p>
                    <span>Изменение фонового изображения</span>
                </p>
                <div class="ui-skills__search__actions">
                    <UiButton @click="removeBackgroundPicture(id)" bgColor="smOutlined" isSmall>Удалить</UiButton>
                    <UiButton bgColor="smOutlined" isSmall>Заменить</UiButton>
                </div>
            </v-card>
        </v-dialog>

        <div class="userPics__ava">
            <img v-if="userStore.pictureUrl" :src="userStore.pictureUrl" />
            <img v-else-if="uploadedAvaImageUrl" :src="uploadedAvaImageUrl" />
        </div>

        <div v-if="!uploadedBgImageUrl" class="userPics__upload">
            <input type="file" ref="bgFileInput" style="display: none;" @change="handleFileInputChange">
            <button class="userPics__btn" @click="uploadBg">
                <img src="/src/assets/Profile/icons.svg" alt="">
            </button>
        </div>

        <div v-if="!uploadedAvaImageUrl" class="userPics__ava">
            <input type="file" ref="avaFleInput" style="display: none;" @change="handleFileAva">
            <button class="" @click="uploadAva">
                <img :src="ava" alt="">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import bg from "~/assets/demo/project-head.svg"
import ava from "~/assets/Profile/Photo.svg"
import { ref } from 'vue'
import { useUserStore } from '~/store/user';
import { postAddUserPicture, postAddBackgroundPicture, deleteUserPicture } from '~/API/ways/user';
import UiButton from '../ui-kit/UiButton.vue';
const userStore = useUserStore();
const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    bgPic: {
        type: String,
        default: bg
    },
    avaPic: {
        type: String,
        default: ava
    }
})
const searchModalState = ref(false)

function openModal() {
    // chosenModalSkill.value = skill
    searchModalState.value = true
}
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
                const response = await postAddBackgroundPicture(formData); // Используйте postAddBackgroundPicture для отправки запроса
                userStore.bgPicUrl = response.data.backgroundPictureUrl; // Используйте URL изображения, возвращенный сервером
                console.log(userStore.bgPicUrl, userStore.pictureUrl) // Обновляем URL аватара в глобальном состоянии
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
                const response = await postAddUserPicture(formData); // Используйте функцию для загрузки аватара
                userStore.pictureUrl = response.data.pictureUrl;
                console.log(userStore.bgPicUrl, userStore.pictureUrl) // Обновляем URL аватара в глобальном состоянии
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

const id = ref<number>(0); // Пример инициализации, возможно, значение придет с props

const removeBackgroundPicture = async (id: Number) => {
    try {
        await deleteUserPicture(id);
        console.log("Изображение успешно удалено");
        searchModalState.value = false; // Закрывает модальное окно после удаления
    } catch (error) {
        console.error("Произошла ошибка при удалении изображения", error);
    }
};
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
        background-size: cover;
        background-position: center;

        img {
            width: 100%;
            min-height: 117px;
            max-height: 117px;
        }
    }


    &__ava {
        position: absolute;
        left: 52%;
        top: 33px;
        transform: translateX(-50%);
        width: 104px;
        height: 104px;
        background-size: cover;
        background-position: center;
        border-radius: 100%;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

        img {
            // border: 1.5px solid #e0e0e0;
            border-radius: 100%;
            cursor: pointer;
            width: 104px;
            height: 104px;
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

    &__uploadEdit {
        width: 100vw;
        height: 120px;
        display: hidden;
    }

    &__btn {
        position: absolute;
        top: 100px;
        right: 7%;
        background-color: white;
        padding: 7px;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    }

}
</style>
