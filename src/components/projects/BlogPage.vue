<template>
    <Header />

    <div class="bg-background p-4">

        <ProjectBlog />
        <div class="">
            <h1> Коментарии к записи:
            </h1>
        </div>
        <div class="flex flex-col mt-4 p-4 rounded-[12px] bg-white">
            <div class="flex flex-row pb-4">
                <span class="border-[3px] w-[40px] h-[40px] mr-3 border-chatThird rounded-full"></span>
                <div class="flex flex-col flex-1">
                    <div class="flex flex-row justify-between flex-1">
                        <h1>1ddsdsdsdsd</h1>
                    </div>

                    <h1 class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing,
                        ipsa?
                    </h1>
                </div>
            </div>
            <div class="">
                <p>Приветствую! Идея интересная, но как будете привлекать инвестиции? У нас сейчас без чёткого плана никуда!
                </p>
            </div>
            <div class="flex justify-between text-gray-400 text-sm mt-6">
                <div class="">
                    24.11.21 13:40
                </div>

                <div class="">
                    <button>
                        Ответить
                    </button>
                </div>
            </div>
        </div>
        <div class="decoration flex flex-col mt-4 ml-4 p-4 rounded-[12px] bg-white">
            <div class="flex flex-row pb-4">
                <span class="border-[3px] w-[40px] h-[40px] mr-3 border-chatThird rounded-full"></span>
                <div class="flex flex-col flex-1">
                    <div class="flex flex-row justify-between flex-1">
                        <h1>1ddsdsdsdsd</h1>
                    </div>

                    <h1 class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing,
                        ipsa?
                    </h1>
                </div>
            </div>
            <div class="">
                <p>Приветствую! Идея интересная, но как будете привлекать инвестиции? У нас сейчас без чёткого плана никуда!
                </p>
            </div>
            <div class="flex justify-between text-gray-400 text-sm mt-6">
                <div class="">
                    24.11.21 13:40
                </div>

                <div class="">
                    <button>
                        Ответить
                    </button>
                </div>
            </div>
        </div>

        <div class="decoration flex flex-col mt-4 ml-4 p-4 rounded-[12px] bg-white">
            <div class="flex flex-row pb-4">
                <span class="border-[3px] w-[40px] h-[40px] mr-3 border-chatThird rounded-full"></span>
                <div class="flex flex-col flex-1">
                    <div class="flex flex-row justify-between flex-1">
                        <h1>1ddsdsdsdsd</h1>
                    </div>

                    <h1 class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing,
                        ipsa?
                    </h1>
                </div>
            </div>
            <div class="">
                <p>Приветствую! Идея интересная, но как будете привлекать инвестиции? У нас сейчас без чёткого плана никуда!
                </p>
            </div>
            <div class="flex justify-between text-gray-400 text-sm mt-6">
                <div class="">
                    24.11.21 13:40
                </div>

                <div class="">
                    <button>
                        Ответить
                    </button>
                </div>
            </div>
        </div>


        <!-- <div
            class="flex flex-row items-center fixed bg-white bottom-0 w-[99%] justify-between border-[2px] border-marine rounded-[12px] px-2">
            <input class="pl-[16px] outline-none px-[1px] w-full" type="text" v-model="currentMessage" placeholder="Ваш коментарий..."
                @keypress.enter="sendMessage">
            <button @click="sendMessage" class="cursor pointer py-[9px] pr-[13px]"><img src="@/assets/chatIcon/chat.svg"
                    alt=""></button>
        </div> -->
    </div>
</template>

<script>
import Header from '../Header.vue';
import ProjectBlog from '@/components/ProjectPage/ProjectBlog.vue';
export default {
    data() {

    },
    components: {
        ProjectBlog, Header
    }
}
</script>

<style scoped>
.decoration {
    border-radius: 2px 12px 12px 12px;
}
</style>