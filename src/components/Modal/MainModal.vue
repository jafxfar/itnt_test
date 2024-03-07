<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-end justify-center z-20"  @click.self="closeModal">
        <div class="flex items-start flex-col bg-white w-full rounded-t-md shadow-lg z-20 overflow-y-auto pt-[48px] px-[25px]">
            <button @click="openModal2"><img src="@/assets/modal_icon/open_project.svg" alt=""> Открыть проект</button>
            <button @click="openModal2"><img src="@/assets/modal_icon/follow.svg" alt="">Подписаться</button>
            <button @click="openModal2"><img src="@/assets/modal_icon/share.svg" alt="">Поделиться</button>
            <button @click="openModal2"><img src="@/assets/modal_icon/statistic.svg" alt="">Статистика проекта</button>
            <button @click="openModal2"><img src="@/assets/modal_icon/complain.svg" alt="">Пожаловаться</button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'main-modal',
    methods: {
        openModal2() {
            this.$emit('openModal2');
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
button{
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    gap:8px;
}
</style>