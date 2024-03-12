import axios from 'axios'

const api = axios.create({
    baseURL: 'https://chatapp-hehe.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default api