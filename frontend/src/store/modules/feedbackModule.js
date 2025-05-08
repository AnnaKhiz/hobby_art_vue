import { fetchData } from "@/services/api";

export const feedbackModule = {
	namespaced: true,
	state: () => ({
		feedback: {},
		feedbackList: [],
	}),
	getters: {
		feedback: state => state.feedback,
		feedbackList: state => state.feedbackList
	},
	mutations: {
		setFeedback(state, payload) {
			state.feedback = payload;
		},
		setFeedbackList(state, payload) {
			state.feedbackList = [...payload];
		},

	},
	actions: {
		async addFeedback({ commit }, body) {
			let result = null;
			try {
				result = await fetchData('api/feedback/add', 'POST', {}, body);
				commit('setFeedback', result.data);
			} catch (error) {
				console.log('Error adding new feedback');
			}
			return result;
		},

		async getFeedbackList({ commit }) {
			let result = null;
			try {
				result = await fetchData('api/feedback');
				commit('setFeedbackList', result.data);
			} catch (error) {
				console.log('Error adding new feedback');
			}
			return result;
		}
	}
}
