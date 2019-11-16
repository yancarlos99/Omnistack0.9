import axios from 'axios'

const api = axios.create({ 
    baseURL: 'http://192.168.25.229:19000',

});

export default api;