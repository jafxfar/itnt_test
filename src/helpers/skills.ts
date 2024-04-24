import { skillList } from './types'

const manageSkills: skillList[] = [
    {
        title: 'Руководство',
    },
    {
        name: 'Business Analytic',
    },
    {
        name: 'Product Owner',
    },
    {
        name: 'Systems Analytic',
    },
    {
        name: 'Software Architect',
    },
]
const designSkills: skillList[] = [
    {
        title: 'Дизайн',
    },
    {
        name: 'Business Analytic',
    },
    {
        name: 'Team Lead',
    },
    {
        name: 'User Experience Designer (UX)',
    },
]

const tags: skillList[] = [
    {
        title: 'Тэги',
    },
    {
        name: 'Инвестиции',
    },
    {
        name: 'Стартапы',
    },
    {
        name: 'Нетворкинг',
    },
]

export const skills = {
    manageSkills,
    designSkills,
    tags,
}