<script lang="ts">
export default {
    name: 'ProjectStage',
}
</script>

<template>
    <div class="projectStage">
        <div class="projectStage__head mb-5">
            <div>
                <img src="../../assets/icons/projectStages/A.svg" />
            </div>

            <v-icon v-if="props.readOnly === false" @click="modalState.open()" icon="mdi-dots-vertical" />
        </div>

        <div class="projectStage__stage txt-cap2 mb-2">Пре-сид раунд (Pre-seed) - первые шаги проекта</div>
        <!-- <v-card-title class="title-stage pa-0 pl-2">{{ projectStage }}</v-card-title> -->

        <p class="mb-5 txt-cap1">
            На этой стадии создатели инвестируют собственные средства. О временных рамках и лимитах финансирования
            говорить не приходится. Стартаперы стремятся привлечь максимум денег как можно быстрее
        </p>

        <div v-if="props.readOnly === false" class="projectStage__footer">
            <UiButton bg-color="blue">Выбрать этот этап</UiButton>
            <UiButton bg-color="def">Вы сейчас на этой стадии</UiButton>
        </div>
        <!-- <v-card-text v-show="check === false">
                <v-btn @click="check_btn" block x-large class="text-capitalize font-weight-regular button-blue">
                    Выбрать <span class="text-lowercase">этот</span><span class="text-lowercase">этап</span>
                </v-btn>
            </v-card-text>
            <v-card-text class="pt-0" v-show="check === true">
                <v-btn block x-large class="this_stage text-capitalize font-weight-regular">
                    Вы <span class="text-lowercase">сейчас</span><span class="text-lowercase">на</span
                    ><span class="text-lowercase">этом</span><span class="text-lowercase">этапе</span>
                </v-btn>
            </v-card-text> -->
    </div>

    <vue-bottom-sheet max-height="115px" full-screen ref="modalState">
        <div>213</div>
    </vue-bottom-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UiButton from '../ui-kit/UiButton.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'

const modalState = ref(false)
const stages = ['PRE-SEED', 'SEED', 'A-1', 'A-2', 'B-1', 'C', 'D']
const chosenStage = ref(null)

const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    projectStage: {
        type: String,
        default: 'A-1',
    },
})
</script>

<style lang="scss" scoped>
.projectStage {
    border-radius: 12px;
    padding: 20px 10px 30px 20px;
    background: $def-white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__stage {
        border-left: 5px solid #29b6f6;
        padding-left: 10px;
    }
}
.card {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05) !important;
    border-radius: 12px !important;
}

// .we-linear {
//     width: 5px;
//     height: 28px;
//     background-color: #29b6f6;
//     border-radius: 8px;
// }

.we-linear-purple {
    width: 5px;
    height: 28px;
    background: linear-gradient(96.78deg, #ce0efe -0.02%, #9012de 94.31%);
    border-radius: 8px;
}

.we-linear-green {
    width: 5px;
    height: 28px;
    background: linear-gradient(96.78deg, #0efe51 -0.02%, #12dea1 94.31%);
    border-radius: 8px;
}

.we-linear-orange {
    width: 5px;
    height: 28px;
    background: linear-gradient(96.78deg, #ffaf13 -0.02%, #ff7313 94.31%);
    border-radius: 8px;
}

.button-blue {
    color: #fff;
    max-width: 152px;
    background: linear-gradient(96.78deg, #13d5ff -0.02%, #12a1de 94.31%);
    border: 1px solid #12b7ec;
    box-sizing: border-box;
    box-shadow: 0 22px 22px -17px #29b6f6;
    border-radius: 12px;
}

.button-green {
    color: #000;
    max-width: 152px;
    background: linear-gradient(96.78deg, #0efe51 -0.02%, #12dea1 94.31%);
    box-shadow: 0 22px 22px -17px #29f67b;
    border-radius: 12px;
}

.button-purple {
    color: #fff;
    max-width: 152px;
    background: linear-gradient(96.78deg, #ce0efe -0.02%, #9012de 94.31%);
    box-shadow: 0 22px 22px -17px #9c29f6;
    border-radius: 12px;
}

.button-orange {
    color: #fff;
    max-width: 152px;
    background: linear-gradient(96.78deg, #ffaf13 -0.02%, #ff7313 94.31%);
    box-shadow: 0 22px 22px -17px #f68b29;
    border-radius: 12px;
}

.title-stage {
    font-size: 15px;
    line-height: 14px;
    max-width: 270px;
}

.card-text {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.01em;
}

.bottom-sheet-card-linear {
    margin: auto;
    background: #e0e0e0;
    border-radius: 5px;
    width: 32px;
    height: 3px;
}

.this_stage {
    background: #ffffff !important;
    border: 1px solid rgba(158, 158, 158, 0.2) !important;
    box-shadow: 0 23px 10px -23px rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
    border-radius: 12px;
}

// @media screen and (max-width: 360px) {
//     .img-stage {
//         width: 234px !important;
//     }

//     .title-stage {
//         max-width: 260px !important;
//     }
// }
</style>
