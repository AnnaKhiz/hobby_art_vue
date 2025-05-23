import { fetchData } from "@/services/api";
export const uploadFileModule = {
	namespaced: true,
	state: () => ({
		file: {}
	}),
	getters: {
		file: state => state.file,
	},
	mutations: {
		setFileInfo(state, payload) {
			state.file = { ...payload};
		}
	},
	actions: {
		async sendFile({commit}, body) {
			let result = null;
			try {
				result = await fetchData('api/file/upload', 'POST', {}, body);
				commit('setFileInfo', result.file)
			} catch (error) {
				console.error('Error sending file: ', error)
			}
			return result;
		},

		async sendUserAvatar({commit}, body) {
			let result = null;
			try {
				result = await fetchData('user/upload', 'POST', {}, body);
				commit('setFileInfo', result.file);
			} catch (error) {
				console.error('Error sending file: ', error);
			}
			return result;
		}
	}
}
