import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        userToken: '',
        isAuth: false,
        topModalState: false,
        userModalState:false,
        searchBarValue: '',
        searchBarResponse: {},
        pictureUrl: null, // Add pictureUrl state
    }),
    actions: {
        setUserToken(token: string) {
            this.userToken = token;
        },
        // Add setUserAvatar method
        setUserAvatar(avatarUrl: string | null) {
            this.pictureUrl = avatarUrl;
        },
    },
});
