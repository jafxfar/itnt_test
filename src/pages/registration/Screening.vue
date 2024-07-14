<template>
    <Header showLogo />
    <div class="flex flex-row m-4 justify-between gap-2">
        <div v-if="pageStep === 1" class="hidden"></div>
        <div v-else v-for="step in 4" :key="step" class="progress-bar"
            :class="{ 'cursor-not-allowed': step > maxReachedStep }" @click="setPageStep(step)"
            :style="getProgressBarStyle(step)">
            <div :style="{ width: pageStep >= step ? '100%' : '0%', transition: 'width 0.5s ease' }"
                class="progress-fill"></div>
        </div>
    </div>

    <v-col>
        <!-- Первый этап -->
        <div v-show="pageStep === 1" class="screening__first">
            <UiInput v-model="user.firstName" placeholder="Представьтесь" label="Как другим участникам вас называть?"
                prepend-icon="account-outline" />
            <!-- Кнопка активна, если длина строки больше двух символов -->
            <UiButton :is-disabled="user.firstName?.length < 2" @click="pageStep += 1" bgColor="blue">
                Продолжить
            </UiButton>
        </div>
        <!-- Навигация этапов -->
        <div v-show="pageStep === 2">
            <v-col class="text-center pa-0 pt-16">
                <p class="ma-0">{{ user.firstName }}, хотите выглядеть особенно?</p>
            </v-col>
            <div style="display: flex; align-items: center" class="rounded-circle mx-auto mt-6">
                <v-file-input height="200" v-model="user.pictureUrl" accept="image/png, image/jpeg, image/bmp"
                    class="input-file">
                </v-file-input>
                <img src="../../assets/img/regSteps/addProfilePic.svg" v-show="user.pictureUrl == ''"
                    class="rounded-circle mx-auto" height="208" width="208" />
                <!-- v-show="user.pictureUrl != ''" -->
                <img v-if="blobPic" class="rounded-circle mx-auto" height="208" width="208" :src="blobPic" />
            </div>

            <UiButton @click="selectProfilePic" class="mb-4 mt-12" bgColor="blue"> Выбрать аватар </UiButton>

            <UiButton @click="pageStep += 1" bgColor="def"> Пропустить </UiButton>
        </div>

        <div v-show="pageStep === 3">
            <v-col class="text-center pa-0 pt-16">
                <p class="ma-0">Откуда вы?</p>
            </v-col>
            <v-col class="mt-6">
                <v-select v-model="user.country" variant="outlined" label="Страна" class="rounded-lg mb-2"
                    :items="Object.keys(list)" :item-text="'name'" :menu-props="{ bottom: true, offsetY: true }"
                    hide-details></v-select>
                <v-select v-model="user.city" :disabled="user.country ? false : true" variant="outlined"
                    label="Выберите город" class="rounded-lg" :item-text="'name'"
                    :menu-props="{ bottom: true, offsetY: true, maxHeight: '300' }"
                    :items="(list as any)[user.country]"></v-select>

                <UiButton @click="pageStep += 1" bgColor="blue" class="mt-6"> Продолжить </UiButton>
                <UiButton @click="pageStep += 1" bgColor="def" class="mt-4"> Пропустить </UiButton>
            </v-col>
        </div>
        <div v-show="pageStep === 4">
            <v-col class="text-center pl-3 pr-3 pt-16">
                <!-- Подсказка -->
                <UiPrompt style="margin-bottom: 24px">
                    Если пользователи и владельцы проектов будут сразу понимать какими навыками обладает собеседник -
                    общаться станет удобнее.
                </UiPrompt>

                <UiSkills />

                <UiButton bgColor="def" @click="saveProfile" color="background" class="mt-6"> Пропустить </UiButton>
                <UiButton bgColor="blue" @click="saveProfile" class="mt-6"> Продолжить </UiButton>
            </v-col>
        </div>
        <div v-if="isLoading" class="loader-overlay loader-active">
            <div class="loader"></div>
        </div>
        <div v-if="showCheckmark" class="checkmark-overlay">
            <div class="checkmark-icon"><img src="/src/assets/LoadingIcon.svg" alt=""></div>
        </div>
        <transition name="fade">
            <div v-if="showOverlay" style="background-color: #29b6f6;"></div>
        </transition>
    </v-col>

</template>

<script setup lang="ts">
// ui-kit
import UiButton from '~/components/ui-kit/UiButton.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import UiPrompt from '~/components/ui-kit/UiPrompt.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'
import Header from '~/components/Header.vue'
import Arr from '~/helpers/set.ts'
import { getCountryList } from '~/API/ways/dictionary'
import { useRouter } from 'vue-router'
import { reactive, ref, watch, onMounted } from 'vue'
import { postAddUserPicture, patchUser } from '~/API/ways/user'
import { useUserStore } from '~/store/user'
const router = useRouter()
const list = ref(Arr)


const blobPic = ref('')
const pageStep = ref(1)
const maxReachedStep = ref(4);
const isLoading = ref(false);
const showCheckmark = ref(false);
const showOverlay = ref(false);

const setPageStep = (step: number) => {
    if (step <= maxReachedStep.value) {
        pageStep.value = step;
        if (step === 4) { // Предполагаем, что 4 - это последний шаг
            startLoading();
        }
    }
};
const startLoading = () => {
    setTimeout(() => {
        isLoading.value = false; // Прекратить загрузку после имитации задержки
    }, 3000); // Задержка в миллисекундах
};

const getProgressBarStyle = (step: number) => {
    return {
        boxShadow: step <= maxReachedStep.value ? '0 1px 4px rgba(0, 0, 0, 0.2)' : '',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        width: '24%',
        height: '10px',
    };
};


const user = reactive({
    city: '',
    country: '',
    pictureUrl: '',
    firstEntry: false,
    firstName: '',
    id: localStorage.getItem('userId'),
    roles: [''],
})
onMounted(async () => {
    await getCountryList().then((response: any) => {
        console.log(response)
    })
})



async function selectProfilePic() {
    let formData = new FormData()
    formData.append('file', user.pictureUrl[0])
    formData.append('mainPicture', 'true')
    await postAddUserPicture(formData, false)
        .then((response: any) => {
            console.log(response)
        })
        .catch((e: Error) => {
            console.error('error text:', e)
        })
}
function addAvatar() {
    blobPic.value = URL.createObjectURL(user.pictureUrl[0])
}
async function saveProfile() {
    isLoading.value = true;
    patchUser(user).then((response: any) => {
        try {
            console.log(response)
            if (response.data.operationResult === 'OK') {
                setTimeout(() => {
                    isLoading.value = false;
                    showCheckmark.value = true;
                    setTimeout(() => {
                        showCheckmark.value = false;
                        showOverlay.value = true;
                        setTimeout(() => {
                            showOverlay.value = false;
                            router.push('/me');
                        }, 500);
                    }, 1000);
                }, 3000);
            }
        } catch (error) {
            console.log(error)
        }
    })
}

watch(
    user,
    () => {
        if (user.pictureUrl) {
            addAvatar()
        }
    },
    { deep: true }
)

</script>

<style lang="scss" scoped>
.progress-bar,
.stepper,
.stepper-two,
.stepper-two-fill,
.stepper-fo,
.stepper-tree,
.stepper-tree-fill {
    height: 10px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
}

.progress-fill {
    height: 100%;
    background-color: #29b6f6;
}

.screening__first {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05) !important;
}

.container {
    min-height: 80vh;
}

.button,
.button-active {
    border-radius: 12px;
}

.button-active {
    background: linear-gradient(96.78deg, #13d5ff -0.02%, #12a1de 94.31%);
    border: 1px solid #12b7ec;
    box-shadow: 0 22px 22px -17px #29b6f6 !important;
    color: white;
}

.stepper-row {
    gap: 10px;
}

.stepper-two:before,
.stepper-two-middle:before,
.stepper-two-fill:before,
.stepper-fo:before,
.stepper-fo-fill:before,
.stepper-tree:before,
.stepper-tree-fill:before {
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(41, 182, 246, 0.25) !important;
    background: #29b6f6;
    border-radius: 12px;
}

.stepper-two:before {
    width: 35%;
}

.stepper-two-middle:before {
    width: 80%;
}

.stepper-two-fill:before {
    width: 100%;
}

.stepper-fo:before {
    width: 40%;
}

.stepper-fo-fill:before {
    width: 80%;
}

.stepper-tree:before {
    width: 70%;
}

.stepper-tree-fill:before {
    width: 100%;
}

.button-skip {
    border: 1px solid rgba(158, 158, 158, 0.2);
    box-shadow: 0 23px 10px -23px rgba(0, 0, 0, 0.15) !important;
    border-radius: 12px;
}

.avatar {
    min-width: 24px;
    width: 24px;
    height: 24px;
}

.input-file {
    min-width: 208px;
    min-height: 220px;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -12%);
    position: absolute;
    opacity: 0;
}

.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
}

.loader {
    border: 3px solid #f3f3f3;
    border-top-color: #29b6f6;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    animation: spin 1s linear infinite;
}

.loader-active {
    visibility: visible;
    opacity: 1;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.checkmark-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    /* Подберите подходящее значение */
}

.checkmark-icon {
    background-color: #29b6f6;
    padding: 6px;
    border-radius: 50%;
    font-size: 24px;
    color: #fff;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active в версиях 2.1.8+ */
    {
    opacity: 0;
}
</style>