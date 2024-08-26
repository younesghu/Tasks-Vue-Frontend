import { createStore } from "vuex";
import axiosClient from "@/axios";
import axiosTask from "@/axiosTask";
const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        tasks: {
            data: [],
        },
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
            })
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
            .then(({ data }) => {
                commit('setUser', data);
                return data;
            });
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
            .then((response) => {
                commit('logout');   
                return response;
            });
        },
        getTasks({ commit }) {
            return axiosTask.get('/')
                .then(({ data }) => {
                    commit("setTasks", data);
                    return data;
                });
        },
    },
    mutations: {
        setTasks: (state, tasks) => {
            state.tasks.data = tasks.data ? tasks.data : tasks;
        },
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token);
        }
    },
    modules: {}
});

export default store;