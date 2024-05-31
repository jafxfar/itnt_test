import { API } from '../main'

const prefix = '/dialog'

const getDialog = () => {
    return API.get(`${prefix}/`)
}
const getDialogMessages = (dialogId:number) => {
    return API.get(`${prefix}/${dialogId}/message/list`)
}
const getDialogByID = (id:number) => {
    return API.get(`${prefix}/${id}`)
}
const sendMessage = (dialogId:number) => {
    return API.post(`${prefix}/${dialogId}/message`)
}


export { getDialog , getDialogMessages , getDialogByID, sendMessage }
