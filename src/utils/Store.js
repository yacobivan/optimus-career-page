import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './StoreMutationTypes'

Vue.use(Vuex);

const state = {
    user: {}
}

const mutations = {
    [types.SIGN_IN] (state, userPayload) {
        state.user = userPayload
    },
    [types.SIGN_OUT] (state) {
        state.user = {}
    }
}

const actions = {
    signIn: ({commit}, userPayload) => {
        commit(types.SIGN_IN, userPayload)
    },
    signOut: ({commit}) => {
        commit(types.SIGN_OUT)
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store