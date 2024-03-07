import axios from 'axios'

export const API = axios.create({
    baseURL: 'https://moltore.ru:8080/api',
    responseType: 'json',
    headers: {
        'X-Custom-Header': 'foobar',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
})
