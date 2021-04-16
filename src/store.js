import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        isAuth: false,
        user: null,
        token: null,
        ticket: null,
        paymentMethod: null
    },
    mutations: {
        SET_AUTHENTICATED(state, authenticated) {
            state.isAuth = authenticated;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TICKET(state, ticked) {
            state.ticket = ticked;
        },
        SET_PAYMENT(state, method) {
            state.paymentMethod = method;
        },
        RESET_TICKET(state) {
            state.ticket = null
        }
    },
    getters: {
        getTicket(state){
            return {
                ...state.ticket,
                paymentMethod: state.paymentMethod
            }
        },
    },
    actions: {
        signIn({ commit }, { token, isAuth, user }) {
            commit('SET_AUTHENTICATED', isAuth);
            commit('SET_TOKEN', token);
            commit('SET_USER', user);
        },
        logout({ commit }) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_TOKEN', null);
            commit('SET_USER', null);
            commit('SET_PAYMENT', null);
            commit('RESET_TICKET');
        },
        setTicket({ commit }, ticked) {
            commit('SET_TICKET', ticked)
        },
        setPayment({ commit }, method) {
            commit('SET_PAYMENT', method)
        },
        resetTicket({ commit }) {
            commit('SET_PAYMENT', null)
            commit('RESET_TICKET')
        }
    }
})