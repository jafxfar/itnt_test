<template>
    <div v-if="props.readOnly">
        <div class="d-flex mb-3 align-center">
            <p style="color: #263238" class="txt-cap2 mr-5">Будем рады видеть в команде:</p>
        </div>
        <UiVacancyPanel card readOnly :data="demoVacancy" />
    </div>
    <div v-else>
        <div class="d-flex mb-3 align-center justify-space-between">
            <p style="color: #263238" class="txt-cap2 mr-5">Открытые вакансии</p>
            <UiButton fit style="height: 36px; padding: 11px 16px; font-size: 16px" isSmall>Архив</UiButton>
        </div>
        <UiVacancyPanel card :data="demoVacancy" />
        <div class="d-flex mt-2 justify-space-between align-center">
            Добавить вакансию
            <UiButton plus />
        </div>
    </div>
</template>

<script setup lang="ts">
import UiVacancyPanel from '../ui-kit/UiVacancyPanel.vue'
import UiButton from '../ui-kit/UiButton.vue'

const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
})

const demoVacancy = {
    type: 'Driver',
    description: `Ищем надёжного джентельмена, со своим транспортным средством, желательно без растительности на голове, c суровым взглядом и парой пушек в багажнике. 
Вам можно доверить доставку любого груза/человека в любую точку земного шара.`,
    offer: 'Доля в компании + ЗП + оплата расходников на авто и парикмахера',
}
</script>

<style scoped></style>
