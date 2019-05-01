import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        page: 1,
        user: {},
        auth: {},
    },
    mutations: {
        change(state, page) {
            state.page = page;
        }, 
        user(state, user){
            state.user = user;
        },
        auth(state, auth){
            state.auth = auth
        }
    },
    getters: {
        page: state => state.page,
        user: state => state.user,
        auth: state => state.auth,
    }
})