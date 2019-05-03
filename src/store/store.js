import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        page: 1,
        user: {},
        auth: {},
        solicitudes: [],
        showModal: false,
        comentarios: [],
    },
    mutations: {
        change(state, page) {
            state.page = page;
        }, 
        setModal(state, showModal){
            state.showModal = showModal;
        },
        user(state, user){
            state.user = user;
        },
        auth(state, auth){
            state.auth = auth
        },
        solicitudes(state, solicitudes){
            state.solicitudes =  solicitudes
        },
        setComentario(state, comentarios){
            state.comentarios = solicitudes
        }
    },
    getters: {
        page: state => state.page,
        user: state => state.user,
        auth: state => state.auth,
        solicitudes: state => state.solicitudes,
        getComentarios: state => state.comentarios,
        getModal: state => state.showModal,
    }
})