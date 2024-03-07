import { API } from '../main'

const prefix = '/dictionary'

const getCountryList = () => {
    return API.get(`${prefix}/countryList`)
}

// export const getCityList = (cuntryID : String, pageNum : String ) => {
//     return API.get(`${prefix}/cityList`)
// }

export { getCountryList }
