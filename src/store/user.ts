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
        pictureUrl: null,
        bgPicUrl: null, 
        status: '', // добавьте это
    }),
    actions: {
        updateUser(user: User) {
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.country = user.country;
            this.city = user.city;
            this.description = user.description;
            this.status = user.status; // обновление статуса
            return{
                operationResult: 'OK', // или 'ERROR', в зависимости от результата обновления
            }
          },
        setUserToken(token: string) {
            this.userToken = token;
        },
        // Add setUserAvatar method
        setUserAvatar(avatarUrl: string | null) {
            this.pictureUrl = avatarUrl;
        },
        setUserBgPic(bgPicUrl: string | null) {
            this.bgPicUrl = bgPicUrl;
        },
    },
});
