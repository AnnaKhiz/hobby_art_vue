import { fetchData } from "@/services/api";

export const usersModule = {
  namespaced: true,
  state: () => ({
    isRegistered: true,
    isAuthorized: false,
    user: {}
  }),
  getters: {
		userInfo: state => state.user,
    getIsRegisteredInfo(state) {
      return state.isRegistered;
    },
    getIsAuthorizedInfo(state) {
      return state.isAuthorized;
    },
    getUserInfo(state) {
      return state.user;
    }
  },
  mutations: {
    setIsRegisteredInfo(state, payload) {
      state.isRegistered = payload;
    },
    setIsAuthorizedInfo(state, payload) {
      state.isAuthorized = payload;
    },
    setUserInfo(state, payload) {
      state.user = payload;
    }
  },
	actions: {
		// USER
		async getAuthUser({ commit }) {
			try {
				const result = await fetchData('user');
				console.log('result', result)
				commit('setUserInfo', result.user[0]);
			} catch (error) {
				console.error('Error getting auth user:', error);
			}
		}
	}
}
