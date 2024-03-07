<script lang="ts">
export default {
    name: 'UiShortProjectCard',
}
</script>

<template>
    <div class="ui-shortProjectCard">
        <div class="ui-shortProjectCard__head">
            <p class="txt-body1">Code fresh</p>
            <div class="txt-cap1 df ai-c gap-3">
                <img class="mr-1" src="../../assets/icons/account-black.svg" />
                243
            </div>
        </div>
        <div class="ui-shortProjectCard__body">
            <div class="ui-shortProjectCard__body__item">
                <p class="txt-cap1">Комментарии</p>
                <div class="txt-body1">23 <span class="txt-body1"> +2</span></div>
            </div>
            <div class="ui-shortProjectCard__body__item">
                <p class="txt-cap1">Огни</p>
                <div class="txt-body1">23 <span class="txt-body1"> +2</span></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// const props = defineProps({})
</script>

<style lang="scss" scoped>
.ui-shortProjectCard {
    border: 1px solid $primary;
    padding: 16px 18px;
    border-radius: 12px;
    &__head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 11px;
        p {
            color: $primary;
        }
        div {
            color: $def-gray;
        }
    }
    &__body {
        display: flex;
        gap: 15px;
        &__item {
            padding: 10px;
            border-radius: 12px;
            background: rgba(225, 245, 254, 0.4);
            p {
                color: $def-gray;
                margin-bottom: 3px;
            }
            div {
                color: $def-black;
            }
            span {
                color: $primary;
            }
        }
    }
}
</style>
