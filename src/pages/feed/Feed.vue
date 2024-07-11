<template>
    <Header :routeName="'Центр событий'" showUserMinify />
    <v-col class="pa-0 text-center">
        <v-container class="pa-6">
            <div class="date rounded-xl d-inline-block">{{ $t('feed.today') }}</div>

            <!-- <div class="feed__column">
                <FeedPanels />
                <FeedCard feedCardType="newProjectStage" />
            </div> -->
        </v-container>

        <!-- <v-container class="pa-6 pt-0"> -->
            <!-- Дата -->
            <!-- <div class="date mb-4 rounded-xl d-inline-block">{{ $t('feed.yesterday') }}</div> -->

            <!-- <div class="feed__column"> -->
                <!-- Карточка с документом на 7.5мб -->
                <!-- <FeedCard feedCardType="newFile" />
                <FeedCard feedCardType="newProjectVacancies" /> -->
            <!-- </div> -->
        <!-- </v-container> -->

        <v-container class="pa-6 pt-0">

            <div class="feed__column">
                <!-- Карточка с двумя слайдами в одном carousel-item -->

                <div v-for="(post, id) in posts" :key="id" class="mt-6">
                    <div class="" v-for="(object, id) in post.object" :key="id">
                        <FeedPost :post="object" :id="object.id" />
                    </div>
                </div>  
            </div>
        </v-container>
    </v-col>
    <Footer />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getPost } from '~/API/ways/user';
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';
import FeedPost from '~/components/feed/FeedPost.vue';
import FeedPanels from '~/components/feed/FeedPanels.vue';
let posts = ref();
const getPosts = async () => {
    try {
        const data = await getPost();
        posts.value = data;
    } catch (error) {
        console.error(error);
    }
};
console.log(posts, 'postes');
onMounted(getPosts);
</script>

<style lang="scss" scoped>
.feed {
    &__column {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}

.date {
    background: rgba(224, 224, 224, 0.5);
    font-size: 13px !important;
    letter-spacing: 0.01em !important;
    padding: 6px 20px;
    line-height: 14px;
}
</style>
