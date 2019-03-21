import Axios from 'axios';

export const BASE_URL = 'http://141.136.47.181:1903' // Development
// export const BASE_URL = 'http://141.136.47.181:1903' // Production

export const http = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credential': true
    }
})