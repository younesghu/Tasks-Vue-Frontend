import {createStore} from "vuex";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return fetch('http://127.0.0.1:8000/api/auth/register', {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "POST",
                body: JSON.stringify(user),
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.token) { // Make sure the response contains a token
                    commit("setUser", res);
                }
                return res;
            })
            .catch((error) => {
                console.error('Error during registration:', error);
                throw error;
            });
        },
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            sessionStorage.setItem("TOKEN", userData.token);
            state.user.data = userData.user;
        }
    },
    modules: {}
});

export default store;