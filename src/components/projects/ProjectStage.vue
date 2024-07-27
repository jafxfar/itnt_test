<script lang="ts">
export default {
    name: 'ProjectStage',
}
</script>

<template>
    <div class="projectStage">
        <div class="projectStage__head mb-5">
            <div v-for="(icon, index) in icons" :key="index" class="icons"
                @click="setContent(icon.Class, icon.title, icon.content)">
                <img :src="icon.src" />
            </div>
            <v-icon v-if="!props.readOnly" @click="modalState.open()" icon="mdi-dots-vertical" />
        </div>

        <div :class="currentClass" class="projectStage__stage we-linear-blue txt-cap mb-2">
            <v-card-title class="pa-0 pl-3">{{ title }}</v-card-title>
        </div>

        <p v-html="content" class="mb-5 txt-cap1"></p>

        <div v-if="!props.readOnly" class="projectStage__footer">
            <UiButton bg-color="blue">Выбрать этот этап</UiButton>
        </div>
    </div>
    <div class="projectStage hidden">
        <div class="projectStage__head mb-5">
            <div>
                <img src="../../assets/icons/projectStages/A.svg" />
            </div>

            <v-icon v-if="props.readOnly === false" @click="modalState.open()" icon="mdi-dots-vertical" />
        </div>


        <div class="projectStage__stage we-linear-blue txt-cap mb-2">
            <v-card-title class="pa-0  pl-3">Сид раунд (Seed-раунд)</v-card-title>
        </div>

        <p class="mb-5 txt-cap1">
            На этой стадии привлекают от 25 тыс до
            1 млн $.
            Деньги нужны для того, чтобы завершить разработку прототипа или довести его до требований рынка.

            Главный продукт - программа, итогом сид раунда должен стать финальный релиз программы.

            Основная сложность - показать инвесторам перспективы проекта и правильно оценить необходимый объем
            финансирования.
        </p>

        <div v-if="props.readOnly === false" class="projectStage__footer">
            <!-- <UiButton bg-color="blue">Выбрать этот этап</UiButton> -->
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
    <div class="projectStage hidden">
        <div class="projectStage__head mb-5">
            <div>
                <img src="../../assets/icons/projectStages/B.svg" />
            </div>

            <v-icon v-if="props.readOnly === false" @click="modalState.open()" icon="mdi-dots-vertical" />
        </div>

        <div class="projectStage__stage we-linear-green txt-cap mb-2">
            <v-card-title class="pa-0  pl-3">Ангельский раунд</v-card-title>
        </div>

        <p class="mb-5 txt-cap1">
            Главная особенность ангельского раунда в том, что стартапы привлекают скорее не инвесторов, а менторов.
            Помощь бизнес-ангелов в организации всех процессов бывает настолько существенной, что финансы часто уходят
            на второй план. Ангельский раунд можно назвать и разновидностью seed раунда. Главная сложность здесь -
            вовремя понять, что вашему стартапу нужны не только деньги, но и организационная поддержка. И, конечно,
            бывает непросто найти инвестора и ментора в одном лице.
        </p>

        <div v-if="props.readOnly === false" class="projectStage__footer">
            <UiButton bg-color="blue">Выбрать этот этап</UiButton>
            <!-- <UiButton bg-color="def">Вы сейчас на этой стадии</UiButton> -->
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
    <div class="projectStage hidden">
        <div class="projectStage__head mb-5">
            <div>
                <img src="../../assets/icons/projectStages/B.svg" />
            </div>

            <v-icon v-if="props.readOnly === false" @click="modalState.open()" icon="mdi-dots-vertical" />
        </div>

        <div class="projectStage__stage we-linear-green txt-cap mb-2">
            <v-card-title class="pa-0  pl-3">Раунд А (Stage A)</v-card-title>
        </div>

        <p class="mb-5 txt-cap1">
            Эта стадия наступает если стартап успешно прошел сид-раунд. Стартапы привлекают суммы от 500 тысяч долларов.

            Основные задачи:

            организовать серийное производство (постоянную работу сервиса);
            нанять полноценную команду.

            Раунд А может быть первым для компании, если предыдущие задачи основатели стартапа решили собственными
            ресурсами.
        </p>

        <div v-if="props.readOnly === false" class="projectStage__footer">
            <UiButton bg-color="blue">Выбрать этот этап</UiButton>
            <!-- <UiButton bg-color="def">Вы сейчас на этой стадии</UiButton> -->
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
    <div class="projectStage hidden">
        <div class="projectStage__head mb-5">
            <div>
                <img src="../../assets/icons/projectStages/NULL.svg" />
            </div>

            <v-icon v-if="props.readOnly === false" @click="modalState.open()" icon="mdi-dots-vertical" />
        </div>

        <div class="projectStage__stage we-linear-purple txt-cap mb-2">
            <v-card-title class="pa-0  pl-3">Раунд B (Stage B)</v-card-title>
        </div>

        <p class="mb-5 txt-cap1">
            На этой стадии происходит масштабирование компаний. Раунд B начинается когда стартап достигает финансовых
            показателей, оговоренных с инвесторами на стадии А.

            Среди задач этого этапа:

            рост прибыли;
            завоевание новых рынков сбыта продукции;
            расширение охвата в занятой нише.

            Возможные риски:

            неэффективная работа команды;
            непонимание того, как достичь задач;
            неправильные решения при масштабировании.
        </p>

        <div v-if="props.readOnly === false" class="projectStage__footer">
            <UiButton bg-color="blue">Выбрать этот этап</UiButton>
            <!-- <UiButton bg-color="def">Вы сейчас на этой стадии</UiButton> -->
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
    <div class="projectStage hidden">
        <div class="projectStage__head mb-5">
            <div>
                <img src="../../assets/icons/projectStages/D.svg" />
            </div>

            <v-icon v-if="props.readOnly === false" @click="modalState.open()" icon="mdi-dots-vertical" />
        </div>

        <div class="projectStage__stage we-linear-purple txt-cap mb-2">
            <v-card-title class="pa-0  pl-3">Раунд C (Stage C) </v-card-title>
        </div>


        <p class="mb-5 txt-cap1">
            Перед компанией и ее создателями стоит задача - достичь самоокупаемости. Стартап становится прибыльным
            только на стадии раунда C. После этого раунда компания способна существовать самостоятельно.

            Главная сложность в том, чтобы наконец превратить смелый эксперимент в стабильный и прогнозируемый
            бизнес-проект. До этой стадии доходят далеко не все стартапы. Очень многие не достигают успеха из-за
            недостатка знаний и опыта, неспособности мыслить как бизнесмен, а не просто креативить.
        </p>

        <div v-if="props.readOnly === false" class="projectStage__footer">
            <UiButton bg-color="blue">Выбрать этот этап</UiButton>
            <!-- <UiButton bg-color="def">Вы сейчас на этой стадии</UiButton> -->
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
    <div class="projectStage hidden">
        <div class="projectStage__head mb-5">
            <div>
                <img src="../../assets/icons/projectStages/C.svg" />
            </div>

            <v-icon v-if="props.readOnly === false" @click="modalState.open()" icon="mdi-dots-vertical" />
        </div>

        <div class="projectStage__stage we-linear-orange txt-cap mb-2">
            <v-card-title class="pa-0  pl-3">Раунд D (Stage D)</v-card-title>
        </div>


        <p class="mb-5 txt-cap1">
            Это финансирование перед продажей стратегическому инвестору или выходом на IPO

            Основная сложность для компаний - привлечь стратегического инвестора, показать покупателям свою ценность.
        </p>

        <div v-if="props.readOnly === false" class="projectStage__footer">
            <UiButton bg-color="blue">Выбрать этот этап</UiButton>
            <!-- <UiButton bg-color="def">Вы сейчас на этой стадии</UiButton> -->
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
import A from '../../assets/icons/projectStages/A.svg'
import B from '../../assets/icons/projectStages/B.svg'
import C from '../../assets/icons/projectStages/C.svg'
import D from '../../assets/icons/projectStages/D.svg'
// import NULL from '../../assets/icons/projectStages/NULL.svg'

import { ref } from 'vue'
import UiButton from '../ui-kit/UiButton.vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
const modalState = ref(false)
// const stages = ['PRE-SEED', 'SEED', 'A-1', 'A-2', 'B-1', 'C', 'D']
const currentClass = ref('');
const title = ref('Пре-сид раунд (Pre-seed) - первые шаги проекта');
const content = ref('На этой стадии создатели инвестируют собственные средства. О временных рамках и лимитах финансирования говорить не приходится. Стартаперы стремятся привлечь максимум денег как можно быстрее')

const icons = [
    { src: A, Class: 'we-linear-blue ', title: 'Пре-сид раунд (Pre-seed) - первые шаги проекта', content: "На этой стадии создатели <br> инвестируют собственные средства. О временных рамках и лимитах финансирования говорить не приходится. Стартаперы стремятся привлечь максимум денег как можно быстрее" },
    { src: A, Class: 'we-linear-blue ', title: 'Сид раунд (Seed-раунд)', content: ' На этой стадии привлекают от 25 тыс до 1 млн $. Деньги нужны для того, чтобы завершить разработку прототипа или довести его до требований рынка. Главный продукт - программа, итогом сид раунда должен стать финальный релиз программы. Основная сложность - показать инвесторам перспективы проекта и правильно оценить необходимый объемфинансирования.' },
    { src: B, Class: 'we-linear-green ', title: 'Ангельский раунд', content: 'Главная особенность ангельского раунда в том, что стартапы привлекают скорее не инвесторов, а менторов. Помощь бизнес-ангелов в организации всех процессов бывает настолько существенной, что финансы часто уходят на второй план. Ангельский раунд можно назвать и разновидностью seed раунда. Главная сложность здесь - вовремя понять, что вашему стартапу нужны не только деньги, но и организационная поддержка. И, конечно, бывает непросто найти инвестора и ментора в одном лице.' },
    {
        src: B, Class: 'we-linear-green ', title: 'Раунд А (Stage A)', content: `   Эта стадия наступает если стартап успешно прошел сид-раунд. Стартапы привлекают суммы от 500 тысяч долларов.

            Основные задачи:

            организовать серийное производство (постоянную работу сервиса);
            нанять полноценную команду.

            Раунд А может быть первым для компании, если предыдущие задачи основатели стартапа решили собственными
            ресурсами.` },
    {
        src: D, Class: 'we-linear-purple ', title: 'Раунд B (Stage B)', content: `  На этой стадии происходит масштабирование компаний. Раунд B начинается когда стартап достигает финансовых
            показателей, оговоренных с инвесторами на стадии А.

            Среди задач этого этапа:

            рост прибыли;
            завоевание новых рынков сбыта продукции;
            расширение охвата в занятой нише.

            Возможные риски:

            неэффективная работа команды;
            непонимание того, как достичь задач;
            неправильные решения при масштабировании.` },
    {
        src: D, Class: 'we-linear-purple ', title: 'Раунд C (Stage C) ', content: `  Перед компанией и ее создателями стоит задача - достичь самоокупаемости. Стартап становится прибыльным
            только на стадии раунда C. После этого раунда компания способна существовать самостоятельно.

            Главная сложность в том, чтобы наконец превратить смелый эксперимент в стабильный и прогнозируемый
            бизнес-проект. До этой стадии доходят далеко не все стартапы. Очень многие не достигают успеха из-за
            недостатка знаний и опыта, неспособности мыслить как бизнесмен, а не просто креативить.` },
    {
        src: C, Class: 'we-linear-orange ', title: 'Раунд D (Stage D)', content: ` Это финансирование перед продажей стратегическому инвестору или выходом на IPO <br>

            Основная сложность для компаний - привлечь стратегического инвестора, показать покупателям свою ценность.` },
];

function setContent(Class, newTitle, newContent) {
    currentClass.value = Class;
    title.value = newTitle;
    content.value = newContent;
}
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
.icons {
    display: flex;
    width: 100%;
    max-width: 365px;
    justify-content: space-between;
    // gap:10px;
}

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
        display: flex;
        flex-direction: row;
        align-items: center;
        // border-left: 5px solid #29b6f6;
        // padding-left: 10px;
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
.we-linear-blue {
    width: 5px;
    height: 28px;
    background-color: #29b6f6;
    border-radius: 8px;
}

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
    // font-size: 15px;
    // line-height: 14px;
    // max-width: 270px;
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
// }</style>
