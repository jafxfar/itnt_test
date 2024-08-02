<template>
    <Header showUserMinify showID />
    <ProfileHeader  :bg-pic="fullBannerUrl" :ava-pic="fullAvatarUrl" />
    <v-container>
        <div class="userEdit my-4">
            <UiInput v-model="user.firstName" class="mb-4" label="Имя" :required="true" />
            <UiInput v-model="user.lastName" class="mb-4" label="Фамилия" :required="true" />
            <v-select menu-icon="mdi-chevron-down" v-model="user.country" variant="outlined" label="Страна" rounded="lg" class="mb-2" color="active"
                :items="Object.keys(list)" hide-details></v-select>
            <v-select menu-icon="mdi-chevron-down" v-model="user.city" :disabled="user.country ? false : true" variant="outlined" color="active"
                label="Выберите город" rounded="lg" :items="(list as any)[user.country]"></v-select>
        </div>
       
        <div class="props mb-12">
            <div class="props__inner" :class="{ 'props__inner--selected': user.openedForProposition === false }">
                <label>
                    <input type="radio" v-model="user.openedForProposition" :value="false" />
                    <v-icon icon="mdi-check" v-if="user.openedForProposition === false" class="checkmark" />
                    <span>Мне не интересно сотрудничество</span>
                </label>
            </div>
            <div class="props__inner" :class="{ 'props__inner--selected': user.openedForProposition === true }">
                <label>
                    <input type="radio" v-model="user.openedForProposition" :value="true" />
                    <v-icon icon="mdi-check" v-if="user.openedForProposition === true" class="checkmark" />
                    <span>Я хочу получать предложения о сотрудничестве</span>
                </label>
            </div>
        </div>
        <div clas8s="about">
            <UiTextArea :rules="[(v) => v.length <= 300 || 'Max 300 characters']" label="О себе"
                v-model="user.fullDescription" />
        </div>
        <div class="userEdit__components">
            <UiSkills />
            <ProjectsList showAdder class="mt-12" :projects="user.projects" />
        </div>
    </v-container>
    <UiAgree @click="changeUser" />
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import ProjectsList from '~/components/profile/ProjectsList.vue'
import UiSkills from '~/components/ui-kit/UiSkills.vue'
import UiAgree from '~/components/ui-kit/UiAgree.vue'
import UiTextArea from '~/components/ui-kit/UiTextArea.vue'
// import star from "~/assets/modal_icon/star-filled.svg"
// import follow from "~/assets/modal_icon/follow.svg"
import Arr from '~/helpers/set'
import UiInput from "~/components/ui-kit/UiInput.vue";
import { ref, onMounted, computed } from 'vue';
import { patchUser, getUserByID } from '~/API/ways/user';
import { useRouter } from 'vue-router';
const list = ref(Arr)
const router = useRouter()
const user = ref({
    id: localStorage.getItem('userId'),
    city: '',
    country: "",
    firstName: '',
    lastName: "",
    nickName: "",
    fullDescription: '',
    pictureUrl:'',
    projects:[],
    backgroundPictureUrl:''
    // openedForProposition: false,
});

onMounted(async () => {
    try {
        const response = await getUserByID(Number(localStorage.getItem('userId')));
        user.value = {
            ...user.value,
            ...response.data.object
        };
        console.log(response);
    } catch (e) {
        console.error('error:', e);
    }
});
const changeUser = async () => {
    console.log('click');
    await patchUser(user.value).then(() => {
        try {
            router.push('/me')
        } catch (e) {
            console.error('error :', e);
        }
    });
};
const baseURL = 'http://62.217.181.172/';

const fullAvatarUrl = computed(() => {
    return user.value.pictureUrl ? `${baseURL}files/${user.value.pictureUrl}` : '';
});
const fullBannerUrl = computed(() => {
    return user.value.backgroundPictureUrl ? `${baseURL}files/${user.value.backgroundPictureUrl}` : '';
});
</script>

<style lang="scss" scoped>
.userInfo {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;

    &__status {
        padding: 5.5px 14px;
        align-items: center;
        display: flex;
        max-width: fit-content;
        border: 1.5px solid #29b6f6;
        border-radius: 8px;
        gap: 9px;

        &__title {
            color: #29b6f6;
        }
    }
}

.userEdit {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__components {
        display: flex;
        flex-direction: column;
        gap: 48px;
        margin-top: 48px;
    }
}

.about {
    position: relative;
    height: auto;
}

.about-before {
    position: absolute;
    bottom: -37px;
    right: 10px;
}

.props {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    gap: 20px;

    &__inner {
        width: 50%;
        border-radius: 12px;
        background: #fff;
        padding: 20px 7px;
        border: 1px solid #dcdcdc;
        transition: border-color 0.3s, box-shadow 0.3s;
        cursor: pointer;

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }

    input {
        display: none;
    }

    .props__inner--selected {
        border-color: #29B6F6;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    }

    .checkmark {
        font-size: 18px;
        color: #29B6F6;
        margin-right: 5px;
    }
}

.ui-skills {
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    &__head {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 17.5px;
        gap: 25px;
    }

    &__btn {
        display: flex;
        align-items: center;
        background: $primary;
        color: white;
        max-width: 133px;
        width: 100%;
        justify-content: center;
        padding: 5px 10px 5px 12px;
        gap: 4px;
        border-radius: 100px;
    }
}
</style>