<template>
  <v-row class="container pa-0 ma-0" justify="center" align="center">
    <v-col align="center">
      <img src="../../assets/img/logos/itnt.svg" />
      {{ os }}
      <div class="mt-12 pl-2 pr-2">
        <div @click="dialog = !dialog">
          <UiButton :bgColor="'purple'" :imgSrc="'../src/assets/setting/vallet_white.svg'">Войти, используя кошелёк
          </UiButton>
        </div>
        <p class="button-purse-subtitle ma-0 mt-2 text-center">
          Зачем нужен кошелёк и где его взять?   
          <br />
          <router-link class="button-purse-subtitle-href" to="">Узнать</router-link>
        </p>
        <div style="margin-top: 48px" @click="$router.push('/reg')">
          <UiButton bgColor="blue">{{ $t('entry.phone') }}</UiButton>
        </div>
        <v-col class="mt-6">
          <v-row class="social" justify="center">
            <UiButton @click="googleSignIn" onlyIcon imgSrc="../src/assets/icons/companies/google.svg" />
            <UiButton  @click="signInWithApple" onlyIcon imgSrc="../src/assets/icons/companies/apple.svg" />
            <UiButton @click="signInWithFacebook" onlyIcon imgSrc="../src/assets/icons/companies/facebook.svg" />

            <!-- <vue-apple-login
                            type="sign in"
                            color="black"
                            :border="true"
                            :radius="15"
                            logoSize="medium"
                            :onSuccess="onSuccess"
                            :onFailure="onFailure"
                        ></vue-apple-login> -->
          </v-row>
        </v-col>
      </div>
    </v-col>
  </v-row>
  <!-- Диалоговое окно при нажатии на выбор входа по кошельку -->
  <v-dialog v-model="dialog">
    <v-card class="dialog pt-2 pb-5">
      <v-col class="pr-4">
        <v-row justify="end mr-2">
          <v-icon @click="dialog = false" icon color="#9E9E9E">mdi-close</v-icon>
        </v-row>
      </v-col>
      <p class="dialog-title ma-0 text-center">Выбор кошелька</p>
      <div class="card">
        <div class="card__item" :class="item.addClass" v-for="(item, index) in walletItems" :key="index"
          :style="{ borderColor: item.color }">
          <img :src="item.src" :alt="item.alt">
          <p style="font-weight: 500;"> {{ item.alt }}</p>
        </div>
      </div>
      <v-col>
        <v-row justify="center">
          <a class="dialog-href" href="#">Мне нужна помощь</a>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
  <!-- Диалоговое окно загрузки -->
  <v-dialog v-model="loader">
    <v-card class="loader-card mx-auto pl-6 pr-6 pt-3" width="253" height="56">
      <v-col>
        <v-row align="center">
          <v-progress-circular indeterminate color="#29B6F6" width="3" class="mr-12"></v-progress-circular>
          <p class="ma-0">Подождите</p>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import UiButton from '~/components/ui-kit/UiButton.vue'
import { ref, onMounted, computed } from 'vue'
import tonKeeper from '../../assets/vallet/tonkeeper.svg'
import metamask from '../../assets/vallet/metamask.svg'
import wallet from '../../assets/vallet/wallet-connect.svg'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider    } from 'firebase/auth';
// import { auth, provider } from '../firebaseConfig';

import { useRouter } from 'vue-router'
const router = useRouter()
const dialog = ref(false)
const walletItems = [
  { src: tonKeeper, alt: 'Tonkeeper', color: '#7BB3E3' },
  { src: metamask, alt: 'Metamask', color: '#F89D35' },
  { src: wallet, alt: 'Walletconnect', color: '#3B99FB', addClass: 'addClass' },
];
const os = ref('');

const getOS = () => {
  let userAgent = window.navigator.userAgent;
  let platform = window.navigator.platform;
  let macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  let windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  let iosPlatforms = ['iPhone', 'iPad', 'iPod'];

  let detectedOS = null;

  if (macosPlatforms.includes(platform)) {
    detectedOS = 'Mac OS';
  } else if (iosPlatforms.includes(platform)) {
    detectedOS = 'iOS';
  } else if (windowsPlatforms.includes(platform)) {
    detectedOS = 'Windows';
  } else if (/Android/.test(userAgent)) {
    detectedOS = 'Android';
  } else if (/Linux/.test(platform)) {
    detectedOS = 'Linux';
  }
  console.log(detectedOS);

  os.value = detectedOS;
}
onMounted(getOS);
const showAppleButton = computed(() => {
      return os.value === 'iOS' || os.value === 'Mac OS';
    });

const email = ref('')
const password = ref('')
// const register = () => {
//   const auth = getAuth()
//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log("Registred success", data);
//       router.push('/me')
//       console.log("Registred success", auth.currentUser);
//     })
//     .catch((error) => {
//       console.log(error.code);
//       alert(error.message)
//     })
// }

// const signInWithGoogle = () => {
//   const auth = getAuth()
//   signInWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log("sign in success", data);
//       router.push('/me')
//       console.log("Registred success", auth.currentUser);
//     })
//     .catch((error) => {
//       console.log(error.code);
//       alert(error.message)
//     })
// }
const googleSignIn = async () => {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user.displayName);
    console.log('User signed in:', result.user.email);
    console.log('User signed in:', result.user);
    router.push('/screening')
  } catch (error) {
    console.error('Error signing in:', error);
  }
}
const signInWithFacebook = async () => {
  try {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();  // Используйте FacebookAuthProvider
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user.displayName);
    console.log('User signed in:', result.user.email);
    console.log('User signed in:', result.user);
    router.push('/screening');
  } catch (error) {
    console.error('Error signing in:', error);
  }
};
const signInWithApple = async () => {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    router.push('/screening')
    console.log('User signed in:', result.user.displayName);
    console.log('User signed in:', result.user.email);
    console.log('User signed in:', result.user);
  } catch (error) {
    console.error('Error signing in:', error);
  }
}
</script>

<style lang="scss" scoped>
.card {
  background: #fff;
  border-radius: 20px;
  box-shadow: none;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__item {
    margin: 12px;
    gap: 24px;
    padding: 16px 16px 16px 24px;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #7BB3E3;
    border-radius: 12px;
  }

}

.container {
  height: 100vh;
}

.button-purse {
  background: linear-gradient(96.78deg, #ce0efe -0.02%, #9012de 94.31%) !important;
  box-shadow: 0 22px 22px -17px rgba(145, 18, 222, 0.51) !important;
  border-radius: 12px !important;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
}

.button-purse-subtitle {
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.01em;
  color: #9e9e9e;
}

.button-purse-subtitle-href {
  color: #29b6f6;
  text-decoration: none;
}

.button-phone {
  background: linear-gradient(96.78deg, #13d5ff -0.02%, #12a1de 94.31%) !important;
  border: 1px solid #12b7ec !important;
  box-shadow: 0 22px 22px -17px #29b6f6 !important;
  border-radius: 12px !important;
  font-size: 18px !important;
  line-height: 22px;
  color: #ffffff;
}

.social {
  gap: 24px;
}

.social-button {
  background: #ffffff !important;
  border: 1px solid rgba(158, 158, 158, 0.2) !important;
  box-shadow: 0 9px 9px -9px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
  border-radius: 12px !important;
}

.dialog {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05) !important;
  border-radius: 12px !important;
}

.dialog-title {
  font-size: 18px;
  line-height: 22px;
  color: #263238;
}

.button-wallet {
  border: 1px solid !important;
  border-radius: 12px !important;
}

.button-metamask {
  border: 1px solid #f89d35 !important;
  border-radius: 12px;
}

.button-wallet-text {
  font-size: 18px;
  line-height: 22px;
  color: #263238;
}

.dialog-href {
  font-size: 16px;
  line-height: 18px;
  color: #29b6f6;
  text-decoration: none;
}

.loader-card {
  border: 1px solid #e0e0e0 !important;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.19), 0 0 3px rgba(0, 0, 0, 0.039) !important;
  border-radius: 8px !important;
}

button.login-button {
  background-color: white;
  height: 32px;
  width: 200px;
  border-radius: 5px;
  border: 0px;
  font-size: 12px;
  font-weight: 500;
  margin: 5px;
}
</style>
