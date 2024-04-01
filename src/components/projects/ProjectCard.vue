<template>
    <div class="projectCard">
        <!-- READONLY -->
        <div v-if="props.readOnly">
            <div class="projectCard__slider">
                <img width="335" height="492" v-for="i in 3" src="../../assets/demo/demo-rec1.png" />
            </div>
            <div class="projectCard__tags">
                <div class="projectCard__tags--tag txt-body2">Инвестиции</div>
                <div class="projectCard__tags--tag txt-body2">Стартапы</div>
                <div class="projectCard__tags--tag txt-body2">Нетворкинг</div>
            </div>
            <div class="projectCard__info">
                <p class="projectCard__info__title txt-body1">{{ props?.prjDescHead }}</p>
                <p class="projectCard__info__body txt-body2">
                    {{ props?.prjDescBody }}
                </p>
            </div>
        </div>

        <!-- EDITABLE -->
        <div v-else>
            <!-- Фотографии проекта -->
            <div class="projectCard__editable__pics">
                <ProjectAddPhoto/>
                <!-- <div class="projectCard__editable__pics__grid">
                    <img v-for="i in 7" width="73" height="106" src="@/assets/demo/projectSmallCard.svg" />
                    <div @click="addProjectPhoto" class="projectCard__editable__pics__adder">
                        <v-icon icon="mdi-plus" />
                    </div>
                </div> -->
            </div>

            <!-- Теги проекта -->
            <div class="projectCard__editable__tags">
                <p>Ваш проект в трёх словах (теги)*</p>

                <UiSkills skillsType="Project" />
            </div>

            <!-- Описание проекта -->
            <div class="projectCard__editable__info">
                <p>Опишите проект</p>

                <UiInput label="Заголовок*" v-model="prjObject.descriptionHeader" />

                <div>
                    <!-- TODO: сделатб хелпер под правила -->
                    <UiTextArea
                        :rules="[(v) => v.length <= 1024 || 'Max 1024 characters']"
                        counter
                        label="Описание проекта*"
                        v-model="prjObject.description"
                    />

                    <UiPrompt
                        >Текст, выделенный зелёным цветом, будет отображаться на мини-карточке проекта в разных местах
                        приложения, где пространство ограничено. А полное описание будет отображаться на странице вашего
                        проекта.
                    </UiPrompt>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import UiPrompt from '../ui-kit/UiPrompt.vue'
import UiInput from '../ui-kit/UiInput.vue'
import UiTextArea from '../ui-kit/UiTextArea.vue'
import ProjectAddPhoto from './ProjectAddPhoto.vue';
// import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '~/store/projectStore'
import UiSkills from '../ui-kit/UiSkills.vue'

const { prjObject } = storeToRefs(useProjectStore())

const props = defineProps({
    readOnly: {
        type: Boolean,
        default: false,
    },
    prjDescHead: {
        type: String,
    },
    prjDescBody: {
        type: String,
    },
})

// function addAvatar() {
//     blobPic.value = URL.createObjectURL(user.pictureUrl[0])
// }

// watch(
//     user,
//     () => {
//         if (user.pictureUrl) {
//             addAvatar()
//         }
//     },
//     { deep: true }
// )
</script>

<style lang="scss" scoped>
.projectCard {
    &__slider {
        display: flex;
        gap: 20px;
        -ms-overflow-style: none;
        scrollbar-width: none;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    &__tags {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        margin-bottom: 48px;

        &--tag {
            border-radius: 8px;
            background: $prim-var2;
            padding: 6px 18px;
            color: #1769aa;
        }
    }
    &__info {
        &__title {
            margin-bottom: 12px;
        }
    }

    // EDITABLE
    &__editable {
        &__pics {
            p {
                margin-bottom: 18px;
            }
            &__grid {
                display: flex;
                gap: 16px;
                flex-wrap: wrap;
            }
            &__adder {
                height: 106px;
                width: 73px;
                background: $def-white;
                border-radius: 12px;
                align-items: center;
                justify-content: center;
                display: flex;
            }
        }

        &__tags {
            margin-top: 43px;
            margin-bottom: 48px;
            p {
                margin-bottom: 16px;
            }
        }

        &__info {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
    }
}
</style>
