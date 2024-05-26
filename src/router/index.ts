import { createRouter, createWebHistory } from 'vue-router'


// user
import User from '~/pages/profile/User.vue'
import UserEdit from '~/pages/profile/UserEdit.vue'
import UserRead from '~/pages/profile/UserRead.vue'
// project
import ProjectInfo from '~/pages/project/ProjectInfo.vue'
import ProjectEdit from '~/pages/project/ProjectEdit.vue'
import ProjectNew from '~/pages/project/ProjectNew.vue'
import ProjectComment from '~/components/projects/ProjectComment.vue'
import BlogPage from '~/components/projects/BlogPage.vue'

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
// messanger
import Messenger from '~/pages/Messenger.vue'
import Chat from '~/components/ChatPage/Chat.vue'

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
        path: '/project/:ID/comment',
        component: ProjectComment,
    },
    {
        path: '/project/:ID/blogComment',
        component: BlogPage,
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
    // Мессенджер
    {
        path: '/messenger',
        component: Messenger,
    },
    {
        path: '/messenger/chat/:ID',
        component: Chat,
    },
    // Ошибки
    { path: '/:pathMatch(.*)*', component: error },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
