<script lang="ts">
export default {
    name: 'UiAgree',
}
</script>

<template>
    <button class="ui-agree">
        <v-icon icon="mdi-check" color="#FFF" />
    </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.ui-agree {
    border-radius: 12px;
    position: fixed;
    bottom: 19px;
    right: 19px;
    background: #00e676;
    box-shadow: 0px 9px 9px -9px #00b65d;
    padding: 10px;
}
</style>
