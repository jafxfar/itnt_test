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
            pictureUrl: "",
            bgPicUrl: "",
            status: '', 
            chosenSkills: [],
            
        }
    }),
    actions: {
        setUserToken(token: string) {
            this.userObj.userToken = token;
        },
        // updateChosenSkills(skills: string[]) {
        //     this.chosenSkills = skills;
        // },
    },
});
