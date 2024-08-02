import { createRouter, createWebHashHistory } from 'vue-router'


// user
import Search from '~/pages/Search.vue'
// errors
// import error from '~/pages/error.vue'


interface routes {
    path: string
    component: any
}

const routes: Array<routes> = [
    // Регистрация
    {
        path: '/',
        component: Search,
    },
    // Ошибки
    // { path: '/:pathMatch(.*)*', component: error },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

