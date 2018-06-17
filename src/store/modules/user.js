import Auth from '@/api/auth'
import router from '@/router'

const state = {
  user: null,
}

const getters = {
  user: state => state.user || {}
}

const mutations = {
  setUser(state, { user }) {
    state.user = user
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return Auth.login({ username, password })
      .then(res => {
        commit('setUser', { user: res.data })
      })
  },

  register({ commit }, { username, password }) {
    return Auth.register({ username, password })
      .then(res => {
        commit('setUser', { user: res.data })
      })
  },

  logout({ commit }) {
    return Auth.logout()
      .then(res => {
        commit('setUser',  { user: null })
        const loginModal = document.querySelector('#modal-form').classList
        loginModal.add('in')
        loginModal.add('showLogin')
      })
  },

  checkLogin({ commit }) {
    return Auth.getInfo()
      .then(res => {
        commit('setUser', { user: res.data })
      }).catch(() => {
        const loginModal = document.querySelector('#modal-form').classList
        loginModal.add('in')
        loginModal.add('showLogin')
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
