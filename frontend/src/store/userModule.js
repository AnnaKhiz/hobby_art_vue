export const userModule = {
  namespaced: true,
  state: () => ({
    isRegistered: true,
    isAuthorized: false,
    user: {}

  }),
  getters: {
    getIsRegisteredInfo(state) {
      return state.isRegistered
    },
    getIsAuthorizedInfo(state) {
      return state.isAuthorized
    },
    getUserInfo(state) {
      return state.user
    }
  },
  mutations: {
    setIsRegisteredInfo(state, payload) {
      state.isRegistered = payload
    },
    setIsAuthorizedInfo(state, payload) {
      state.isAuthorized = payload
    },
    setUserInfo(state, payload) {
      state.user = payload
    }
  }
}