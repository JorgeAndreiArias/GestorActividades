import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        page: 1,
        user: {},
        auth: {},
        solicitudes: [],
        mias: [],
        todas: [],
        showModal: false,
        comentarios: [],
    },
    mutations: {
        change(state, page) {
            state.page = page;
        }, 
        setMias(state, mias){
            state.mias = mias;
        },
        setTodas(state, todas){
            state.todas = todas;
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
            state.comentarios = comentarios
        }
    },
    getters: {
        page: state => state.page,
        user: state => state.user,
        auth: state => state.auth,
        solicitudes: state => state.solicitudes,
        getComentarios: state => state.comentarios,
        getModal: state => state.showModal,
        getMias: state => state.mias,
        getTodas: state => state.todas,
    }
})