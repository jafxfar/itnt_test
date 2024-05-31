<template>
    <Header showUserMinify :routeName="'Чаты'" />
    <GeneralChat />
    <Footer />
</template>

<script setup lang="ts">
import GeneralChat from '~/components/Chat/GeneralChat.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

</script>
