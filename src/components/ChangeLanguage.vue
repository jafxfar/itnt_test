<template>
    <div class="relative">
        <button class="btn" @click="toggle">
            {{ $t('entry.phone') }}
        </button>
        <div v-if="active" class="active absolute mt-1 right-0 bg-white shadow-lg rounded-lg overflow-hidden z-50">
            <button href="#" class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click.prevent="setLanguage('en')">English</button>
            <button class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click.prevent="setLanguage('ru')">Русский</button>
            <button class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click.prevent="setLanguage('ch')">中文</button>
            <button class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click.prevent="setLanguage('ar')">العربية</button>
        </div>
    </div>
</template>
    
<script>
export default {
    name: 'change-language',
    data() {
        return {
            active: false
        }
    },
    methods: {
        toggle() {
            this.active = !this.active
        },
        setLanguage(lang) {
            this.$i18n.locale = lang; // Изменение языка приложения
            this.active = false; // Опционально: закрыть меню после выбора языка
        }
    },
}
</script>

<style scoped>
.btn {
    padding: 4rem 4rem 4rem 4rem;
    background-color: blue;
    color: white;
}
.active{
    position: absolute;
    margin-top: 1rem;
    right: 0;
    background-color: white;
}
</style>
    