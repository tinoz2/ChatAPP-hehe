import axios from 'axios'
import { URL } from '../config/host.js'

const api = axios.create({
    baseURL: URL,
    withCredentials: true,
})

export default api