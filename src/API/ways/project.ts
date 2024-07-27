// import { id } from 'vuetify/locale
import { API } from '../main.ts'
// import ComplaintData from "~/helpers/types"

const prefix = '/project'

const getProjectByID = (id: any) => {
    return API.get(`${prefix}/${id}`)
}

const getAllProjects = () => {
    return API.get(`${prefix}/search`)
}

const getProjectsByValue = (prjValue: any) => {
    return API.get(`${prefix}/search?searchString=${prjValue}`)
}
const getProjectComments = (projectID: number) => {
    return API.get(`${prefix}/projectComments?projectId=${projectID}`)

}


const postProject = (prjInfo: Object) => {
    return API.post(`${prefix}/`, prjInfo)
}

const patchProject = (prjInfo: Object) => {
    return API.patch(`${prefix}/`, prjInfo)
}

const addLike = (projectID: number) => {
    return API.post(`${prefix}/${projectID}/addLike`, projectID)
}
const addComment = (projectID: number, userID: number, message: string) => {
    // const now = new Date();
    // const insertDate = now.toISOString();
    return API.post(`${prefix}/addComment`, {
        // id: id,
        // insertDate: insertDate,
        project: {
            id: projectID
        },
        user: {
            id: userID
        },
        "message": message
    });
};
const addComplaint = (projectId: number, userId: number, complaint: String) => {


    return API.post(`${prefix}/addComplaint`, {
        "complaintInfo": complaint,
        "project": {
            "id": projectId
        },
        "user": {
            "id": userId
        }
    });
};
const addFollow = (projectId: number, userId: number) => {
    return API.post(`${prefix}/addFollow`, {
        project: {
            id: projectId
        },
        "user": {
            "id": userId
        }
    });
}
const addProjectAvatar = (avatarUrl: FormData, projectID: number) => {
    return API.post(`${prefix}/addProjectAvatar?projectId=${projectID}`, avatarUrl, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}


const addProjectFile = (file: FormData, projectID: number, link: String) => {
    return API.post(`${prefix}/addProjectFile?projectId=${projectID}`, link, file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const delLike = (projectID: number) => {
    return API.delete(`${prefix}/${projectID}/delLike`)
}

const deleteComment = (projectID: number) => {
    return API.delete(`${prefix}/deleteComment`)
}

export {
    getProjectsByValue, getProjectByID, getAllProjects, addLike, delLike, postProject, patchProject,
    addFollow, addProjectAvatar, addProjectFile, addComment, addComplaint, getProjectComments
    // deleteComment
}
