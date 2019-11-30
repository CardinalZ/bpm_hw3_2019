// initial state
const state = {
  isLogin: false
}

// getters.js
const getters = {}

// actions
const actions = {
  changeLoginState ({commit}, isLogin) {
    commit('changeLoginState', isLogin)
  }
}

// mutations
const mutations = {
  changeLoginState (state, isLogin) {
    state.isLogin = isLogin
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
