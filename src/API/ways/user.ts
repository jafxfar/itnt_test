import { API } from '../main'
import ComplaintData from "~/helpers/types"
const prefix = '/user'

export const addPost = (description: string, descriptionHeader: string, id: number) => {
    return API.post('/main/addPost', {
        description,
        descriptionHeader,
        id
    });
}
export const getPost = () => {
    return API.get('/main/getPosts');
}
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
    return API.post(`${prefix}/addUserPicture?mainPicture=true`, picLink)
}

const postAddBackgroundPicture = (picLink: FormData) => {
    return API.post(`${prefix}/addBackgroundPicture`, picLink)
}

const postAddComplaint = (id:number , complaintInfo:String) => {
    return API.post(`${prefix}/${id}/addComplaint`, {
        id: id,
        complaintInfo: complaintInfo
    });
}

const deleteUserPicture = (id: Number) => {
    return API.delete(`${prefix}/delUserPicture?id=${id}`);
}



const getUserByID = (id: Number) => {
    if (id) {
        return API.get(`${prefix}/${id}`)
    } else {
        return API.get(`${prefix}/`)
    }
}

const getUserSearch = () => {
    return API.get(`${prefix}/search`);
}

// PUT
const putUser = (user: Object) => {
    return API.put(`${prefix}/`, { user })
}

// PATCH
const patchUser = (data: any) => {
    return API.patch(`${prefix}/`, { data })
}

export {
    getUserByID,
    postAddUserPicture, postAddBackgroundPicture,
    postUserConfirm, postUserLoginCode, putUser,
    patchUser, postAddComplaint, deleteUserPicture, getUserSearch
}
