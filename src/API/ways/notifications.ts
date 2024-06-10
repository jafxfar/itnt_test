import { API } from '../main'

const prefix = '/notification'
enum Answer {
    Yes = "YES",
    No = "NO"
}
const markAsRead = (notificationId: number) => {
    return API.post(`${prefix}/markAsRead`, { notificationId })
}
const sendNotification = (notification: Object) => {
    return API.post(`${prefix}/sendNotification`, notification)
}
const sendProposition = (proposition: Object) => {
    return API.post(`${prefix}/sendProposition`,proposition )
}
const reactToProposition = (propositionAnswer: Answer, propositionId: number) => {
    if (propositionAnswer !== Answer.Yes && propositionAnswer !== Answer.No) {
        throw new Error("Invalid argument: propositionAnswer should be either 'Yes' or 'No'");
    }
    return API.post(`${prefix}/reactToProposition?propositionAnswer=${propositionAnswer}&propositionId=${propositionId}`,
        {params:{
            propositionAnswer,
            propositionId
        }}
    );
}
const getUserNotifications = (userId: number) => {
    return API.get(`${prefix}/userNotifications`, {
        params: {
            userId
        }
    })
}
const getProjectPropositions = (projectId: number) => {
    return API.get(`${prefix}/projectPropositions`, {
        params: {
            projectId
        }
    })
}
const getUserProjectPropositions = (projectId: any, userId: any) => {
    return API.get(`${prefix}/userProjectPropositions`, {
        params: {
            projectId,
            userId
        }
    })
}
const getUserPropositions = (userId: any) => {
    return API.get(`${prefix}/userPropositions`, {
        params: {
            userId
        }
    })
}
export {
    sendNotification, sendProposition, reactToProposition,
    getProjectPropositions, getUserNotifications, getUserProjectPropositions,
    getUserPropositions, markAsRead
}