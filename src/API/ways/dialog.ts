import { API } from '../main'

const sendMessage = (dialogId: number, dialog: Object) => {
    return API.post(`${prefix}/${dialogId}/message`, dialog);
};
const prefix = '/dialog'

const getDialog = () => {
    return API.get(`${prefix}/`)
}
const getDialogMessages = (dialogId: number) => {
    return API.get(`${prefix}/${dialogId}/message/list`)
}
const getDialogByID = (id: number) => {
    return API.get(`${prefix}/${id}`)
}

export { getDialog, getDialogMessages, getDialogByID, sendMessage }
