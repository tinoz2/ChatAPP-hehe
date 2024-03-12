import axios from './axios.js'

const headers = {
    'Access-Control-Allow-Origin': 'https://chatapp-hehe-production.up.railway.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

const registerRequest = (data) => {
    return axios.post('/auth/register', data, { headers });
}

const loginRequest = (data) => {
    return axios.post('/auth/login', data, { headers });
}

const logoutRequest = () => {
    return axios.post('/auth/logout', null, { headers });
}

const verifyRequest = () => {
    return axios.post('/auth/verify', null, { headers });
}

const profileRequest = () => {
    return axios.get('/users/profile', { headers });
}

const updateProfile = (id, data) => {
    return axios.put(`/users/update/${id}`, data, { headers });
}

const updatePhoto = (data) => {
    return axios.post(`/users/upload`, data, { headers });
}

const getMessages = (id) => {
    return axios.get(`/messages/${id}`, { headers });
}

const sendMessagesRequest = (id, data) => {
    return axios.post(`/messages/send/${id}`, data, { headers });
}

const getFriends = () => {
    return axios.get("/api/users", { headers });
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