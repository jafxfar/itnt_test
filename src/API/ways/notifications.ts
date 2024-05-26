import { API } from '../main'

const prefix = '/notification'
enum Answer {
    Yes = "YES",
    No = "NO"
}
// enum propDirect{
//     PROJECT_TO_USER = "Project_to_iser",
//     User_to_Project = 'User_to_Project'
// }

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
const sendProposition = (projectId: any, userId: any, message: string, propositionDirection: string) => {
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
const getUserNotifications = (pageNumber: number, pageSize: number, userId: number) => {
    return API.get(`${prefix}/userNotifications`, {
        params: {
            pageNumber,
            pageSize,
            userId
        }
    })
}
const getProjectPropositions = (pageNumber: number, pageSize: number, projectId: number) => {
    return API.get(`${prefix}/projectPropositions`, {
        params: {
            pageNumber,
            pageSize,
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
const getUserPropositions = (pageNumber: number, pageSize: number, userID: any) => {
    return API.get(`${prefix}/userPropositions`, {
        params: {
            pageNumber,
            pageSize,
            userID
        }
    })
}
export {
    sendNotification, sendProposition, reactToProposition,
    getProjectPropositions, getUserNotifications, getUserProjectPropositions,
    getUserPropositions
}