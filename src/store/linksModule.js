export const linksModule = {
  namespaced: true,
  state: () => ({
    headerLink: ''
  }),
  getters: {
    getCheckedHeaderLink(state) {
      return state.headerLink
    }
  },
  mutations: {
    setCheckedHeaderLink(state, payload) {
      state.headerLink = payload
    },
  }
}
