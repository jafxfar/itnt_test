<template>
    <div class="userInfo">
        <div class="userInfo__head">
            <h2 class="mb-1">{{ userStore.firstName }} {{ userStore.lastName }}</h2>
            <!-- <h2 class="mb-1">{{ props.userName }} {{ props.userSurname }}</h2> -->

            <p class="txt-body1">{{ userStore.country }} {{ userStore.city }}</p>
        </div>

        <!-- Статус предложений -->
        <div class="flex flex-row justify-between">
            <!-- Отображение статуса -->
            <div class="userInfo__status">
                <p class="userInfo__status__title txt-body1">{{ getProjectsTypeLabel() }}</p>
                <img src="../../assets/icons/footer/message.svg" alt="" />
            </div>
            <button v-if="props.readOnly" @click="changeImageColor" class="bg-white p-[10px] rounded-[12px] shadow-md">
                <img :src="imageUrl" alt="" />
            </button>
            <div class="" v-else></div>
        </div>
    </div>

    <div class="userInfo__body mb-[24px]">
        <div class="txt-body1">
            {{ userStore.description }}
            <!-- Я сюда припёрся, чтобы нормально постартапить! Ждал нормального стартапа с нормальными мужиками. © Легенда -->
            <!-- {{ props.userDescription }} -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import follow from "~/assets/modal_icon/follow.svg"
import star from "~/assets/modal_icon/star-filled.svg"

import { ref } from 'vue';
import { useUserStore } from '~/store/user'
const userStore = useUserStore()
// 'userCity', 'userCountry'
const projectsType = ref(0); // Инициализация переменной, которая будет содержать выбранный тип проекта

const imageUrl = ref<string>(follow);
const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
})
function changeImageColor() {
    imageUrl.value = star;
}
function getProjectsTypeLabel(): string {
  // Если projectsType равен 0, возвращаем "Открыт к предложениям", иначе "Закрыт к предложениям"
  return projectsType.value === 0 ? "Открыт к предложениям" : "Закрыт к предложениям";
}
// const props = defineProps(['userName', 'userSurname', 'userDescription'])
</script>

<style lang="scss" scoped>
.userInfo {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;

    &__status {
        padding: 5.5px 14px;
        align-items: center;
        display: flex;
        max-width: fit-content;
        border: 1.5px solid $primary;
        border-radius: 8px;
        gap: 9px;

        &__title {
            color: $primary;
        }
    }
}
</style>
