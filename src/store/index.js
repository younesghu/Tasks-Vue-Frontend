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
        addTask({ commit, state }, task) {
            return axiosTask.post('/', task, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            .then(({ data }) => {
                commit('addTask', data.task);
                return data;
            });
        },
        updateTaskStatus({ commit }, { id, status }) {
            return axiosTask.put(`/${id}`, { status })
                .then(({ data }) => {
                    commit('updateTask', data.task);
                }).catch(error => {
                    console.error("There was an error updating the task status:", error);
                });
        },
        deleteTask({ commit }, taskId) {
            return axiosTask.delete(`/${taskId}`)
              .then(() => {
                commit('removeTask', taskId);
              })
              .catch(error => {
                console.error("There was an error deleting the task:", error);
              });
          },
    },
    mutations: {
        setTasks: (state, tasks) => {
            state.tasks.data = tasks.data ? tasks.data : tasks;
        },
        addTask: (state, task) => {
            state.tasks.data.push(task);
        },
        updateTask: (state, updatedTask) => {
            const index = state.tasks.data.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                state.tasks.data[index] = updatedTask;
            }
        },
        removeTask: (state, taskId) => {
            state.tasks.data = state.tasks.data.filter(task => task.id !== taskId);
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