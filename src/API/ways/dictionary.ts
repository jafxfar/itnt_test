import { API } from '../main'

const prefix = '/dictionary'

const getCountryList = () => {
    return API.get(`${prefix}/countryList`)
}
const getCityList = () => {
    return API.get(`${prefix}/cityList`)
}
const getInterestList = () => {
    return API.get(`${prefix}/interesList`)
}
const getInterestListGrouped = () => {
    return API.get(`${prefix}/interestListGrouped`)
}

const postLoadCities = () => {
    return API.post(`${prefix}/loadCities`)
}
const postLoadCountries = () => {
    return API.post(`${prefix}/loadCountries`)
}


export { getCountryList , getCityList , getInterestList , getInterestListGrouped , postLoadCities , postLoadCountries }
