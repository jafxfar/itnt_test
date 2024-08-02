import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { VPullToRefresh } from 'vuetify/labs/VPullToRefresh'

const itntTheme = {
    dark: false,
    colors: {
        active: '#29B6F6',
    },
}

export const vuetifyConfig = createVuetify({
    components:{
        VPullToRefresh,
    },
    directives,
    theme: {
        defaultTheme: 'itntTheme',
        themes: {
            itntTheme,
        },
    },
})
