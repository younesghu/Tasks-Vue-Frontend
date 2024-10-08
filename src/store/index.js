import { createStore } from "vuex";
import axiosClient from "@/axios";
import Register from "@/views/Register.vue";

const store = createStore({
    state: {
        addTask: false,
        loader: false,
        user: {
            data: {},
            access_token: localStorage.getItem("access_token"),
        },
        tasks: {
            data: [],
        },
    },
    getters: {
        isLoading: (state) => state.loader,
    },
    actions: {
        showLoader({commit}) {
            commit('setLoader', true)
        },
        hideLoader({commit}) {
            commit('setLoader', false)
        },
        getUser({ commit }) {
            return axiosClient.get("/auth/user").then((response) => {
                commit("setUser", response.data);
            });
        },
        register({ commit, dispatch }, user) {
            dispatch('showLoader')
            return axiosClient.post('/auth/register', user)
                .then(({ data }) => {
                    commit('setUser', data.user);
                    commit("setToken", data.access_token);
                    dispatch('showLoader')
                    return data;
            })
        },
        login({ commit, dispatch }, user) {
            dispatch('showLoader');
            return axiosClient.post('/auth/login', user)
            .then(({ data }) => {
                commit('setUser', data.user);
                commit("setToken", data.access_token);
                dispatch('hideLoader');
                return data;
            });
        },
        logout({ commit, dispatch }) {
            dispatch('showLoader');
            return axiosClient.post('/auth/logout')
            .then((response) => {
                commit('logout');
                dispatch('hideLoader');   
                return response;
            });
        },
        getTasks({ commit, dispatch }) {
            dispatch('showLoader');
            return axiosClient.get('/tasks')
                .then(({ data }) => {
                    commit("setTasks", data);
                    dispatch('hideLoader');   
                    return data;
            });
        },
        openAddTaskModal({ commit }) {
            commit('OPEN_ADD_TASK_MODAL');
        },
        closeModalAddTask({ commit }) {
            commit('CLOSE_ADD_TASK_MODAL');
        },
        addTask({ commit, dispatch }, task) {
            dispatch('showLoader');
            return axiosClient.post("/tasks", task)
            .then(({ data }) => {
                commit('CLOSE_ADD_TASK_MODAL');
                commit('addTask', data.task);
                dispatch('hideLoader');   
                return data;
            });
        },
        updateTaskStatus({ commit, dispatch, state }, taskId) {
            const task = state.tasks.data.find(task => task.id === taskId);
          
            if (task) {
              const newStatus = task.status === "incomplete" ? "complete" : "incomplete";
            
              dispatch('showLoader');
              return axiosClient.put(`/tasks/${taskId}`, { status: newStatus }, {
                headers: {
                  Authorization: `Bearer ${state.user.access_token}`
                }
              })
              .then(({ data }) => {
                commit('updateTask', data.data);
                dispatch('hideLoader')
              })
              .catch(error => {
                console.error("There was an error updating the task status:", error);
              });
            } else {
              console.error("Task not found in state:", taskId);
            }
          },
        deleteTask({ commit, dispatch }, taskId) {
            dispatch('showLoader');
            return axiosClient.delete(`/tasks/${taskId}`)
              .then(() => {
                commit('removeTask', taskId);
                dispatch('hideLoader');
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
        setLoader: (state, boolean) => {
            state.loader = boolean;
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
        OPEN_ADD_TASK_MODAL(state) {
            state.addTask = true;
        },
        CLOSE_ADD_TASK_MODAL(state) {
            state.addTask = false;
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