<script lang="ts">
export default {
    name: 'UiSkills',
}
</script>

<template>
    <v-card v-if="props.skillsType != 'Project'" class="ui-skills shadow-sm p-4">
        <div class="ui-skills__head" v-if="props.readOnly === false">
            <p class="txt-cap2">{{ $t('me.skills') }} </p>
            <div v-if="deleteMode === false" @click="showSheet = true" class="ui-skills__btn">
                <p class="txt-body1">{{ $t('me.add') }} </p>
                <v-icon icon="mdi-plus" size="x-small" />
            </div>
            <div v-else @click="deleteMode = false" class="ui-skills__btn">
                <p class="txt-body1">{{ $t('me.cancel') }} </p>
            </div>
            <div v-if="chosenSkills?.length > 0" @click="deleteMode ? deleteSelectedSkills() : deleteMode = true"
                class="ui-skills__trash">
                <img src="../../assets/icons/trash.svg" alt="" />
            </div>
        </div>
        <div class="ui-skills__list">
            <div v-for="(skill, id) in chosenSkills" :key="id">
                <div @click="toggleSkillSelection(id)"
                    :class="{ 'ui-skills__skill': true, 'selected border-[1.5px] border-red-500': deleteMode && selectedSkills.includes(id) }">
                    {{ skill }}
                </div>
            </div>
        </div>
    </v-card>
    <div class="ui-skills__projects" v-else>
        <div @click="openModal(skill)" class="ui-skills__projects__tag" v-for="(skill, id) in chosenSkills" :key="id">
            <p class="txt-body2">{{ skill }}</p>
        </div>
        <div v-show="chosenSkills.length < 3" @click="showPopup = true" class="ui-skills__projects__tag">
            <v-icon size="x-small" icon="mdi-plus" />
        </div>
    </div>
    <!-- TODO: убрать логику модалки в имзенение проекта  -->
    <v-dialog v-model="searchModalState" width="100%">
        <v-card class="ui-skills__search">
            <p>
                <span v-show="props.skillsType === 'Project'"> Найти: </span>
                <span v-show="props.skillsType != 'Project'">Найти специалистов с навыком: </span>
                <span>{{ chosenModalSkill }}</span>
            </p>
            <div class="ui-skills__search__actions">
                <UiButton @click="searchModalState = false" bgColor="smOutlined" isSmall> Отмена </UiButton>
                <UiButton @click="goToSearchPage" bgColor="smBlue" isSmall>Найти</UiButton>
            </div>
        </v-card>
    </v-dialog>
    <transition name="bottom-sheet">
        <div v-if="showSheet" style="overflow-y: auto;" class="bottom-sheet bg-white text-left"
            @click="showPopup = false">
            <div class="txt-body1 mb-2 mx-4">Выбрано : {{ chosenSkills.length }}</div>
            <UiInput v-model="searchTerm" class="mx-4" label="Введите навык для поиска" />
            <div class="ui-skills__choser mt-2 " v-for="(skill, id) in categories" :key="id">
                <div class="m-0" v-for="(interest, id) in skill.object" :key="id">
                    <p class="text-[#29b6f6] text-lg mx-5 ml-[3%] ui-skills__choser__title">
                        {{ interest.name }}
                    </p>
                    <div class="m-0 p-0 cursor-pointer" v-for="(name, id) in interest.interests" :key="id">
                        <p @click="addSkill(name.name)" v-if="name.name" class="txt-body1 ui-skills__choser__skill"
                            :class="{ 'skill-chosen': chosenSkills.includes(name.name) }">
                            {{ name.name }}
                        </p>
                    </div>
                    <!-- <UiAgree class="ui-skills__choser__close" @click="patchSkills" /> -->
                </div>
            </div>
            <v-btn @click="showSheet = false" class="close-btn mr-2 text-white" icon="mdi-check" color="#00e676" />
        </div>
    </transition>
</template>
<script lang="ts" setup>
// import trashBlack from '~/assets/demo/trash_black.svg'
// ui-kit
import UiInput from './UiInput.vue'
import UiButton from './UiButton.vue'
import UiAgree from './UiAgree.vue'
import { ref, Ref, onMounted } from 'vue'
// import { skills } from '~/helpers/skills'
import { getInterestListGrouped } from '~/API/ways/dictionary'
import { useRouter } from 'vue-router'
import { patchUser } from '~/API/ways/user'
const router = useRouter();
const showSheet = ref(false);
let showPopup = ref(false)
// const snackbar = ref(false)
// const timeout = 1000
const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    skillsType: {
        type: String,
    },
})
const categories = ref([]);
const searchTerm = ref('');
const getInterst = async () => {
    try {
        const res = await getInterestListGrouped();
        categories.value = res;
    } catch (error) {
        console.error("Error fetching interests:", error);
    }
}
const deleteMode = ref(false)
const chosenModalSkill = ref(null)
const searchModalState = ref(false)
function openModal(skill: any) {
    chosenModalSkill.value = skill
    searchModalState.value = true
}
const addSkill = (skillName: any) => {
    const index = chosenSkills.value.indexOf(skillName);
    if (index !== -1) {
        chosenSkills.value.splice(index, 1);
    } else {
        chosenSkills.value.push(skillName);
    }
}
const chosenSkills: Ref<Array<string>> = ref([])
onMounted(() => {
    getInterst()
})
const showDeleteConfirmation = ref(false);
const selectedSkills = ref<number[]>([]);
function toggleSkillSelection(id: number) {
    if (deleteMode.value) {
        const index = selectedSkills.value.indexOf(id);
        if (index === -1) {
            // Навык еще не выбран, добавляем его
            selectedSkills.value.push(id);
        } else {
            // Навык уже выбран, убираем его
            selectedSkills.value.splice(index, 1);
        }
    } else {
        // Если не в режиме удаления, открываем модальное окно для редактирования навыка
        openModal(chosenSkills.value[id]);
    }
}
function deleteSelectedSkills() {
    selectedSkills.value.forEach(id => {
        chosenSkills.value.splice(id, 1);
    });
    snackbar.value = !snackbar.value

    // Очищаем массив выбранных навыков
    selectedSkills.value = [];
    // Выключаем режим удаления
    deleteMode.value = false;
    showDeleteConfirmation.value = true;

}
const goToSearchPage = () => {
    const skill = chosenModalSkill.value;
    router.push({ path: '/search', query: { skill } });
};
const patchSkills = async () => {
    const data = {
        "id": localStorage.getItem("userId"),
        "interests": [
            {
                name: chosenSkills.value
            }
        ]
    };
    try {
        const response = await patchUser(data);
        console.log(response); // Выводим ответ для проверки
    } catch (error) {
        console.error('Error patching user:', error); // Обработка ошибки
    }
}

</script>

<style lang="scss">
.bottom-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    padding: 16px 0;
    max-height: 80vh;
    /* Example: Limit height to 80% of viewport height */
    overflow-y: auto;
}


.bottom-sheet-content {
    padding: 16px;
    position: relative;
}

.close-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
    border-radius: 12px;
    color: white;
    box-shadow: 0px 9px 9px -9px #00b65d;
    padding: 10px;
}

.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
    transition: transform 0.3s ease-in-out;
}

.bottom-sheet-enter,
.bottom-sheet-leave-to {
    transform: translateY(100%);
}

.action-btn {
    position: absolute;
    bottom: 16px;
    right: 16px;
}

.snacbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 19px;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: -100%;
    height: 112%;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.popup {
    padding-top: 20px;
    padding-bottom: 32px;
    background: white;
    border-radius: 24px;
    max-height: 80%;
    min-height: 40%;
    width: 100%;
    max-width: 768px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
}


.selected {
    background-color: #FFEBEE;
    border: 1px solid red;
    color: white;
}

.skill-chosen {
    background-color: #E1F5FE;
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

    &__trash {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        width: 31px;
        height: 31px;
        background: #ff3d00;
        box-shadow: 0px 3px 6px -3px #ff3d00;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    &__search {
        padding: 40px 30px 30px 30px;
        border-radius: 20px !important;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05) !important;

        p {
            margin-bottom: 24px;
            text-align: center;
        }

        &__actions {
            display: flex;
            justify-content: space-between;
        }
    }

    &__skill {
        padding: 6px 16px;
        color: $def-black;
        max-width: fit-content;
        border: 1.5px solid $primary;
        border-radius: 8px;
    }

    &__choser {
        display: flex;
        flex-direction: column;
        margin-bottom: 0px;
        position: relative;

        &__close {
            position: absolute;
            bottom: 0;
            right: 10%;
            width: 40px;
            height: 40px;
            // padding: 10px;
            cursor: pointer;

            @media (max-width: 768px) {
                right: 40px;
                width: auto;
                height: auto;
            }
        }

        &__title {
            color: $def-gray;
        }

        &__skill {
            padding: 9px 0px 9px 47px;
            color: $def-black;
        }
    }

    &__projects {
        display: flex;
        gap: 8px;

        &__tag {
            padding-top: 6px;
            width: 100%;
            border: 1px solid #e0e0e0;

            border-radius: 8px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 7px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
        }
    }


}
</style>