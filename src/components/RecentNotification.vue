<template>
    <div class="">
        <Notification v-for="notification in notificationProps" :key="notification.id" :title="notification.title"
            :description="notification.description" :about="notification.about" :seenCount="notification.seenCount"
            :investorStatus="notification.investorStatus" :statusIcon="notification.statusIcon"
            @increment-seen="incrementSeenCount(notification)" />
        />
    </div>
</template>

<script>
import down from "@/assets/status/down.svg";
import new1 from "@/assets/status/new.svg"
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
                about: 'Наше приложение возьмёт на себя заботу о ваших близких. Подписка включает страхование жизней, отслеживание перемещения, оповещение об аварии, быструю связь с травматологией и другие полезные инструменты.',
                seenCount: 4,
                investorStatus: "* 1",
                statusIcon: new1
            },
            {
                id: 2,
                title: "Название",
                description: "Описание",
                about: 'Наше приложение возьмёт на себя заботу о ваших близких. Подписка включает страхование жизней, отслеживание перемещения, оповещение об аварии, быструю связь с травматологией и другие полезные инструменты.',
                seenCount: 2,
                investorStatus: "* 1",
                statusIcon: new1
            },
            {
                id: 3,
                title: "Название",
                description: "Описание",
                about: 'Наше приложение возьмёт на себя заботу о ваших близких. Подписка включает страхование жизней, отслеживание перемещения, оповещение об аварии, быструю связь с травматологией и другие полезные инструменты.',
                seenCount: 1,
                investorStatus: "* 1",
                statusIcon: down
            },
            ]
        }
    },
}
</script>