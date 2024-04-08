<script lang="ts">
export default {
    name: 'UiCoop',
}
</script>

<template>
    <div class="ui-coop">
        <div
            v-for="(item, id) in props.items"
            :key="id"
            @click="changeSwitchValue(id)"
            class="ui-coop__btn"
            :class="switchRef === id && 'ui-coop__btn--active'"
        >   <div class="flex justify-center">
            <img v-if="switchRef === id" class=" " src="/src/assets/Coop.svg" alt="">
            </div>
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
.ui-coop {
    display: flex;
    margin-bottom: 4px;
    margin-top: 12px;
    width: 100%;
    gap: 24px;
    padding: 4px 5px;
    &__btn {
        border-radius: 12px;
        color: #263238;
        width: 50%;
        text-align: center;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffffff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
        line-height: 18px;
        font-weight: 500;
        font-size: 16px;
        padding:42px 8px 16px 8px;
        border:1px solid #9e9e9e;
        &--active {
            padding: 16px 8px 16px 8px;
            border: 2px solid #29b6f6;
        }
    }
}

</style>
