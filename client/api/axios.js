import axios from 'axios'
import { URL_BACKEND } from '../config/host.js'

const api = axios.create({
    baseURL: URL_BACKEND,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default api