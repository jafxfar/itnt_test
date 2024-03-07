<template>
    <div class="searchUserCard">
        <div class="searchUserCard__head">
            <div class="d-flex align-center">
                <img class="mr-3" width="37" height="37" src="../../assets/demo/ava-small-header.svg" />
                <div>
                    <div class="d-flex align-center">
                        <p class="txt-body3">Томас Хардов</p>
                    </div>
                    <p class="searchUserCard__head__subtitle txt-cap1">г. Санкт-Петербург</p>
                </div>
            </div>
            <v-icon icon="mdi-dots-vertical" />
        </div>

        <div class="searchUserCard__body">
            <div class="searchUserCard__body__skills">
                <div v-for="(skill, id) in demoSkills" :key="id">
                    <div class="searchUserCard__body__skills__item txt-body1">{{ skill }}</div>
                </div>
            </div>

            <div class="searchUserCard__body__info">
                <p class="txt-body1">
                    Я сюда припёрся, чтобы нормально постартапить! Ждал нормального стартапа с нормальными мужиками.©
                    Легенда
                </p>
            </div>
        </div>

        <!-- <div class="searchUserCard__footer">
            <UiButton bgColor="def" class="searchUserCard__footer__button" fit>Открыть проект </UiButton>

            <UiButton
                bgColor="def"
                imgSrc="../src/assets/icons/share-black.svg"
                style="padding: 10px 13px 9px 14px"
                onlyIcon
            />
        </div> -->
    </div>
</template>

<script setup lang="ts">
const demoSkills = ['User Experience Designer (UX)', 'Team Lead', 'Product Owner']
</script>

<style scoped lang="scss">
.searchUserCard {
    padding: 16px 14px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;
    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
            text-wrap: balance;
        }
    }

    &__body {
        padding: 0px 2px;
        &__skills {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            &__item {
                padding: 3px 10px;
                color: $def-black;
                max-width: fit-content;
                border: 1.5px solid $primary;
                border-radius: 4px;
            }
        }
        &__info {
            margin-top: 16px;
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__button {
            padding: 17px 20px;
            font-size: 13px;
            font-weight: 400;
            line-height: 14px;
            box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
        }
    }
}
</style>
