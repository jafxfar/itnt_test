<template>
    <v-textarea color="active" append-inner-icon="mdi-send" variant="outlined" auto-grow row-height="15"
        class="mx-0 p-0" rows="1" :placeholder="props.placeholder" @click="props.action">
    </v-textarea>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
    placeholder: {
        type: String,
    },
    imgSrc: {
        type: String,
    },
    label: {
        type: String,
    },
    action: {
        type: Function,
    },
})
</script>

<style lang="scss" scoped>
.ui-textArea :deep() {
    margin: 0;
    z-index: 999;

    .v-field__outline__start {
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
    }

    .v-field__outline__end {
        border-top-right-radius: 24px;
        border-bottom-right-radius:24px;
    }
}
</style>