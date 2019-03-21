import Axios from 'axios';

export const BASE_URL = 'http://103.86.162.252:1337' // Development
// export const BASE_URL = 'http://103.86.162.252:1337' // Production

export const http = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credential': true
    }
})