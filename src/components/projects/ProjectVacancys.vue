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
            <UiButton @click="modalState.open()" fit style="height: 36px; padding: 11px 16px; font-size: 16px" isSmall>
                Архив
            </UiButton>
            <vue-bottom-sheet ref="modalState">
                <div class="min-h-[350px]">
                    <p class="mb-2 px-4 py-2">Архив ваших вакансий:</p>
                    <div class="searchTeammateModal__items" v-for="item in editableModalItems">
                        <v-expansion-panels box-shadow="none">
                            <v-expansion-panel class="feedPanel">
                                <v-expansion-panel-title overlay="none" class="feedPanel__head">
                                    <template v-slot:actions="{ expanded }">
                                        <v-icon class="bg-[#e1f5fe] px-6 py-3 rounded-xl" color="#1769AA"
                                            :icon="expanded ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                                    </template>
                                    <div class="projectTeam__item d-flex justify-space-between">
                                        <div class="d-flex projectTeam__item__main">
                                            <div class="txt-body2">
                                                <p style="color: #263238">{{ item.name }}</p>
                                                <p style="color: #9e9e9e">{{ item.role }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <UiVacancyPanel card :data="demoVacancy" />
                                    <UiButton bg-color="smBlue" @click="sendProp">Опубликовать</UiButton>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </div>

            </vue-bottom-sheet>
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
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref } from 'vue'
import { sendProposition } from '~/API/ways/notifications'
import {useRoute} from 'vue-router'
const router = useRoute()

const sendProp = async () => {
    console.log(localStorage.getItem('userId'),router.params.ID );
    
    if (localStorage.getItem('userId') && router.params.ID){
        try {
            const response = await sendProposition( router.params.ID,1, 'vacancy',"PROJECT_TO_USER")
            console.log(response)
        } catch (error) {
            console.error('Error sending proposition:', error)
        }
    }
}

const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
})
const modalState = ref(null)

const demoVacancy = {
    type: 'Driver',
    description: `Ищем надёжного джентельмена, со своим транспортным средством, желательно без растительности на голове, c суровым взглядом и парой пушек в багажнике. 
Вам можно доверить доставку любого груза/человека в любую точку земного шара.`,
    offer: 'Доля в компании + ЗП + оплата расходников на авто и парикмахера',
}
const editableModalItems: modalActionsList[] = [
    {
        name: 'PR manager',
        icon: 'account',
    },
    {
        name: 'PR manager',
        icon: 'account',
    },
]
</script>

<style scoped lang="scss">
.searchTeammateModal {
    &__items {
        display: flex;
        flex-direction: column;
        gap: 10px;

    }

    &__item {
        display: flex;
        align-items: center;
        gap: 16px;
    }
}
</style>
