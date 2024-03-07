import { API } from '../main'

const prefix = '/user'

const postUserLoginCode = (phone: String) => {
    return API.post(`${prefix}/loginCode`, {
        login: phone,
    })
}

const postUserConfirm = (phone: String, token: String) => {
    return API.post(`${prefix}/loginCodeConfirmation`, {
        login: phone,
        confirmToken: token,
    })
}

const postAddUserPicture = (picLink: FormData) => {
    return API.post(`${prefix}/addUserPicture`, picLink)
}

const getUserByID = (id: string) => {
    if (id) {
        return API.get(`${prefix}/${id}`)
    } else {
        return API.get(`${prefix}/`)
    }
}

// PUT
const putUser = (user: Object) => {
    return API.put(`${prefix}/`, { user })
}

// PATCH
const patchUser = (data: any) => {
    return API.patch(`${prefix}/`, { ...data })
}

export { getUserByID, postAddUserPicture, postUserConfirm, postUserLoginCode, putUser, patchUser }
