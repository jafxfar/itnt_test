<script lang="ts">
export default {
    name: 'UiSwitch',
}
</script>

<template>
    <div class="ui-switch">
        <div
            v-for="(item, id) in props.items"
            :key="id"
            @click="changeSwitchValue(id)"
            class="ui-switch__btn"
            :class="switchRef === id && 'ui-switch__btn--active'"
        >
            {{ item }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})

const switchRef = ref(0)

const emit = defineEmits(['changeValue'])
function changeSwitchValue(id: Number) {
    emit('changeValue', id)
    switchRef.value = id
}
</script>

<style lang="scss" scoped>
.ui-switch {
    display: flex;
    border-radius: 12px;
    background: #ffffff;
    margin-bottom: 4px;
    margin-top: 12px;
    width: 100%;
    padding: 4px 5px;
    justify-content: space-between;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    &__btn {
        border-radius: 12px;
        color: #263238;
        width: 50%;
        text-align: center;

        line-height: 18px;
        font-size: 16px;
        padding: 8px 0px;
        &--active {
            background: #e1f5fe;
        }
    }
}
</style>
