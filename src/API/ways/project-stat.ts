import { API } from '../main'

const prefix = '/project/stat'


export const projectStatByID = (endDate: string, id: number, startDate: string) => {
    const queryString = new URLSearchParams({ endDate, startDate });
    return API.get(`${prefix}/${id}?${queryString.toString()}`);
}
