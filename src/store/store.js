import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        page: 1,
        user: {},
        auth: {},
        solicitudes: []
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
        },
        solicitudes(state, solicitudes){
            state.solicitudes =  solicitudes
        }
    },
    getters: {
        page: state => state.page,
        user: state => state.user,
        auth: state => state.auth,
        solicitudes: state => state.solicitudes,
    }
})