import axios from './axios.js'

const registerRequest = (data) => {
    return axios.post('/auth/register', data)
}

const loginRequest = (data) => {
    return axios.post('/auth/login', data)
}

const logoutRequest = () => {
    return axios.post('/auth/logout')
}

const verifyRequest = () => {
    return axios.post('/auth/verify')
}

const profileRequest = () => {
    return axios.get('/users/profile')
}

const updateProfile = (id, data) => {
    return axios.put(`/users/update/${id}`, data)
}

const updatePhoto = (data) => {
    return axios.post(`/users/upload`, data)
}

const getMessages = (id) => {
    return axios.get(`/messages/${id}`)
}

const sendMessagesRequest = (id, data) => {
    return axios.post(`/messages/send/${id}`, data)
}

const getFriends = () => {
    return axios.get("/api/users")
}

export {
    registerRequest,
    loginRequest,
    logoutRequest,
    verifyRequest,
    profileRequest,
    updateProfile,
    updatePhoto,
    getMessages,
    sendMessagesRequest,
    getFriends
}