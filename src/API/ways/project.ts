import { API } from '../main.ts'

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

const delLike = (projectID: number) => {
    return API.delete(`${prefix}/${projectID}/delLike`, projectID)
}

const addFollow = (projectID: number) => {
    return API.post(`${prefix}/${projectID}/addFollow`, projectID)
}

export { getProjectsByValue, getProjectByID, getAllProjects, addLike, delLike, postProject, patchProject, addFollow }
