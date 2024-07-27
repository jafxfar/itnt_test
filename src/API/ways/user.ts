import { API } from '../main'
// import ComplaintData from "~/helpers/types"
const prefix = '/user'

export const addPost = (description: String, descriptionHeader: String, authorProject: any, authorUser: any) => {
    let requestBody = {
        "authorProject": {
            "id": authorProject
        },
        "authorUser": {
            "id": authorUser
        },
        description,
        descriptionHeader,
    };
    return API.post('/main/addPost', requestBody);
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

const postAddUserPicture = (file: FormData, mainPicture: boolean) => {
    return API.post(`${prefix}/addUserPicture?mainPicture=${mainPicture}`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
const postAddBackgroundPicture = (file: FormData) => {
    return API.post(`${prefix}/addBackgroundPicture`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const postAddComplaint = (id: number, userId: number, complaint: String) => {

    return API.post(`${prefix}/${id}/addComplaint`, {
        "complaintInfo": complaint,
        "targetUser": {
            "id": id
        },
        "user": {
            "id": userId
        }
    });
};

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
const patchUser = (data: Object) => {
    return API.patch(`${prefix}/`, data)
}

export {
    getUserByID,
    postAddUserPicture, postAddBackgroundPicture,
    postUserConfirm, postUserLoginCode, putUser,
    patchUser, postAddComplaint, deleteUserPicture, getUserSearch
}
