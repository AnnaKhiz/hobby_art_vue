export const dialogModule = {
  namespaced: true,
  state: () => ({
    displayDialog: false,
  }),
  getters: {
    getDisplayDialogState: state => state.displayDialog
  },
  mutations: {
    setDisplayDialogState(state, payload) {
      state.displayDialog = payload
    },
  }
}
