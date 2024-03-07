<template>
    <div class="userInfo">
        <div class="userInfo__head">
            <h2 class="mb-1">{{ props.userName }} {{ props.userSurname }}</h2>
            <p class="txt-body1">Россия, Краснодар</p>
        </div>

        <!-- Статус предложений -->
        <!-- <div class="userInfo__status">
            <p class="userInfo__status__title txt-body1">Открыт к предложениям</p>
            <img src="../../assets/icons/footer/message.svg" alt="" />
        </div> -->

        <div class="userInfo__body">
            <div class="txt-body1">
                {{ props.userDescription }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 'userCity', 'userCountry'
const props = defineProps(['userName', 'userSurname', 'userDescription'])
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
