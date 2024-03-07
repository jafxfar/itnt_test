<script lang="ts">
export default {
    name: 'UiBottomModal',
}
</script>

<template>
    <vue-bottom-sheet ref="modalState">
        <slot />
    </vue-bottom-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'

const modalState = ref(false)
</script>

<style scoped></style>
