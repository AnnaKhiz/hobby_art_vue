import { fetchData } from "@/services/api";

export const adminModule = {
	namespaced: true,
	state: () => ({
		admin: {}
	}),
	getters: {
		admin: state => state.admin,
	},
	mutations: {
		setAdminData(state, payload) {
			state.admin = payload;
		}
	},
	actions: {
		async checkAdmin() {
			let result = null;
			try {
				result = await fetchData('admin');
			} catch (error) {
				console.error('Error log in admin:', error);
			}
			return result.result;
		},

		async logInAdmin({ commit }, body) {
			let result = null;
			try {
				result = await fetchData('admin/login', 'POST', {}, body);
				commit('setAdminData', result.data);
			} catch (error) {
				console.error('Error log in admin:', error);
			}
			return result;
		},
	}
}
