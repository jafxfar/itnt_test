<script lang="ts">
export default {
    name: 'Footer',
}
</script>

<template>
    <v-bottom-navigation :elevation="10" grow>
        <v-footer>
            <div class="footer__row">
                <div
                    class="footer__item"
                    v-for="(route, id) in routes"
                    :key="id"
                    @click="$router.push(route?.name)"
                    :class="route.name === $route.path && 'footer__item--active'"
                >
                    <img
                        width="22"
                        height="22"
                        :src="route?.icon"
                        :alt="route.icon"
                    />
                </div>
            </div>
        </v-footer>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
import profile from "~/assets/icons/footer/account.svg"
import lupa from "~/assets/icons/footer/lupa.svg"
import home from "~/assets/icons/footer/home.svg"
import rate from "~/assets/icons/footer/rate.svg"
import message from "~/assets/icons/footer/message.svg"
import { modalActionsList } from '~/helpers/types'

const routes: modalActionsList[] = [
    {
        name: '/feed',
        icon: home,
    },
    {
        name: '/projects',
        icon: rate,
    },
    {
        name: '/messenger',
        icon: message,
    },
    {
        name: '/search',
        icon: lupa,
    },
    {
        name: '/me',
        icon: profile,
    },
]
</script>

<style lang="scss" scoped>
.footer {
    background: #ffffff;
    padding: 18px 27px;
    width: 100%;
    &__row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    &__item {
        display: flex;
        align-items: center;
        padding: 4px 18px;
        &--active {
            padding: 4px 18px;
            background: #e1f5fe;
            border-radius: 8px;
        }
    }
}
</style>
