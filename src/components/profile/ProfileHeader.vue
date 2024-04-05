<template>
    <div class="userPics">
        <div class="userPics__bg"></div>
        <div class="userPics__ava">
            <img :src="`http://62.217.181.172:8080/var/itnt-files/${props.avaPic}`" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    avaPic: {
        type: String,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped>
.userPics {
    position: relative;
    margin-bottom: 32px;
    &__bg {
        width: 100%;
        background: green;
        height: 117px;
    }
    &__ava {
        position: absolute;
        position: absolute;
        left: 0;
        right: 0;
        top: 33px;
        margin-left: auto;
        margin-right: auto;
        width: 104px;
        img {
            border: 1.5px solid #e0e0e0;
            border-radius: 100%;
        }
    }
}
</style>
