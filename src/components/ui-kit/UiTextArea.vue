<script lang="ts">
export default {
    name: 'UiTextArea',
}
</script>

<template>
    <v-textarea
        class="ui-textArea"
        color="active"
        auto-grow
        variant="outlined"
        :counter="props.counter"
        :rules="props?.rules"
        :clearable="props.clearable"
        :label="props?.label"
        :placeholder="props?.placeholder"
        @input="$emit('input', $event.target.value)"
    ></v-textarea>
</template>

<script lang="ts" setup>
const props = defineProps({
    placeholder: {
        type: String,
    },
    label: {
        type: String,
    },
    clearable: {
        type: Boolean,
        default: false,
    },
    counter: {
        type: Boolean,
        default: false,
    },
    rules: {
        type: Array,
    },
})
</script>

<style lang="scss" scoped>
.ui-textArea :deep() {
    margin: 0;
    .v-field__outline__start {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }
    .v-field__outline__end {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
}
</style>
