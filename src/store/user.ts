import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userToken: '',
        isAuth: false,
        topModalState: false,
        userModalState:false,
        searchBarValue: '',
        searchBarResponse: {},
    }),
    actions: {
        setUserToken(token: string) {
            this.userToken = token
        },
    },
})
