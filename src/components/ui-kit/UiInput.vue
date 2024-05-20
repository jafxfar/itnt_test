<script lang="ts">
export default {
    name: 'UiInput',
}
</script>

<template>
    <v-text-field
        class="ui-input"
        :class="noStyle && 'ui-input--noStyle'"
        color="active"
        variant="outlined"
        :label="props?.label"
        :placeholder="props?.placeholder"
        hide-details
        :v-model="search"
        :clearable="clearable"
        v-maska:[mask]
        @input="$emit('input', $event.target.value)"
        :prepend-inner-icon="props.prependIcon ? `mdi-${props.prependIcon}` : ''"
        :append-icon="props.appendIcon ? `mdi-${props.appendIcon}` : ''"
        :required="props.required"
        @blur="checkRequired"
    ></v-text-field>
</template>

<script setup lang="ts">
import {ref} from "vue"
import { vMaska } from 'maska'
const search =ref('')
const error = ref(false)

const props = defineProps({
    placeholder: {
        type: String,
    },
    label: {
        type: String,
    },
    prependIcon: {
        type: String,
    },
    appendIcon: {
        type: String,
    },
    mask: {
        default: '',
    },
    clearable: {
        type: Boolean,
        default: false,
    },
    noStyle: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
})
const checkRequired = () => {
    if (props.required && !search.value) {
        error.value = true
    } else {
        error.value = false
    }
}
</script>

<style lang="scss" scoped>
.ui-input :deep() {
    .v-field__outline__start {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }
    .v-field__outline__end {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
}
.ui-input--noStyle :deep() {
    .v-field__input {
        width: 100vh;
    }
    .v-field__outline__start {
        border-style: none;
    }
    .v-field__outline__end {
        border-style: none;
    }
}
</style>
