import { API } from '../main'

const prefix = '/notification'

const sendNotification = (notification: any) => {
    return API.post(`${prefix}/sendNotification`, notification)
}
const sendProposition= (notification: any) => {
    return API.post(`${prefix}/sendProposition`, notification)
}
const reactToProposition = (propositionAnswer: string, propositionId: number) => {
    return API.post(`${prefix}/reactToProposition?propositionAnswer=${propositionAnswer}&propositionId=${propositionId}`);
}

export {
    sendNotification, sendProposition, reactToProposition
}