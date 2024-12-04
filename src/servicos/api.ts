import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.114:3001',
    // baseURL: 'http://10.158.51.184:3001',
});

export default api;
