<template>
    <Header showLogo />
    <v-col class="pa-0">
        <v-row class="container pa-0 ma-0" justify="center" align="center">
            <!-- phone -->

            <div v-if="pageStep === 1" class="button-container">
                <v-form @submit.prevent>
                    <div>
                        <!-- {{ results }} -->
                        <!-- {{ phone }} -->
                    </div>
                    <MazPhoneNumberInput class="w-[100%] my-4" v-model="phone" v-model:country-code="countryCode"
                        show-code-on-list :preferred-countries="['RU', 'US', 'AE', 'CN', 'GB']"
                        :ignored-countries="['AC']" @update="results = $event" />

                    <!-- <UiInput placeholder="+7 (---) --- -- --" clearable label="Ваш телефон" :mask="phoneOptions"
                        v-model="phone" style="margin-bottom: 28px" /> -->

                    <!-- Проверка на длину грязного телефона, 18 символов -->
                    <UiButton v-if="results && results.isValid === false">
                        <v-icon icon="mdi-arrow-up" />
                        Введите номер
                    </UiButton>

                    <div v-else>
                        <UiButton @click="sendPhoneInfo" bgColor="blue"> Выслать код </UiButton>
                        <p class="txt-cap1 color-gray" style="margin-top: 18px">
                            Нажимая на кнопку вы даёте согласие на обработку данных
                        </p>
                    </div>

                    <v-col v-if="your_phone" class="mt-4">
                        <v-row justify="center">
                            <p class="your-phone-text ma-0 mr-5">Это ваш номер?</p>
                            <router-link class="your-phone-href" to="/auth">Войти, используя его</router-link>
                        </v-row>
                    </v-col>
                </v-form>
            </div>

            <!-- OTP-код -->
            <div v-if="pageStep === 2" class="button-container text-center">
                <p class="code-title text-left ma-0 pl-4">Введите код из смс сообщения:</p>
                <div style="
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        margin-top: 40px;
                        margin-bottom: 35px;
                    ">
                    <!-- <v-otp-input v-model="otp" input-classes="otp-input"  class="mt-3 ms-n2" length="4" placeholder="0"
                        variant="underlined"></v-otp-input>  -->
                        <v-otp-input ref="otpInput" input-classes="otp-input" separator="" :num-inputs="4"
                        v-model:value="otpCode" :should-auto-focus="true" input-type="number" @on-complete="sendCode"
                        :class="{
                'otp-input--has-value': otpCode.length > 0,
                'blue-bottom-border': otpCode.length === inputIndex + 1
            }" />
                </div>
                <v-chip v-show="codeError" class="chip mt-4"> Неверный код </v-chip>
                <v-progress-circular v-if="isLoading" width="2" class="loading mx-auto text-center mt-4" color="active"
                    indeterminate></v-progress-circular>
                <v-col v-if="!isLoading" class="text-left mt-2">
                    <p class="text-code ma-0">Не пришла смс в течении 2 минут?</p>
                    <a @click="sendPhoneInfo" class="text-code-href ma-0">Отправить снова</a>
                </v-col>
            </div>
        </v-row>
    </v-col>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { vMaska } from 'maska'
import UiButton from '~/components/ui-kit/UiButton.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import Header from '~/components/Header.vue'
import { postUserLoginCode, postUserConfirm } from '~/API/ways/user.ts'
import VOtpInput from 'vue3-otp-input'
import { useUserStore } from '~/store/user'
import { useRouter } from 'vue-router'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
const phoneNumber = ref()
const countryCode = ref('')
const results = ref()
const router = useRouter()
const user = useUserStore()

const pageStep = ref(1)
const inputIndex = ref(1); // начинаем с -1, так как счет начинается с 0

const codeError = ref(false)
const isLoading = ref(false)

const phone = ref('')
const phoneOptions = { mask: '+7 (###) ###-##-##' }

const otpInput = ref(null)
const otpCode = ref('')

const clearPhone = computed(() => {
    return '+' + phone.value.match(/\d/g).join('')
})
watch(otpCode, (newValue) => {
    inputIndex.value = newValue.length - 1; // обновляем inputIndex при изменении otpCode
});
async function sendPhoneInfo() {
    if (phone.value != null)
        await postUserLoginCode(clearPhone.value).then((response) => {
            try {
                if (response.data.operationResult === 'OK') {
                    pageStep.value = 2
                }
            } catch (e) {
                console.error('error text:', e)
            }
        })
}

async function sendCode() {
    if (clearPhone.value && otpCode.value != null) {
        isLoading.value = true
        await postUserConfirm(clearPhone.value, otpCode.value)
            .then((response) => {
                if (response.data.operationResult === 'OK') {
                    user.setUserToken(response.data.object.jwtToken)
                    $cookies.set('jwtToken', response.data.object.jwtToken)
                    $cookies.set('userId', response.data.object.user.id)
                    localStorage.setItem('userToken', response.data.object.jwtToken)
                    localStorage.setItem('userId', response.data.object.user.id)
                    router.push('/screening')
                }
            })
            .catch((e) => {
                codeError.value = true
                console.error('error text:', e)
            })
            .finally(() => (isLoading.value = false))
    }
}
</script>

<style lang="scss">
.blue-bottom-border input {
    border-bottom-color: #29b6f6 !important;
    /* устанавливаем синюю границу */
}

.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    outline:none;
    border-radius: 4px;
    border-bottom: 4px solid #E0E0E0;
    box-shadow: 
    0px 1px -3px rgba(0, 0, 0, 0.1);
    //     /* Тень сверху */
    //     // 1px 0px 3px rgba(0, 0, 0, 0.1),
    //     /* Тень справа */
    //     // -1px 0px 3px rgba(0, 0, 0, 0.1);
    // /* Тень слева */
    text-align: center;

    &__error {
        border-bottom: 4px solid red !important;
    }
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.chip {
    background: #ffebee !important;
    border: 1px solid rgba(255, 61, 0, 0.2) !important;
    color: #ff3d00 !important;
    font-size: 18px !important;
    border-radius: 100px !important;
    line-height: 22px !important;
    width: 100% !important;
    height: 54px !important;
    justify-content: center !important;
}
</style>

<style scoped>
.container {
    height: 80vh;
}

.button-container {
    width: 80%;
}

.input {
    border-radius: 12px;
}

.button {
    border-radius: 12px;
    border: 1px solid #263238 !important;
}

.your-phone-text {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.01em;
    color: #9e9e9e;
}

.your-phone-href {
    font-size: 13px;
    line-height: 14px;
    text-decoration: none;
    letter-spacing: 0.01em;
    color: #29b6f6;
}

.button-validate {
    background: linear-gradient(96.78deg, #13d5ff -0.02%, #12a1de 94.31%) !important;
    border: 1px solid #12b7ec !important;
    box-shadow: 0 22px 22px -17px #29b6f6 !important;
    border-radius: 12px !important;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
}

.button-validate-text {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.01em;
    color: #9e9e9e;
}

.code-title {
    font-size: 16px;
    line-height: 18px;
    color: #263238;
}

.otp {
    width: 205px;
    margin: auto;
}

.text-code {
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.01em;
    color: #9e9e9e;
}

.text-code-href {
    font-size: 13px;
    line-height: 14px;
    text-decoration: none;
    letter-spacing: 0.01em;
    color: #29b6f6;
}

.loading {
    width: 38px !important;
    height: 38px !important;
}
</style>