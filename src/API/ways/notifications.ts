import { API } from '../main'

const prefix = '/notification'
enum Answer {
    Yes = "YES",
    No = "NO"
}
type PropositionDirection = "PROJECT_TO_USER" | "USER_TO_PROJECT";


const sendNotification = (fromUserId: any, message: string, toUser: any) => {
    return API.post(`${prefix}/sendNotification`, {
        "fromUser": {
            id: fromUserId
        },
        message: message,
        'toUser': {
            id: toUser
        }
    })
}
const sendProposition = (projectId: any, userId: any, message: string, propositionDirection: PropositionDirection) => {
    return API.post(`${prefix}/sendProposition`, {
        'user': {
            id: userId
        },
        project: {
            id: projectId
        },
        message: message,
        propositionDirection: propositionDirection
    })
}
const reactToProposition = (propositionAnswer: Answer, propositionId: number) => {
    if (propositionAnswer !== Answer.Yes && propositionAnswer !== Answer.No) {
        throw new Error("Invalid argument: propositionAnswer should be either 'Yes' or 'No'");
    }
    return API.post(`${prefix}/reactToProposition?propositionAnswer=${propositionAnswer}&propositionId=${propositionId}`);
}
const getUserNotifications = ( userId: number) => {
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
const getUserPropositions = (userID: any) => {
    return API.get(`${prefix}/userPropositions`, {
        params: {
            userID
        }
    })
}
export {
    sendNotification, sendProposition, reactToProposition,
    getProjectPropositions, getUserNotifications, getUserProjectPropositions,
    getUserPropositions
}