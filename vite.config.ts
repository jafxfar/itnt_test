import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import path from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
    plugins: [vue(), vuetify(), VitePWA()],
    server:{
        watch:{
            usePolling:true,
        },
        host:true,
        strictPort:true,
        port:8080
    },
    // TODO: поменять пути динамических иконок
    build: {
        minify: true,
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "~/assets/style/mixins.scss";
                    @import "~/assets/style/vars.scss";
                    @import "~/assets/style/typography.scss";`,
            },
        },
    },
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./src', import.meta.url)),
            '@': path.resolve(__dirname, './src'),
        },
    },
})
