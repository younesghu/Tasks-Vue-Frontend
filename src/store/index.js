import { createStore } from "vuex";
import axiosClient from "@/axios";

const store = createStore({
    state: {
        user: {
            data: {},
            access_token: localStorage.getItem("access_token"),
        },
        tasks: {
            data: [],
        },
    },
    getters: {},
    actions: {
        getUser({ commit }) {
            return axiosClient.get("/auth/user").then((response) => {
                commit("setUser", response.data);
            });
        },
        register({ commit }, user) {
            return axiosClient.post('/auth/register', user)
                .then(({ data }) => {
                    commit('setUser', data.user);
                    commit("setToken", data.access_token);
                    return data;
            })
        },
        login({ commit }, user) {
            return axiosClient.post('/auth/login', user)
            .then(({ data }) => {
                commit('setUser', data.user);
                commit("setToken", data.access_token);
                return data;
            });
        },
        logout({ commit }) {
            return axiosClient.post('/auth/logout')
            .then((response) => {
                commit('logout');   
                return response;
            });
        },
        getTasks({ commit }) {
            return axiosClient.get('/tasks')
                .then(({ data }) => {
                    commit("setTasks", data);
                    return data;
                });
        },
        addTask({ commit, state }, task) {
            return axiosClient.post("/tasks", task)
            .then(({ data }) => {
                commit('addTask', data.task);
                return data;
            });
        },
        updateTaskStatus({ commit, state }, taskId) {
            const task = state.tasks.data.find(task => task.id === taskId);
          
            if (task) {
              const newStatus = task.status === "incomplete" ? "complete" : "incomplete";
          
              return axiosClient.put(`/tasks/${taskId}`, { status: newStatus }, {
                headers: {
                  Authorization: `Bearer ${state.user.access_token}`
                }
              })
              .then(({ data }) => {
                commit('updateTask', data.data);
              })
              .catch(error => {
                console.error("There was an error updating the task status:", error);
              });
            } else {
              console.error("Task not found in state:", taskId);
            }
          },
        deleteTask({ commit }, taskId) {
            return axiosClient.delete(`/tasks/${taskId}`)
              .then(() => {
                commit('removeTask', taskId);
              })
              .catch(error => {
                console.error("There was an error deleting the task:", error);
              });
          },
    },
    mutations: {
        setUser: (state, user) => {
            state.user.data = user;
        },
        setToken: (state, access_token) => {
            state.user.access_token = access_token;
            localStorage.setItem("access_token", access_token);
        },
        logout: (state) => {
            state.user.access_token = null;
            state.user.data = {};
            localStorage.removeItem("access_token");
        },
        setTasks: (state, tasks) => {
            state.tasks.data = tasks.data;
        },
        addTask: (state, task) => {
            state.tasks.data.push(task);
        },
        updateTask: (state, updatedTask) => {
            const index = state.tasks.data.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
              state.tasks.data[index] = updatedTask;
            } else {
              console.error("Task not found in state:", updatedTask);
            }
        },
        removeTask: (state, id) => {
            state.tasks.data = state.tasks.data.filter((t) => t.id !== id);
        },
    },
    modules: {}
});

export default store;