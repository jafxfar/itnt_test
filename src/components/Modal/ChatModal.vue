<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-end justify-center z-20" @click.self="closeModal">
        <div
            class="flex items-start flex-col bg-white w-full rounded-t-md shadow-lg z-20 overflow-y-auto pt-[48px] px-[25px]">
            <button @click="openInviteModal"><img src="@/assets/modal_icon/invite.svg" alt="">Пригласить в проект</button>
            <button @click="openChatComplain"><img src="@/assets/modal_icon/complain.svg" alt="">Пожаловаться</button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'chat-modal',
    methods: {
        openChatComplain() {
            this.$emit('openChatComplain');
        },
        openInviteModal() {
            this.$emit('openInviteModal');
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
button {
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    gap: 8px;
}
</style>