<!-- CommentInput.vue -->
<template>
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

<script >
export default {
    props: ['replyToComment'],
    data() {
        return {
            commentText: ''
        }
    },
    methods: {
        pushComment() {
            this.$emit('push-comment', this.commentText);
            this.commentText = '';
        }
    }
}
</script>

<style scoped>
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
}</style>