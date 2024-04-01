<script lang="ts">
export default {
    name: 'FeedPanel',
}
</script>

<template>
    <v-expansion-panels>
        <v-expansion-panel class="feedPanel">
            <v-expansion-panel-title class="feedPanel__head">
                <template v-slot:actions="{ expanded }">
                    <v-icon color="#1769AA" :icon="expanded ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                </template>
                <img width="30" height="30" class="mr-3" src="../../assets/demo/ava-small-header.svg" alt="" />

                <div>
                    <div class="feedPanel__card__title align-center d-flex">
                        <p class="txt-body3">Danger Flower</p>
                        <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feedPanels.time') }}</span>
                    </div>

                    <p class="feedPanel__card__subtitle txt-cap1">
                        {{ $t('feedPanels.addToProject') }} {{ demoInfo.length }}  {{ $t('feedPanels.specialist') }}
                    </p>
                </div>

                <v-spacer></v-spacer>
                <span class="back-messages">{{ demoInfo.length }}</span>
                <div class="back-messages-after"></div>
            </v-expansion-panel-title>

            <v-expansion-panel-text v-for="(info, id) in demoInfo" :key="id">
                <div class="feedPanel__card d-flex align-center">
                    <img width="30" height="30" src="../../assets/demo/ava-small-header.svg" class="mr-3" />

                    <div>
                        <div class="feedPanel__card__title d-flex align-center">
                            <p class="txt-body3">{{ info.name }}</p>
                            <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                            <span style="color: #9e9e9e" class="txt-cap1">{{ info.time }}  {{ $t('feedPanels.back') }}</span>
                        </div>

                        <p class="feedPanel__card__subtitle txt-cap1">
                            {{ info.spec }}
                        </p>
                    </div>

                    <v-spacer />
                    <v-icon icon="mdi-dots-vertical" />
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script setup lang="ts">
const demoInfo = [
    {
        name: 'Евгений Анисимов',
        time: '3ч',
        spec: 'Младший Шеф-Повар',
    },
    {
        name: 'Евгений Анисимов',
        time: '3ч',
        spec: 'Младший Шеф-Повар',
    },
]
</script>

<style lang="scss" scoped>
.feedPanel {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    &__head {
        padding: 16px 14px;
    }

    &__card {
        &__title {}

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
        }
    }
}

.feedPanel :deep() {
    .v-expansion-panels {
        border: 1px solid blue !important;
        border-radius: 12px 12px 2px 2px !important;
    }

    .v-expansion-panel__shadow {
        display: none;
    }

    .v-expansion-panel-title__overlay {
        border-radius: 12px 12px 2px 2px;
        opacity: 0;
    }

    .v-expansion-panel-text__wrapper {
        padding: 16px 14px;
        border-top: 1px solid #e0e0e0;
        
    }
}

.v-expansion-panel-title {
    border-radius: 12px;
    
}

.v-expansion-panel-text {
    &:last-child {
        border-radius: 2px 2px 12px 12px;
        
    }
}

.v-expansion-panel-title--active {
    border-radius: 12px 12px 2px 2px !important;
    
}

.back-messages {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.01em;
    color: #1769aa;
    position: relative;
    text-align: right;
    z-index: 1;
}

.back-messages-after {
    right: 11px;
    top: 24px;
    width: 44px;
    height: 22px;
    position: absolute;
    background: #e1f5fe;
    border-radius: 16px;
}</style>
