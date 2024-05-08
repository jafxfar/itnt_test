<script lang="ts">
export default {
    name: 'Fire',
}
</script>

<template>
    <button @click="handleLike" class="fire">
        <transition name="fade">
            <img v-if="status === 'default'" src="../assets/icons/fire/flame.svg" alt="Default" />
        </transition>
        <transition name="fade">
            <!-- <img v-if="status === 'loading'" src="../assets/icons/chat-black.svg" alt="Loading" /> -->
            <v-progress-circular v-if="status === 'loading'" width="2" class="loading mx-auto text-center" color="white"
                indeterminate></v-progress-circular>
        </transition>
        <transition name="fade">
            <img width="38" v-if="status === 'success'" src="/src/assets/LoadingIcon.svg" alt="Success" />
        </transition>
    </button>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { addLike, delLike } from '~/API/ways/project'
import { ref } from 'vue'
const props = defineProps({
    id: {
        type: Number,
    },
})

const status = ref("default") // Используйте ref для создания реактивного состояния
const isLiked = ref(false) // Добавляем новое состояние

async function handleLike() {
    console.log('clicked')
    status.value = 'loading'

    try {
        let response
        if (isLiked.value) {
            response = await delLike(props.id)
        } else {
            response = await addLike(props.id)
        }
        console.log(response)
        setTimeout(() => {
            if (isLiked.value) {
                status.value = 'default' // Если лайк был добавлен, устанавливаем статус в 'default'
            } else {
                status.value = 'success' // Если лайк не был добавлен, устанавливаем статус в 'success'
            }
            isLiked.value = !isLiked.value // Переключаем состояние лайка
        }, 500);
    } catch (error) {
        console.error(error)
        status.value = 'error'
    }

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
