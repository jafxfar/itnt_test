<template>
    <div>
        <div class="d-flex mb-2 align-center justify-space-between">
            <p v-show="props.readOnly" style="color: #263238" class="txt-cap2">Наша команда:</p>
            <p v-show="!props.readOnly" style="color: #263238" class="txt-cap2">Участники проекта:</p>

            <UiButton @click="searchTeammateModal.open()" fit style="height: 36px; padding: 11px 16px" bgColor="smBlue"
                isSmall>
                <p class="txt-cap2">Заявки</p>
            </UiButton>
            <vue-bottom-sheet max-height="115px" full-screen ref="modalState">
                <div class="modalList">
                    <div v-for="(item, id) in joinTeamModalItems" :key="id" class="modalList__item">
                        <img :src="item.icon" alt="" />
                        <p :class="item.name === 'Пожаловаться' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                    </div>
                </div>
            </vue-bottom-sheet>
        </div>

        <!-- READONLY -->
        <div v-if="props.readOnly" class="projectTeam">
            <div class="projectTeam__list">
                <div v-for="users in teamMembers">
                    <div class="projectTeam__item d-flex justify-space-between">
                        <div class="d-flex projectTeam__item__main">
                            <img class="mr-5" src="../../assets/demo/projectsmallphoto.svg" alt="" />
                            <div class="txt-body2">
                                <p style="color: #263238">{{ users.user.login }}</p>
                                <p style="color: #9e9e9e"> {{ users.user.id }}</p>
                            </div>
                        </div>
                        <v-icon @click="modalState.open()" icon="mdi-dots-vertical" />
                    </div>
                </div>
            </div>

            <vue-bottom-sheet max-height="115px" full-screen ref="modalState">
                <div class="modalList">
                    <div v-for="(item, id) in readOnlyModalItems" :key="id" class="modalList__item">
                        <img :src="item.icon" alt="" />
                        <p :class="item.name === 'Пожаловаться' && 'error-txt'" class="txt-body1">{{ item.name }}</p>
                    </div>
                </div>
            </vue-bottom-sheet>
        </div>

        <!-- EDITABLE -->
        <div v-else>
            <div class="projectTeam__list">
                <div class="projectTeam__list">
                    <div v-for="users in teamMembers">
                        <div class="projectTeam__item--edit d-flex justify-space-between">
                            <div class="projectTeam__item__header--edit">
                                <div class="d-flex">
                                    <img class="mr-7" width="37" height="37"
                                        src="../../assets/demo/ava-small-header.svg" alt="" />

                                    <p class="txt-body2"> {{ users.user.login }}</p>
                                </div>
                                <div class="d-flex">
                                    <!-- <div class="isCEO">CEO</div> -->
                                    <div class="isCEO"> {{ users.user.id }}
                                    </div>

                                    <v-icon @click="modalState.open()" icon="mdi-dots-vertical" />
                                </div>
                            </div>
                            <div class="projectTeam__item__body--edit">
                                <v-icon icon="mdi-eye-off-outline" />
                                <UiInput style="max-width: 250px" label="Должность*" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex mt-2 justify-space-between align-center">
                Пригласить участника
                <UiButton @click="searchTeammateModal.open()" plus />
            </div>
        </div>

        <vue-bottom-sheet ref="modalState">
            <div class="modal">
                <div class="modal__list">
                    <div class="modal__list__item">
                        <img :src="account" alt="" />
                        <p class="txt-body1">
                            Открыть профиль
                        </p>
                    </div>
                    <div @click="authorityModal" class="modal__list__item">
                        <img :src="commit" alt="" />
                        <p class="txt-body1">
                            Настроить полномочия

                        </p>
                    </div>
                    <div class="modal__list__item">
                        <img :src="close" alt="" />
                        <p class="txt-body1">
                            Удалить человека из проекта
                        </p>
                    </div>
                    <div class="modal__list__item">
                        <img :src="key" alt="" />
                        <p class="txt-body1">
                            Передать полномочия владельца проекта
                        </p>
                    </div>
                </div>
            </div>
        </vue-bottom-sheet>

        <vue-bottom-sheet ref="searchTeammateModal">
            <div class="searchTeammateModal modal">
                <p class="mb-2">Поиск человека для добавления в проект</p>
                <UiInput prepend-icon="magnify" label="Введите данные для поиска" v-model="searchQuery" />
                <div class="searchTeammateModal__items">
                    <div v-for="user in filteredUsers" :key="user.id" class="d-flex align-center">
                        <img class="mr-3" width="37" height="37" src="../../assets/demo/ava-small-header.svg" />
                        <div>
                            <div class="d-flex align-center">
                                <p class="txt-body3">{{ user.id }}</p>
                            </div>
                            <!-- <p class="searchUserCard__head__subtitle txt-cap1">г. Санкт-Петербург</p> -->
                            <p class="searchUserCard__head__subtitle txt-cap1">{{ user.login }}</p>
                        </div>

                    </div>
                </div>

            </div>
        </vue-bottom-sheet>

        <vue-bottom-sheet full-screen ref="searchTeammateModal">
            <div class="searchTeammateModal modal">
                <p class="mb-2 p-4">К команде iTalent хотят присоединиться пользователи:</p>
                <div class="searchTeammateModal__item " v-for="users in teamMembers">
                    <v-expansion-panels>
                        <v-expansion-panel class="feedPanel">
                            <v-expansion-panel-title class="feedPanel__head">
                                <template v-slot:actions="{ expanded }">
                                    <div class="">
                                        <UiButton class="w-[80px] p-5 mr-24" v-if="!expanded" isxSmall
                                            @click="modalState.open()" bg-color="def">Чат</UiButton>
                                    </div>

                                    <v-icon :class="expanded ? 'px-6 py-3 rounded-xl' : ''"
                                        class="bg-[#e1f5fe] px-6 mt-[18px] py-3 rounded-xl" color="#1769AA"
                                        :icon="expanded ? 'mdi-chevron-up' : ' mdi-chevron-down'"></v-icon>
                                </template>
                                <img width="30" height="30" class="mr-3" src="../../assets/demo/ava-small-header.svg"
                                    alt="" />

                                <div>
                                    <div class="feedPanel__card__title align-center d-flex">
                                        <p class="txt-body3">{{ users.user.login }}</p>
                                        <img class="mx-2" src="../../assets/icons/singeDot-gray.svg" />
                                        <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feedPanels.time') }}</span>
                                    </div>
                                    <p class="color-gray txt-body2">Team mood</p>
                                </div>
                                <v-spacer></v-spacer>

                                <v-spacer></v-spacer>
                                <div class="back-messages-after"></div>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text v-if="!props.readOnly" v-for="(info, id) in demoInfo" :key="id">
                                <div class="feedPanel__card d-flex align-center">
                                    <div class="ui-vacancyPanel__head mb-2">
                                        Здравствуйте! Кажется я тот, кого вы ищете!
                                    </div>

                                    <v-spacer />
                                </div>
                                <div class="flex flex-row gap-8">
                                    <UiButton isSmall bg-color="def" @click="react(Answer.No)">Отклонить</UiButton>
                                    <UiButton isxSmall bg-color="def">Чат</UiButton>
                                    <UiButton isSmall @click="react(Answer.Yes)" bg-color="smBlue">Одобрить
                                    </UiButton>
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </div>

        </vue-bottom-sheet>
        <vue-bottom-sheet ref="searchTeammateModal">
            <div class="searchTeammateModal modal">
                <p class="mb-2">Поиск человека для добавления в проект</p>
                <UiInput prepend-icon="magnify" label="Введите данные для поиска" v-model="searchQuery" />
                <div class="searchTeammateModal__items">
                    <div v-for="user in filteredUsers" :key="user.id" class="d-flex align-center">
                        <img class="mr-3" width="37" height="37" src="../../assets/demo/ava-small-header.svg" />
                        <div>
                            <div class="d-flex align-center">
                                <p class="txt-body3">{{ user.id }}</p>
                            </div>
                            <!-- <p class="searchUserCard__head__subtitle txt-cap1">г. Санкт-Петербург</p> -->
                            <p class="searchUserCard__head__subtitle txt-cap1">{{ user.login }}</p>
                        </div>

                    </div>
                </div>

            </div>
        </vue-bottom-sheet>
        <v-dialog v-model="authority" width="100%">
            <v-card class="ui-skills__search">
                <p>
                    <span>Изменение фонового изображения</span>
                </p>
                <div class="ui-skills__search__actions">
                    <UiButton @click="removeBackgroundPicture(id)" bgColor="smOutlined" isSmall>Удалить</UiButton>
                    <UiButton bgColor="smOutlined" isSmall>Заменить</UiButton>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
///icon
import close from '~/assets/project_team/close.svg'
import commit from '~/assets/project_team/commit.svg'
import key from '~/assets/project_team/key.svg'

//
import account from "~/assets/icons/account-blue.svg"
import UiButton from '../ui-kit/UiButton.vue'
import UiInput from '../ui-kit/UiInput.vue'
import { modalActionsList } from '~/helpers/types'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import { ref, computed, onMounted } from 'vue'
import { reactToProposition } from '~/API/ways/notifications.ts';
import { getUserSearch } from '~/API/ways/user.ts';
import { getProjectPropositions, getUserProjectPropositions } from "~/API/ways/notifications.ts"
import { useRoute } from 'vue-router'
const route = useRoute()
let authority = ref(false)
const authorityModal = () => {
    authority.value = true
    modalState.close()
}
interface User {
    id: number;
    roles: Array<any>;
    login: string;
    confirmed: boolean;
    errorConfirm: boolean;
}
const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    team: {
        type: Object,
    },
})
const users = ref<User[]>([]);
const searchQuery = ref('');

enum Answer {
    Yes = "YES",
    No = "NO"
}
const teamMembers = ref([]);
onMounted(async () => {
    //есть два ответа в id 10
    const response = await getProjectPropositions(Number(route.params.ID));
    teamMembers.value = response.data.object;
    console.log('getProjectPropositions', response)
})
onMounted(async () => {
    //есть 2 ответов в projectId 10 и userId 1
    await getUserProjectPropositions(Number(route.params.ID), localStorage.getItem('userId')).then((response) => {
        try {
            console.log('getUserProjectPropositions', response)
        } catch (e) {
            console.error('text error:', e)
        }
    })
})
const filteredUsers = computed(() => {
    if (!Array.isArray(users.value)) {
        // console.error('Users is not an array:', users.value);
        return [];
    }
    return users.value.filter(user => {
        const searchLower = searchQuery.value.toLowerCase();
        return Object.values(user).some(value =>
            String(value).toLowerCase().includes(searchLower)
        );
    });
});
const fetchUsers = async () => {
    try {
        const response = await getUserSearch();
        if (response.data && Array.isArray(response.data.object)) {
            users.value = response.data.object;
        } else {
            console.error('Fetched data is not in expected format:', response.data);
            users.value = [];
        }
        // console.log('Fetched users:', users.value);
    } catch (error) {
        console.error('Error fetching users:', error);
        users.value = [];
    }
};
const react = async (propositionAnswer: Answer) => {
    try {
        const propositionId = 3;

        const response = await reactToProposition(propositionAnswer, propositionId);
        console.log(response);

    } catch (error) {
        console.error('Error sending proposition:', error);
    }
};

// 
const modalState = ref(null)
const searchTeammateModal = ref(null)
let joinTeam = ref(false)
const demoInfo = [
    {
        name: 'Евгений Анисимов',
        time: '3ч',
        spec: 'Младший Шеф-Повар',
    },

]


const readOnlyModalItems: modalActionsList[] = [
    {
        name: 'Открыть профиль',
        icon: account,
    },
]

const editableModalItems: modalActionsList[] = [
    {
        name: 'Открыть профиль',
        icon: account,
    },
]
const joinTeamModalItems: modalActionsList[] = [
    {
        name: 'Открыть профиль',
        icon: account,
    },
    {
        name: 'Настроить полномочия',
        icon: commit,
    },
    {
        name: 'Удалить человека из проекта',
        icon: close,
    },
    {
        name: 'Передать полномочия владельца проекта',
        icon: key,
    },
]
onMounted(fetchUsers);

</script>

<style lang="scss" scoped>
.projectTeam {
    &__list {
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    &__item {
        align-items: center;
        padding: 16px 9px 15px 16px;
        border-radius: 12px 12px 2px 2px;
        background: #fff;

        &--edit {
            display: flex;
            flex-direction: column;
            background: white;
        }

        &__header {
            &--edit {
                display: flex;
                justify-content: space-between;
                padding-top: 16px;
                padding-left: 24px;
                padding-right: 8px;
            }
        }

        &__body {
            &--edit {
                display: flex;
                justify-content: space-between;
                padding-right: 14px;
                padding-bottom: 23px;
                padding-left: 30px;

                align-items: center;
            }
        }
    }
}

.searchTeammateModal {
    &__items {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        min-height: 350px;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 16px;
    }
}

.isCEO {
    color: #29b6f6;
    font-weight: 400;
}

.modalList {
    padding: 0 20px;
}
</style>
