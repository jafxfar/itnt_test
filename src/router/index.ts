import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Project from '~/pages/Project.vue'
// user
import User from '~/pages/profile/User.vue'
import UserEdit from '~/pages/profile/UserEdit.vue'
import UserRead from '~/pages/profile/UserRead.vue'
// project
import ProjectInfo from '~/pages/project/ProjectInfo.vue'
import ProjectEdit from '~/pages/project/ProjectEdit.vue'
import ProjectNew from '~/pages/project/ProjectNew.vue'
// enter
import Entry from '~/pages/registration/Entry.vue'
import Agreement from '~/pages/registration/Agreement.vue'
import FirstMeet from '~/pages/registration/FirstMeet.vue'
import PhoneRegPage from '~/pages/registration/PhoneReg.vue'
import Screening from '~/pages/registration/Screening.vue'
// etc
import Feed from '~/pages/feed/Feed.vue'
import Projects from '~/pages/Projects.vue'
import Search from '~/pages/Search.vue'
// errors
import error from '~/pages/error.vue'


import Blog from '~/components/ProjectPage/BlogPage.vue'

interface routes {
    path: string
    component: any
}

const routes: Array<routes> = [
    // Регистрация
    {
        path: '/',
        component: FirstMeet,
    },
    {
        path: '/agreement',
        component: Agreement,
    },
    {
        path: '/entry',
        component: Entry,
    },
    {
        path: '/reg',
        component: PhoneRegPage,
    },
    {
        path: '/screening',
        component: Screening,
    },
    //   Юзер
    {
        path: '/user/:ID',
        component: UserRead,
    },
    {
        path: '/me',
        component: User,
    },
    {
        path: '/me/edit',
        component: UserEdit,
    },
    // Проекты
    {
        path: '/project/:ID',
        component: ProjectInfo,
    },
    {
        path: '/project/new',
        component: ProjectNew,
    },
    {
        path: '/project/:ID/edit',
        component: ProjectEdit,
    },
    // Топ проектов
    {
        path: '/projects',
        component: Projects,
    },
    // Лента
    {
        path: '/feed',
        component: Feed,
    },
    // Поиск
    {
        path: '/search',
        component: Search,
    },
    // Ошибки
    { path: '/:pathMatch(.*)*', component: error },

    {
        path:'/projectPage',
        component: Project
    },

    {
        path:'/blog',
        component: Blog
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
