import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', 
{
    state: () => ({
        userObj:{
            id: 0,
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
        }
    }),
    actions: {
        updateUser(user: User) {
            this.userObj.firstName = user.firstName;
            this.userObj.lastName = user.lastName;
            this.userObj.country = user.country;
            this.userObj.city = user.city;
            this.userObj.description = user.description;
            this.userObj.status = user.status;
            this.userObj.bgPicUrl = user.bgPicUrl;
            this.userObj.pictureUrl = user.backgroundPictureUrl;
             // обновление статуса
            return {
                operationResult: 'OK', // или 'ERROR', в зависимости от результата обновления
            }
        },
        setUserToken(token: string) {
            this.userObj.userToken = token;
        },
        // updateChosenSkills(skills: string[]) {
        //     this.chosenSkills = skills;
        // },
    },
});
