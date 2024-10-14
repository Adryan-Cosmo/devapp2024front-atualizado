import axios from 'axios';

const api = axios.create({
    baseURL: "http://10.158.35.228:3000"
})

export default api;