import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
    state: () => ({
        prjObject: {
            activityFields: 'VALUE_1',
            avatarUrl: '',
            companyPreferences: 'NONE',
            competitionInfo: 'string',
            description: '',
            descriptionHeader: '',
            growthRateInfo: null,
            id: 0,
            marketInfo: 'string',
            monetizationInfo: 'string',
            name: '',
            needInvestment: false,
            needProfessionals: false,
            nickName: '',
            otherAchievementsInfo: 'string',
            projectDevelopmentInfo: 'string',
            projectRegistrationPlaces: 'AMERICA',
            projectStage: 'CUST_DEV',
            slogan: '',
        },
    }),
})
