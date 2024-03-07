<template>
    <v-container class="error">
        <div class="error__container">
            <p>ОШИБКА 404</p>
            <img style="width: 100%" class="my-6" src="../assets/img/error.png" />
            <p>Ссылка, по которой вы перешли - ведёт на несуществующую страницу</p>
        </div>

        <div class="error__actions">
            <UiButton class="mb-9" bgColor="gray" @click="$router.push('/me')">Вернуться на главную</UiButton>
            <p @click="modalState.open()">Сообщить об ошибке</p>
        </div>
    </v-container>

    <vue-bottom-sheet ref="modalState">
        <div class="mb-12 px-5">
            <p>Добавить комментарий:</p>
            <UiInput class="my-6" label="Расскажите подробнее:" v-model="errorFeedBack" />
            <UiButton bgColor="gray">Отправить</UiButton>
        </div>
    </vue-bottom-sheet>
</template>

<script setup lang="ts">
import UiButton from '~/components/ui-kit/UiButton.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
// TODO: make 404 error request
import { ref } from 'vue'
const modalState = ref(false)
const errorFeedBack = ref(null)
</script>

<style lang="scss" scoped>
.error {
    display: flex;
    flex-direction: column;
    gap: 70px;
    justify-content: space-between;
    &__container {
        border-radius: 12px;
        background: linear-gradient(180deg, #2e3a48 0%, #212933 100%);
        color: $def-white;
        padding-top: 24px;
        padding-bottom: 54px;
    }
    &__actions {
        text-align: center;
    }
}
</style>
