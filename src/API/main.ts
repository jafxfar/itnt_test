import axios from 'axios'

export const API = axios.create({
    baseURL: 'http://62.217.181.172:8080/api',
    responseType: 'json',
    headers: {
        'X-Custom-Header': 'foobar',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
})
