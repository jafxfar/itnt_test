<script lang="ts">
export default {
    name: 'UiButton',
}
</script>

<template>
    <button
        class="ui-button text-none"
        :disabled="props.isDisabled"
        :class="[
            `ui-button--${props.bgColor}`,
            `ui-button--${props.onlyIcon ? 'onlyIcon' : ''}`,
            props.isDisabled && 'ui-button--disabled',
            props.isNormal && 'ui-button__normal',
            props.isSmall && 'ui-button__small',
            props.isxSmall && 'ui-button__xSmall',
            `ui-button__small--${props.bgColor}`,
            props.fit && 'ui-button--fit',
            props.plus && 'ui-button--plus',
        ]"
    >
        <img v-if="props.imgSrc" :src="props.imgSrc" />
        <p v-if="props.plus">+</p>
        <slot />
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    imgSrc: {
        type: String,
        default: '',
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    bgColor: {
        type: String,
        default: '',
    },
    onlyIcon: {
        type: Boolean,
        default: false,
    },
    fit: {
        type: Boolean,
        default: false,
    },
    isNormal:{
        type:Boolean,
        default:false,
    },
    isSmall: {
        type: Boolean,
        default: false,
    },
    isxSmall:{
        type: Boolean,
        default: false,
    },
    plus: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped>
.ui-button {
    padding: 16px 0;
    width: 100%;
    border: 1px solid;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 18px;
    line-height: 22px;
    font-weight: 400;
    display: flex;
    justify-content: center;

    &--fit {
        max-width: fit-content !important;
    }

    &--plus {
        border-radius: 12px;
        border: 1px solid #e0e0e0;
        background: #fff;
        max-width: 127px;
        width: 100%;
        padding: 6px 0;
    }

    &--def {
        border: 1px solid #9e9e9e33;
        background: linear-gradient(0deg, #ffffff, #ffffff),
            linear-gradient(0deg, rgba(158, 158, 158, 0.2), rgba(158, 158, 158, 0.2));
        box-shadow: 0px -1px 0px 0px #00000033 inset;
        box-shadow: 0px 23px 10px -23px #00000026;
    }

    &--onlyIcon {
        padding: 12px 28px;
        width: fit-content;
        align-items: center;
        border: 1px solid rgba(158, 158, 158, 0.2);
        box-shadow: 0 9px 9px -9px rgb(0 0 0 / 25%), inset 0 -1px 0 rgb(0 0 0 / 20%);
    }

    &--purple {
        @include btn-purple-gradient;
        border: none;
        box-shadow: 0 22px 22px -17px rgb(145 18 222 / 51%);
        color: $def-white;
    }
    &--gray {
        border-radius: 12px;
        border: 1px solid #3a4757;
        background: linear-gradient(0deg, #26313e 0%, #45586c 100%);
        box-shadow: 0px 23px 22px -17px #22364e;
        color: #ffffff;
    }

    &--blue {
        @include btn-blue-gradient;
        border: 1px solid #12b7ec;
        box-shadow: 0 22px 22px -17px $primary;
        color: $def-white;
    }
    &--disabled {
        border-radius: 12px;
        border: 1px solid #9e9e9e;
        background: #fff;
        color: $def-gray;
        box-shadow: none;
    }

    &__small {
        max-width: 120px;
        width: 100%;
        padding: 15px 0;
        border-radius: 12px;
        height: 52px;

        &--smOutlined {
            color: $primary;
            border: 1px solid $primary;
            box-shadow: none;
        }
        &--smBlue {
            background: $primary;
            color: $def-white;
            border: none;
            box-shadow: none;
        }
    }
    &__normal{
        max-width: 240px;
        width: 100%;
        padding: 0;
        border-radius: 12px;
        height: 36px;
        
        &--smOutlined {
            color: $primary;
            border: 1px solid $primary;
            box-shadow: none;
        }
        &--smBlue {
            background: $primary;
            color: $def-white;
            border: none;
            box-shadow: none;
        }
    }
    &__xSmall {
        max-width: 80px;
        width: 100%;
        padding: 15px 0;
        border-radius: 12px;
        height: 52px;

        &--smOutlined {
            color: $primary;
            border: 1px solid $primary;
            box-shadow: none;
        }
        &--smBlue {
            background: $primary;
            color: $def-white;
            border: none;
            box-shadow: none;
        }
    }
}
</style>
