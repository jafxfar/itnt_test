<template>
    <div class="">
        <Notification v-for="notification in sortedNotificationProps" :key="notification.id" :title="notification.title"
            :description="notification.description" :about="notification.about"
            :statusIcon="notification.statusIcon"
            :initialClicks="notification.clicks" />
    </div>
</template>

<script>

import up from "@/assets/status/up.svg"
import down from "@/assets/status/down.svg"
import Notification from './Notification.vue';
export default {
    components: {
        Notification
    },
    data() {
        return {
            notificationProps: [{
                id: 1,
                title: "Название",
                description: "Описание",
                about: 'Наше приложение возьмёт на себя заботу о ваших близких.  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro numquam doloremque laudantium modi laboriosam ipsam tenetur a exercitationem eaque pariatur! ',
                clicks: 4,
                investorStatus: "* 1",
                statusIcon: up,
            },
            {
                id: 2,
                title: "Название",
                description: "Описание",
                about: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro numquam doloremque laudantium modi laboriosam ipsam tenetur a exercitationem eaque pariatur!',
                clicks: 2,
                investorStatus: "* 1",
                statusIcon: down,
            },
            {
                id: 3,
                title: "Название",
                description: "Описание",
                about: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro numquam doloremque laudantium modi laboriosam ipsam tenetur a exercitationem eaque pariatur!',
                clicks: 2,
                investorStatus: "* 1",
                statusIcon: down,
            },
            ]
        }
    },
    computed: {
        sortedNotificationProps() {
            return this.notificationProps.slice().sort((a, b) => b.clicks - a.clicks);
        }
    },
    methods: {
        isActive(route) {
            return this.$route.path === route;
        },
        closeTips() {
            this.showTips = false;
        },
        updateClicks() {
            this.$emit('update-clicks', { title: this.title, clicks: this.clicks });
        }
    }
}
</script>