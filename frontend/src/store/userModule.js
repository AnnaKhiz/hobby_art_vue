export const userModule = {
  namespaced: true,
  state: () => ({
    isRegistered: true,
    isAuthorized: false

  }),
  getters: {
    getIsRegisteredInfo(state) {
      return state.isRegistered
    },
    getIsAuthorizedInfo(state) {
      return state.isAuthorized
    }
  },
  mutations: {
    setIsRegisteredInfo(state, payload) {
      state.isRegistered = payload
    },
    setIsAuthorizedInfo(state, payload) {
      state.isAuthorized = payload
    }
  }
}