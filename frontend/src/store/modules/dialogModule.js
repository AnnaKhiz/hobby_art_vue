export const dialogModule = {
  namespaced: true,
  state: () => ({
    displayDialog: false,
  }),
  getters: {
    getDisplayDialogState(state) {
      return state.displayDialog
    },

  },
  mutations: {
    setDisplayDialogState(state, payload) {
      state.displayDialog = payload
    },
  }
}