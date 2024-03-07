<template>
    <div class="bg-white h-full w-full items-end">
        <div>
            <a-carousel autoplay class="slider">
                <div style="height: 800px;">
                    <h3>1</h3>
                </div>
                <div style="height: 540px;">
                    <h3>2</h3>
                </div>
                <div style="height: 540px;">
                    <h3>3</h3>
                </div>
                <div style="height: 540px;">
                    <h3>4</h3>
                </div>
            </a-carousel>
            <div class="absolute top-0 right-0 m-2">
                <button @click="closeProjectModal">
                    <img src="@/assets/closeProject.svg" alt="">
                </button>
            </div>
        </div>

        <div class="flex justify-center items-end">

            <router-link to="/project" class="w-full">
                <button class="btn w-full rounded-b-[12px] py-[15px] bg-marine text-white">Открыть
                    проект</button>
            </router-link>

        </div>
    </div>
</template>


<script>
export default {
    name: 'project-modal',
    methods: {
        closeProjectModal() {
            this.showProjectModal = !this.showProjectModal;
        },
        goBack() {
            this.$router.go(1);
        }
    }
}
</script>

<style scoped>
:deep(.slick-slide) {
    text-align: center;
    line-height: 160px;
    background: skyblue;
    overflow: hidden;
}

:deep(.slick-slide h3) {
    color: #ab7070;
    ;
}

:deep(.slick-dots li button) {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-top: -30px;
}

.slider div {
    height: 92vh;
}
</style>