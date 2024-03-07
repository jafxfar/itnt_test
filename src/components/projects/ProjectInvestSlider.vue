<template>
    <div>
        <div class="head">
            <div class="head__title">
                <div class="head__title__info">
                    <p class="txt-cap1">Участники сообщества могут приобрести долю в нашем проекте.</p>
                </div>
                <div>до <span>20%</span></div>
            </div>
        </div>

        <div class="item">
            <div class="item__block">от $100</div>
            <p class="txt-body2">Минимальный взнос</p>
        </div>

        <UiButton bgColor="blue">Приобрести долю в проекте</UiButton>
    </div>
</template>

<script setup>
import UiButton from '../ui-kit/UiButton.vue'
</script>

<style lang="scss" scoped>
.head {
    &__title {
        display: flex;
        justify-content: space-between;
        &__info {
            padding-top: 18px;
            padding-bottom: 17px;
            border-radius: 12px;
            border: 1px solid #c7edff;
            background: $prim-var2;
        }
    }
}
.item {
    display: flex;
    align-items: center;
    gap: 17px;
    &__block {
        border: 1px solid $prim-var2;
        border-radius: 8px;
        padding: 10px 20px;
        color: $primary;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
    }
}
</style>
