<template>
    <Header showID showUserMinify />
    <ProjectHeader commentText :prj-name="data.name" :prjID="data.id" :prj-slogan="data.slogan" />
    <div v-for="comment in comments" :key="comment.id" class="mx-4">
        <div class="feedCard mx-4" v-if="comment.isReply">
            <div class="feedCard__head">
                <div class="d-flex align-center">
                    <img class="mr-3" width="30" height="30" src="../../assets/demo/ava-small-header.svg" />
                    <div>
                        <div class="flex flex-col items-start">
                            <p class="txt-body3">Save and Brave</p>
                            <span style="color: #9e9e9e" class="txt-cap1">slogan</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- body -->
            <div class="feedCard__body">
                <!-- Новый этап проекта -->
                <p class="txt-cap1">
                    {{ comment.text }}
                </p>
            </div>
            <!-- footer -->
            <div class="feedCard__footer">
                <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feed.time') }}</span>
                <button style="color: #9e9e9e" class="txt-cap1" @click="startReply(comment)">Ответить</button>
            </div>
        </div>
        <div class="feedCard" v-else>
            <div class="feedCard__head">
                <div class="d-flex align-center">
                    <img class="mr-3" width="30" height="30" src="../../assets/demo/ava-small-header.svg" />
                    <div>
                        <div class="flex flex-col items-start">
                            <p class="txt-body3">Save and Brave</p>
                            <span style="color: #9e9e9e" class="txt-cap1">slogan</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- body -->
            <div class="feedCard__body">
                <!-- Новый этап проекта -->
                <p class="txt-cap1">
                    {{ comment.text }}
                </p>
            </div>
            <!-- footer -->
            <div class="feedCard__footer">
                <span style="color: #9e9e9e" class="txt-cap1">{{ $t('feed.time') }}</span>
                <button style="color: #9e9e9e" class="txt-cap1" @click="startReply(comment)">Ответить</button>
            </div>
        </div>
    </div>
    <div class="input">
        <div v-if="replyToComment">
            <p>В ответ Save and Brave</p>
            <p>{{ replyToComment.text }}</p>
        </div>
        <div class="input-container">
            <input @keyup.enter="pushComment" type="text" v-model="commentText" placeholder="Ваш комментарий..." />

            <button @click="pushComment"><img :src="send" alt=""></button>
        </div>
    </div>

</template>

<script setup lang="ts">
import Header from '~/components/Header.vue';
import ProjectHeader from '~/components/projects/ProjectHeader.vue';
import { ref, onMounted } from 'vue';
import { getProjectByID, addComment } from '~/API/ways/project.ts'
import { useRoute } from 'vue-router'
import send from "~/assets/icons/chat.svg"
// let displayedComments = ref(2)

// const showMoreComments = () => {
//     desplayComment.value += 5
// }
let data = ref({})
const route = useRoute()
onMounted(async () => {
    await getProjectByID(route.params.ID).then((response) => {
        try {
            data.value = response.data.object
        } catch (e) {
            console.error('error:', e)
        }
    })
})
const commentText = ref('');
const comments = ref([]);
let replyToComment = ref(null);
const startReply = (comment) => {
    replyToComment.value = comment;
}
const pushComment = async () => {
    if (commentText.value) {
        try {
            const response = await addComment(Number(route.params.ID), commentText.value);
            const newComment = {
                id: response.data.id, // Replace with the actual id from the response
                text: commentText.value,
                isReply: replyToComment.value !== null
            };
            comments.value.push(newComment);
            commentText.value = '';
            replyToComment.value = null;
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    }
}
// const pushComment = () => {
//     if (commentText.value) {
//         const newComment = {
//             id: Date.now(),
//             text: commentText.value,
//             isReply: replyToComment.value !== null
//         };
//         comments.value.push(newComment);
//         commentText.value = '';
//         replyToComment.value = null;
//     }
// }
</script>
<style scoped lang="scss">
.input {
    position: sticky;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color: white;
    padding: 10px;

    .input-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        margin-bottom: 10px;
        padding: 10px;

        input {
            width: 100%;
            outline: none;
        }
    }
}


.feedCard {
    padding: 16px 14px;
    margin-bottom: 4px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__subtitle {
            color: #9e9e9e;
            margin-top: 1px;
            text-align: initial;
        }
    }

    &__body {
        text-align: left;

        &__slider {
            display: flex;
            gap: 16px;
            -ms-overflow-style: none;
            /* Internet Explorer 10+ */
            scrollbar-width: none;
            overflow-x: scroll;

            &::-webkit-scrollbar {
                display: none;
                /* Safari and Chrome */
            }
        }
    }

    &__vacancy {
        &__head {
            padding: 10px 20px;
            display: flex;
            gap: 10px;
            align-items: center;
            max-width: fit-content;
            border-radius: 8px;
            background: #e1f5fe;
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__button {
            padding: 14.5px 20px;
            box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 23px 10px -23px rgba(0, 0, 0, 0.15);
        }
    }
}
</style>