import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', 
{
    state: () => ({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        description: '',
        userToken: '',
        isAuth: false,
        topModalState: false,
        userModalState: false,
        searchBarValue: '',
        searchBarResponse: {},
        pictureUrl: "", // новое свойство состояния
        bgPicUrl: "",
        status: '', // добавьте это
        chosenSkills: [], // новое свойство состояния
    }),
    actions: {
        updateUser(user: User) {
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.country = user.country;
            this.city = user.city;
            this.description = user.description;
            this.status = user.status;
            this.bgPicUrl = user.bgPicUrl;
            this.pictureUrl = user.backgroundPictureUrl;
             // обновление статуса
            return {
                operationResult: 'OK', // или 'ERROR', в зависимости от результата обновления
            }
        },
        setUserToken(token: string) {
            this.userToken = token;
        },
        updateChosenSkills(skills: string[]) {
            this.chosenSkills = skills;
        },
    },
});
