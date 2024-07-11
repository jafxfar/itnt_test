import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import { vuetifyConfig } from './plugins/vuetify';
import { router } from './router';
import { pinia } from './store/main';
import { appleLoginConfig, googleLoginConfig } from './plugins/loginCfgs';
import VueAppleLogin from 'vue-apple-login';
import VueCookies from 'vue-cookies';
import vue3GoogleLogin from 'vue3-google-login';
import VOtpInput from 'vue3-otp-input';
import './assets/style/global.scss';
import './assets/style/style.css';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import messages from './i18n/main';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl4ar41yEmR7ring6C-irndABFWvYCS74",
  authDomain: "itnt-1d355.firebaseapp.com",
  projectId: "itnt-1d355",
  storageBucket: "itnt-1d355.appspot.com",
  messagingSenderId: "60310399783",
  appId: "1:60310399783:web:035b6c597328bdfedcd702",
  measurementId: "G-WPBPDV04ZE"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

// Initialize i18n
const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  messages,
});

const app = createApp(App);

app.use(router);
app.use(VueCookies);
app.use(VueAppleLogin, appleLoginConfig);
app.use(vue3GoogleLogin, googleLoginConfig);
app.use(pinia);
app.use(i18n);
app.component('v-otp-input', VOtpInput);
app.use(vuetifyConfig);

app.mount('#app');
