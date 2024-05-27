<template>
    <div v-if="props.comment" class="feedCard">
        <!-- head -->
        <div class="feedCard__head">
            <div class="d-flex align-center">
                <img class="mr-3" width="30" height="30" src="../assets/demo/ava-small-header.svg" />
                <div>
                    <div class="d-flex align-center">
                        <p class="txt-body3">{{ props.id }}</p>
                        <img class="mx-2" src="../assets/icons/singeDot-gray.svg" />
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feed.time') }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- body -->
        <div class="feedCard__body">
            <p>{{ props.message }}</p>
            <!-- footer -->
            <div class="feedCard__footer">
                
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiButton from '../ui-kit/UiButton.vue'
import { computed, defineProps } from 'vue'
// import { postAddUserPicture } from "~/API/ways/user";

const props = defineProps({
    feedCardType: {
        type: String,
        default: '',
    },
    comment: {
        type: Boolean,
        default: '',
    },
    message: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
})

</script>

<style scoped lang="scss">
.feedCard {
    padding: 16px 14px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
        }
    }

    &__body {
        text-align: left;

        &__slider {
            display: flex;
            gap: 16px;
            -ms-overflow-style: none;
            /* Internet Explorer 10+ */
            scrollbar-width: none;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                display: none;
                /* Safari and Chrome */
            }
        }
    }

    &__vacancy {
        &__head {
            padding: 10px 20px;
            display: flex;
            gap: 10px;
            align-items: center;
            max-width: fit-content;
            border-radius: 8px;
            background: #e1f5fe;
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__button {
            padding: 14.5px 20px;
            box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
        }
    }
}

.feedCard__panel :deep() {
    border: 1px solid $def-white;

    .v-expansion-panel__shadow {
        display: none;
    }

    .v-expansion-panel-title__overlay {
        opacity: 0;
    }

    .v-expansion-panel-text__wrapper {
        padding: 23px 20px;
        padding-top: 8px;
    }
}

.v-expansion-panel--active {
    border-radius: 12px !important;
    background: #ffffff;
    border: #c7edff 1px solid !important;
}
</style>
