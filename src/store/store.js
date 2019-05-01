import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        page: 1,
        session: null
    },
    mutations: {
        change(state, page) {
            state.page = page;
        }, 
        changes(state, session){
            state.session = session;
        }
    },
    getters: {
        page: state => state.page,
        session: state => state.session
    }
})