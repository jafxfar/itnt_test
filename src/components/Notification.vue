<template>
    <div class="shadow-default bg-white rounded-[12px] m-[20px] py-[14px] px-[13px]" @click="closeModals">
        <div class="flex flex-row items-start pb-[8px]">
            <div class="flex flex-row">
                <p class="text-2xl ">1</p> <img class="mb-4" :src="statusIcon" alt="">
            </div>
            <div class="px-[0px] text-white">photo</div>
            <h1 class="flex flex-col font-medium text-md">{{ title }}<p class="text-optional font-normal text-sm">
                    {{ description }} </p>
            </h1>
            <button @click="openMainModal" class=" flex flex-1 justify-end">
                <img src="../assets/iconRight.svg" alt="">
            </button>

            <!-- Modal -->
            <MainModal v-if="MainModalVisible" @openModal2="openModal2" @close="closeMainModal" />
            <Modal2 v-if="modal2Visible" @close="closeModal2" />
            <!--  -->
        </div>

        <!-- контент -->
        <div class="flex flex-row gap-[7px]">
            <span><img src="../assets/seen.svg">* {{ clicks }}</span>
            <span><img src="../assets/search.svg">{{ investorStatus }}</span>
            <span class="text-sm">St: Поиск инвестора</span>
        </div>

        <div class="flex flex-row">
            <div class="photo px-12 border-[0.5px] rounded-[16px] m-[6px]"></div>
            <div class="flex flex-col mt-[12px]">
                <h1>{{ about }}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti vitae, repellendus ab laboriosam
                    magnam alias, impedit numquam obcaecati iusto sit fugit officiis facilis rerum molestias. Lorem ipsum

                </h1>
                <button @click="toggleProjectModal" class="text-marine flex items-center justify-end">
                    <RouterLink class="flex text-sm" to="/projectPage">
                        Подробнее о проекте
                        <ProjectModal v-if="showProjectModal" title="Project Modal" class="fixed inset-0 z-20" />
                        <img src="../assets/arrow_marine.svg">
                    </RouterLink>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import ProjectModal from "@/components/Modal/ProjectModal.vue"
import MainModal from '@/components/Modal/MainModal.vue';
import Modal2 from '@/components/Modal/Modal2.vue';

export default {
    name: 'the-notification',
    props: {
        id: Number,
        title: String,
        description: String,
        investorStatus: String,
        statusIcon: String,
        about: String,
        initialClicks: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            MainModalVisible: false,
            modal2Visible: false,
            showProjectModal: false,
            clicks: this.initialClicks

        };
    },
    methods: {
        toggleProjectModal() {
            this.showProjectModal = !this.showProjectModal;

            // Increment clicks only if showProjectModal is true
            if (this.showProjectModal) {
                this.clicks++;
            }
        },
        closeProjectModal() {
            this.showProjectModal = !this.showProjectModal;
        },
        openMainModal() {
            this.MainModalVisible = true;
        },
        closeMainModal() {
            this.MainModalVisible = false;
        },
        openModal2() {
            this.modal2Visible = true;
            this.MainModalVisible = false;
        },
        closeModal2() {
            this.modal2Visible = false;
        },

    },
    components: { Modal2, MainModal, ProjectModal },
    computed: {
        // Вычисляемое свойство для сортировки постов по кликам
        sortedPosts() {
            return this.posts.slice().sort((a, b) => b.clicks - a.clicks);
        }
    },

};
</script>


<style scoped>
span {
    display: flex;
    border-radius: 16px;
    border: 1px solid var(--Background-OnBackground, #263238);
    padding: 0px 10px 0px 10px;
}

h1 {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.13px;
}
</style>