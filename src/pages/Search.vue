<template>
    <Header search />

    <v-container style="padding: 0 20px">
        <UiSwitch @changeValue="searchPageSwitchState = $event" :items="['Проекты', 'Люди']" />

        <!-- Детальный поиск -->
        <div :class="detailsValue === true ? 'details--opened' : 'details'" class="card">
            <div @click="detailsValue = !detailsValue" class="details__head">
                <p class="txt-body1">{{ $t('search.searchDetail') }}</p>
                <img v-show="detailsValue === false" src="@/assets/icons/settings-black.svg" />
                <img v-show="detailsValue === true" src="@/assets/icons/close-black.svg" />
            </div>

            <div class="details__body" v-show="detailsValue === true">
                <div class="details__body__inputs">
                    <UiInput label="Теги" />
                </div>

                <div class="details__body__switchs">
                    <div class="details__body__switchs__item">
                        <p class="txt-body1">{{ $t('search.vacancee') }}</p>
                        <p class="txt-body1 color-blue">{{ $t('search.NoNeed') }}</p>
                    </div>

                    <div class="details__body__switchs__item">
                        <p class="txt-body1">{{ $t('search.Insearch') }}</p>
                        <p class="txt-body1 color-blue">{{ $t('search.Yes') }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Карточки проектов -->
        <div v-if="searchPageSwitchState === 0">
            <template v-for="(item, id) in user.$state.searchBarResponse" :key="id">
                <SearchProjectCard :name="item.name" :desc="item.description" :descHeader="item.descriptionHeader" />
            </template>
        </div>

        <!-- Карточки пользователей -->
        <div v-if="searchPageSwitchState === 1">
            <SearchUserCard />
        </div>
    </v-container>

    <Footer />
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import UiSwitch from '~/components/ui-kit/UiSwitch.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import SearchUserCard from '~/components/search/SearchUserCard.vue'
import SearchProjectCard from '~/components/search/SearchProjectCard.vue'

import { ref } from 'vue'
import { useUserStore } from '~/store/user'

const user = useUserStore()

const searchPageSwitchState = ref(0)

const detailsValue = ref(false)
</script>

<style lang="scss" scoped>
.details {
    margin-top: 8px;
    margin-bottom: 24px;
    padding: 11px 13px;

    &--opened {
        padding: 12px 13px 18px 13px;
    }

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
    }

    &__body {
        &__inputs {
            margin: 28px 0;
        }

        &__switchs {
            display: flex;
            flex-direction: column;
            gap: 20px;

            &__item {
                display: flex;
                gap: 15px;
                padding-left: 14px;
                align-items: center;
            }
        }
    }
}
</style>
