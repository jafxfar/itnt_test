<!-- CommentCard.vue -->
<template>
    <div class="feedCard" :class="{ 'mx-4': isReply }">
        <div class="feedCard__head">
            <!-- ... -->
        </div>
        <div class="feedCard__body">
            <p class="txt-cap1">
                {{ comment.text }}
            </p>
        </div>
        <div class="feedCard__footer">
            <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feed.time') }}</span>
            <button style="color: #9e9e9e" class="txt-cap1" @click="startReply(comment)">Ответить</button>
        </div>
    </div>
</template>

<script setup>
export default {
    props: ['comment', 'isReply'],
    methods: {
        startReply(comment) {
            this.$emit('start-reply', comment);
        }
    }
}
</script>
<style scoped lang="scss">
.feedCard {
    padding: 16px 14px;
    margin-bottom: 4px;
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
</style>