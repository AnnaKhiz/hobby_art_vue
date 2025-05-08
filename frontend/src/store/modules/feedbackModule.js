import {fetchData} from "@/services/api";

export const feedbackModule = {
	namespaced: true,
	state: () => ({
		feedback: {}
	}),
	getters: {
		feedback: state => state.feedback
	},
	mutations: {
		setFeedback(state, payload) {
			state.feedback = payload;
		}
	},
	actions: {
		async addFeedback({ commit }, body) {
			let result = null;
			try {
				result = await fetchData('api/feedback/add', 'POST', {}, body);
				console.log('result', result, commit)
			} catch (error) {
				console.log('Error adding new feedback');
			}
			return result;
		}
	}
}
