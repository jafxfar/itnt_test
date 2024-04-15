<script lang="ts">
export default {
    name: 'Fire',
}
</script>

<template>
    <div @mouseleave="funDelLike" @click="funAddLike" class="fire">
        <img src="../assets/icons/fire/flame.svg" alt="" />
    </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { addLike, delLike } from '~/API/ways/project'

const props = defineProps({
    id: {
        type: Number,
    },
})

async function funAddLike() {
    await addLike(props.id).then((repsonse) => {
        console.log(repsonse)
    })

    await nextTick()
}

async function funDelLike() {
    await delLike(props.id).then((repsonse) => {
        console.log(repsonse)
    })

    await nextTick()
}
</script>

<style lang="scss" scoped>
.fire {
    border-radius: 2px 12px 12px 12px;
    display: flex;
    justify-content: center;
    padding: 9px 0;
    // height: 52px;
    // width: 62px;
    width: 51px;

    align-items: center;
    background: linear-gradient(173deg, #ffaf13 0%, #ff7313 100%);
    box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.2) inset, 0px 9px 9px -9px #ff7c13;
}
</style>
