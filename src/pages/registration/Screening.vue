<template>
    <Header showLogo />

    <v-col>
        <!-- Первый этап -->
        <div v-show="pageStep === 1" class="screening__first">
            <UiInput
                v-model="user.firstName"
                placeholder="Представьтесь"
                label="Как другим участникам вас называть?"
                prepend-icon="account-outline"
            />
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
                <v-file-input
                    height="200"
                    v-model="user.pictureUrl"
                    accept="image/png, image/jpeg, image/bmp"
                    class="input-file"
                >
                </v-file-input>
                <img
                    src="../../assets/img/regSteps/addProfilePic.svg"
                    v-show="user.pictureUrl == ''"
                    class="rounded-circle mx-auto"
                    height="208"
                    width="208"
                />
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
                <v-select
                    v-model="user.country"
                    variant="outlined"
                    label="Страна"
                    class="rounded-lg mb-2"
                    :items="Object.keys(list)"
                    :item-text="'name'"
                    :menu-props="{ bottom: true, offsetY: true }"
                    hide-details
                ></v-select>
                <v-select
                    v-model="user.city"
                    :disabled="user.country ? false : true"
                    variant="outlined"
                    label="Выберите город"
                    class="rounded-lg"
                    :item-text="'name'"
                    :menu-props="{ bottom: true, offsetY: true, maxHeight: '300' }"
                    :items="(list as any)[user.country]"
                ></v-select>

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
    </v-col>
</template>

<script setup lang="ts">
// ui-kit
import UiButton from '~/components/ui-kit/UiButton.vue'
import UiInput from '~/components/ui-kit/UiInput.vue'
import UiPrompt from '~/components/ui-kit/UiPrompt.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'

import { reactive, ref, watch, onMounted } from 'vue'
import { postAddUserPicture, patchUser } from '~/API/ways/user'
import Header from '~/components/Header.vue'
import Arr from '~/helpers/set.ts'
import { getCountryList } from '~/API/ways/dictionary'

import { useRouter } from 'vue-router'
const router = useRouter()

let blobPic = ref('')

const pageStep = ref(1)

const list = ref(Arr)

const user = reactive({
    city: null,
    country: null,
    pictureUrl: '',
    firstEntry: false,
    firstName: '',
    id: localStorage.getItem('userId'),
    roles: [''],
})

// function sendDataM(data) {
//     user.roles = data.skills
// }

async function selectProfilePic() {
    let formData = new FormData()

    formData.append('file', user.pictureUrl[0])
    formData.append('mainPicture', 'true')

    await postAddUserPicture(formData)
        .then((response: any) => {
            console.log(response)
        })
        .catch((e: Error) => {
            console.error('error text:', e)
        })
        .finally(() => (pageStep.value += 1))
}

function addAvatar() {
    blobPic.value = URL.createObjectURL(user.pictureUrl[0])
}

// Получаем инфу о городах
onMounted(async () => {
    await getCountryList().then((response: any) => {
        console.log(response)
    })
})

async function saveProfile() {
    patchUser(user).then((response: any) => {
        try {
            console.log(response)
            if (response.data.operationResult === 'OK') {
                router.push('/me')
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
.screening {
    &__first {
        // height: calc(100vh - $header-hight);
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
}

.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 5%), 0 2px 0 0 rgb(0 0 0 / 0%), 0 0 0 0 rgb(0 0 0 / 0%) !important;
}

.container {
    min-height: 80vh;
    height: unset;
}

.container > div {
    width: 100%;
}

.button {
    border-radius: 12px;
}

.button-active {
    background: linear-gradient(96.78deg, #13d5ff -0.02%, #12a1de 94.31%);
    border: 1px solid #12b7ec;
    box-shadow: 0 22px 22px -17px #29b6f6 !important;
    border-radius: 12px;
    color: white;
}

.stepper-row {
    gap: 10px;
}

.stepper {
    width: 20%;
    height: 10px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
}

.stepper-one {
    background: #29b6f6;
    box-shadow: 0 3px 6px -3px #29b6f6 !important;
}

.stepper-two {
    position: relative;
    width: 20%;
    height: 10px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
}

.stepper-two:before {
    content: '';
    width: 35%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(41, 182, 246, 0.25) !important;
    background: #29b6f6;
    border-radius: 12px;
}

.stepper-two-middle {
    position: relative;
}

.stepper-two-middle:before {
    content: '';
    width: 80%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(41, 182, 246, 0.25) !important;
    background: #29b6f6;
    border-radius: 12px;
}

.stepper-two-fill {
    position: relative;
    width: 20%;
    height: 10px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
}

.stepper-two-fill:before {
    content: '';
    width: 100%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(41, 182, 246, 0.25) !important;
    background: #29b6f6;
    border-radius: 12px;
}

.stepper-fo {
    position: relative;
}

.stepper-fo:before {
    content: '';
    width: 40%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(41, 182, 246, 0.25);
    background: #29b6f6;
    border-radius: 12px;
}

.stepper-fo-fill {
    position: relative;
}

.stepper-fo-fill:before {
    content: '';
    width: 80%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(41, 182, 246, 0.25) !important;
    background: #29b6f6;
    border-radius: 12px;
}

.stepper-tree {
    position: relative;
}

.stepper-tree:before {
    content: '';
    width: 70%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(41, 182, 246, 0.25) !important;
    background: #29b6f6;
    border-radius: 12px;
}

.stepper-tree-fill {
    position: relative;
}

.stepper-tree-fill:before {
    content: '';
    width: 100%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(41, 182, 246, 0.25) !important;
    background: #29b6f6;
    border-radius: 12px;
}

.button-skip {
    border: 1px solid rgba(158, 158, 158, 0.2);
    box-shadow: 0 23px 10px -23px rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2) !important;
    border-radius: 12px;
}

.avatar {
    min-width: 24px !important;
    width: 24px !important;
    height: 24px !important;
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
</style>
