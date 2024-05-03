import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        description:'',
        userToken: '',
        isAuth: false,
        topModalState: false,
        userModalState:false,
        searchBarValue: '',
        searchBarResponse: {},
        pictureUrl: null, // Add pictureUrl state
    }),
    actions: {
        updateUser(user) {
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.country = user.country;
            this.city = user.city;
            this.description = user.description;
          },
        setUserToken(token: string) {
            this.userToken = token;
        },
        // Add setUserAvatar method
        setUserAvatar(avatarUrl: string | null) {
            this.pictureUrl = avatarUrl;
        },
    },
});
