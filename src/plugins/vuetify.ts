import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const itntTheme = {
    dark: false,
    colors: {
        active: '#29B6F6',
    },
}

export const vuetifyConfig = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'itntTheme',
        themes: {
            itntTheme,
        },
    },
})
