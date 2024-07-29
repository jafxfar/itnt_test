<template>
    <div class="projectMedia">
        <div class="d-flex mb-3 align-center">
            <p style="color: #263238" class="txt-cap2 mr-5">Вложенные файлы и ссылки</p>
            <!-- <div class="txt-body1" style="color: #9e9e9e">0 / 6</div> -->
        </div>

        <div class="projectMedia__list" v-if="props.readOnly === true">
            <!-- READONLY -->

            <div v-for="(file, index) in validFiles" :key="index" class="projectMedia__item">
                <div style="gap: 10px" class="d-flex align-center">
                    <img src="../../assets/icons/media/video.svg" />
                    <p style="color: #9e9e9e" class="txt-cap1">
                        <a :href="file.pictureUrl" target="_blank" rel="noopener noreferrer">перейти</a>
                    </p>
                </div>
                <p style="color: #29b6f6" class="txt-cap1">{{ truncateUrl(file.pictureUrl) }}</p>
            </div>
            <!-- <div class="projectMedia__item">
                <div style="gap: 10px" class="d-flex align-center">
                    <img src="../../assets/icons/media/video.svg" />
                    <p style="color: #9e9e9e" class="txt-cap1">
                        <a :href="cleanUrl" target="_blank" rel="noopener noreferrer">перейти</a>
                    </p>

                </div>
                <p style="color: #29b6f6" class="txt-cap1">{{ props.link }}</p>
            </div> -->

            <!-- EDITABLE -->
        </div>
        <div class="projectMedia__list" v-if="props.readOnly === false">
            <div @click="modalState.open()" class="projectMedia__item projectMedia__item--adder cursor-pointer">
                <div v-if="uploadedFile">
                    <img :src="uploadedFile" alt="Uploaded file" />
                </div>
                <v-icon v-else icon="mdi-plus" />
                <vue-bottom-sheet ref="modalState">
                    <div class="mx-5 mb-10">
                        <p class="txt-body1 mb-12">
                            Добавьте ссылку на видео-хостинг или загрузите файл в удобное облако и прикрепите ссылку
                            на
                            него.
                        </p>
                        <UiInput id="linkInput" label="Ссылка*" />

                        <UiInput label="Описание ссылки*" class="my-8" />
                        <UiButton @click="submitProjectLink" bgColor="blue">Добавить</UiButton>
                    </div>
                </vue-bottom-sheet>
            </div>
            <div v-for="(file, index) in validFiles" :key="index" class="projectMedia__item">
                <div style="gap: 10px" class="d-flex align-center">
                    <img src="../../assets/icons/media/video.svg" />
                    <p style="color: #9e9e9e" class="txt-cap1">
                        <a :href="file.pictureUrl" target="_blank" rel="noopener noreferrer">перейти</a>
                    </p>
                </div>
                <p style="color: #29b6f6" class="txt-cap1">{{ truncateUrl(file.pictureUrl) }}</p>
            </div>
        </div>

        <!-- <p>Project ID: {{ projectStore.prjObject.id }}</p> -->

    </div>

</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import UiInput from '../ui-kit/UiInput.vue'
import UiButton from '../ui-kit/UiButton.vue'
import { addProjectFile } from '~/API/ways/project';
import { useRoute } from 'vue-router'
const router = useRoute()
const uploadedFile = ref<string | null>(null)

const submitProjectLink = async () => {
    // const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    try {
        const response = await addProjectFile('', Number(router.params.ID), 'https://www.youtube.com/results?search_query=%D0%BA%D0%B0%D0%BA+%D0%BE%D1%81%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D0%B8%D1%82%D1%8C+%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D1%83%D1%8E+%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D1%8C+%D0%BD%D0%B0+%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%D0%B5');
        console.log('Файл успешно добавлен', response);
        // uploadedFile.value = URL.createObjectURL('');
    } catch (error) {
        console.error('Ошибка при добавлении файла', error);
    }
};
const modalState = ref(false)
const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    files: {
        type: Array,
        default: () => []
    },
    link: {
        type: String
    },
    adress: {
        type: String
    }
})
const validFiles = computed(() => {
    return props.files.filter(file => file && file.pictureUrl)
})
function truncateUrl(url) {
    if (!url) return 'Без названия'
    return url.length > 20 ? url.substring(0, 20) + '...' : url
}
</script>

<style lang="scss" scoped>
.projectMedia {
    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    &__item {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 20px 10px 20px 20px;
        max-width: 161px;
        width: 100%;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

        &--adder {
            align-items: center;
            justify-content: center;
            height: 122px;
        }
    }
}
</style>
