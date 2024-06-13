<template>
    <Header showID showUserMinify showControlDots />
    <div v-show="pageStep === 1" class="m-4 flex flex-col gap-4">
        <UiPrompt>
            <p class="part1">
                Для того, чтобы создавать свои проекты, или комментировать чужие - вам нужно заручиться поддержкой
                участников сообщества.
            </p>
            <p class="part2">
                Вы можете запросить приглашение напрямую у нас, для этого пришлите описание вашего проекта на нашу
                почту:<span class="text-[#29B6F6]"> invites@itnt-app.com.</span> Или дождитесь, пока кто нибудь из
                участников сообщества iTalent Founders
                пригласит вас.
            </p>
        </UiPrompt>
        <UiInput placeholder="HKD-85FTDYibfT" clearable label="Код приглашения" style="margin-bottom: 28px"
            v-model="code" />

        <UiButton v-if="code.length < 10">
            <v-icon icon="mdi-arrow-up" />
            Введите номер
        </UiButton>

        <div v-else>
            <UiButton @click="pageStep += 1" bgColor="blue">
                <v-icon size="20" icon="mdi-check" />
                Подтвердить код
            </UiButton>
        </div>
    </div>
    <v-container v-show="pageStep === 2" style="padding: 0 20px; margin-bottom: 48px">
        <div class="card">
            <div class="card__item">
                <div v-for="(item, index) in cardItems" :key="index">
                    <div class="card__subTitle">
                        {{ item.title }}
                    </div>
                    <div class="card__text">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
        <p style="font-weight: 500;"> Отправленные вами приглошения</p>
        <div class="card">
            <div class="card__item" v-for="(item, index) in cardInvites" :key="index">
                <div>
                    <div class="card__subTitle">
                        {{ item.title }}
                    </div>
                    <div class="card__text">
                        {{ item.text }}
                        <div v-if="item.showIcon" class="border-[1px] rounded-[14px] p-[10px]">
                            <v-icon icon="mdi-arrow-right" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UiButton bgColor="blue">
            <v-icon icon="mdi-plus" size="18" />
            Создать приглашение (3)
        </UiButton>
    </v-container>
</template>

<script setup lang="ts">
// ui-kit
import UiInput from '~/components/ui-kit/UiInput.vue';
import UiButton from '~/components/ui-kit/UiButton.vue';
import UiPrompt from '~/components/ui-kit/UiPrompt.vue';
import Header from '../../components/Header.vue'
import { ref } from 'vue'
const code = ref('')
const pageStep = ref(1);
const maxReachedStep = ref(4);
const setPageStep = (step: number) => {
    if (step <= maxReachedStep.value) {
        pageStep.value = step;
    }
};
const cardItems = [
    { title: 'Вы в клубе фаундеров с 12.07.21', text: "За вас поручился:", showIcon: false },
    { title: 'Имя', text: 'Антон Фиолетов', showIcon: true },
    { title: 'Основной проект', text: 'Almaz Corp.', showIcon: true },
];
const cardInvites = [
    { title: 'Имя', text: 'Антон Фиолетов', showIcon: true },
    { title: 'Основной проект', text: 'Almaz Corp.', showIcon: true },
];

</script>
<style scoped lang="scss">
.part1 {
    margin-bottom: 8px;
}

.card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    height: 100%;

    &__item {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__text {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 1%;
        text-align: left;
    }

    &__title {
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1%;
        text-align: left;
    }

    &__subTitle {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 1%;
        text-align: left;
        color: #9e9e9e;
    }

}
</style>