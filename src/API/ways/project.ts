// import { id } from 'vuetify/locale
import { log } from 'console'
import { API } from '../main.ts'
import ComplaintData from "~/helpers/types"

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

const postProject = (prjInfo: Object) => {
    return API.post(`${prefix}/`, prjInfo)
}

const patchProject = (prjInfo: Object) => {
    return API.patch(`${prefix}/`, prjInfo)
}

const addLike = (projectID: number) => {
    return API.post(`${prefix}/${projectID}/addLike`, projectID)
}
const addComment = (projectID: number, commentText: string) => {
    return API.post(`${prefix}/addComment`, {
        projectId: projectID,
        comment: commentText
    });
};
const addComplaint = (complaintData: ComplaintData[]) => {
    return API.post(`${prefix}/addComplaint`, complaintData);
}
const addFollow = (projectId: number, userId: number) => {
    return API.post(`${prefix}/addFollow`, {
        project: {
            id: projectId
        },
        user: {
            id: userId
        }
    });
}
const addProjectAvatar = (picLink: FormData , projectID: number ) => {
    return API.post(`${prefix}/addProjectAvatar`, picLink , projectID)
}

const addProjectFile = (picLink: string, projectID: number) => {
    return API.post(`${prefix}/addProjectFile?projectId=${projectID}`, { link: picLink });
};

const delLike = (projectID: number) => {
    return API.delete(`${prefix}/${projectID}/delLike`)
}

// const deleteComment = (projectID: number) => {
//     return API.delete(`${prefix}/addFollow`)
// }

export { getProjectsByValue, getProjectByID, getAllProjects, addLike, delLike, postProject, patchProject, 
        addFollow ,addProjectAvatar, addProjectFile , addComment , 
        // deleteComment
       }
