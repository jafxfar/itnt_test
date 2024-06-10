<template>
    <Header showID showUserMinify showControlDots />
    <div class="m-4 flex flex-col gap-4">
        <div class="flex justify-center m">
            <div class="date mb-4 rounded-xl d-inline-block ">{{ $t('feed.today') }}</div>
        </div>
        <FeedPanels :notification="true" />
        <FeedPanels :reply="true" />
        <FeedPanels :default="true" />
    </div>

    <Footer />
</template>

<script setup lang="ts">
// ui-kit
import FeedPanels from '~/components/feed/FeedPanels.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

import { onMounted, ref } from 'vue'
import { getUserNotifications } from '~/API/ways/notifications'
onMounted(async () => {
    //есть 6 ответов в id 1
    await getUserNotifications(5).then((response) => {
        try {
            console.log('response', response)
        } catch (e) {
            console.error('text error:', e)
        }
    })
})
</script>
<style scoped lang="scss">
.searchProjectCard {
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
        margin-bottom: 16px;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
            text-wrap: balance;
        }
    }

    &__body {
        &__slider {
            display: flex;
            gap: 11px;
            -ms-overflow-style: none;
            /* Internet Explorer 10+ */
            scrollbar-width: none;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                display: none;
                /* Safari and Chrome */
            }
        }

        &__info {
            &__title {
                margin-top: 24px;
                margin-bottom: 12px;
            }
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__button {
            padding: 17px 20px;
            font-size: 13px;
            font-weight: 400;
            line-height: 14px;
            box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
        }
    }
}

.date {
    display: flex;
    justify-content: center;
    width: 100px;
    background: rgba(224, 224, 224, 0.5);
    font-size: 13px !important;
    letter-spacing: 0.01em !important;
    padding: 6px 20px;
    line-height: 14px;
}
</style>