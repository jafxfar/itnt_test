import { createApp } from 'vue'
import VOtpInput from 'vue3-otp-input'
import App from './App.vue'
import { createI18n } from 'vue-i18n';
import { vuetifyConfig } from './plugins/vuetify'
import { router } from './router'
import { pinia } from './store/main'
import { appleLoginConfig, googleLoginConfig } from './plugins/loginCfgs'
import VueAppleLogin from 'vue-apple-login'
import VueCookies from 'vue-cookies'
import vue3GoogleLogin from 'vue3-google-login'
import './assets/style/global.scss'

import './assets/style/style.css'

import messages from './i18n/main';

const i18n = createI18n({
  legacy: false, // для Vue 3 должно быть false
  locale: 'ru', // установите начальный язык
  fallbackLocale: 'ru', // язык, который будет использоваться, если не будет найден перевод
  messages,
});

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(VueAppleLogin, appleLoginConfig)
app.use(vue3GoogleLogin, googleLoginConfig)
app.use(pinia)
app.use(i18n)
app.component('v-otp-input', VOtpInput)
app.use(vuetifyConfig)
app.mount('#app')
