import axios from "axios";
import store from "./store";

const axiosTask = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/tasks'
});

axiosTask.interceptors.request.use((config) => {
    const token = store.state.user.token; // Get the token from the store
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosTask;