import axios from "axios";
import store from "./store";

const axiosTask = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/tasks'
});

axiosTask.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
});

export default axiosTask;