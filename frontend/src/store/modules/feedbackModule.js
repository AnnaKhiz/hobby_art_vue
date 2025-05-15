import { fetchData } from "@/services/api";

export const feedbackModule = {
	namespaced: true,
	state: () => ({
		isLoading: true,
		feedback: {},
		feedbackList: [],
	}),
	getters: {
		isLoading: state => state.isLoading,
		feedback: state => state.feedback,
		feedbackList: state => state.feedbackList
	},
	mutations: {
		updateIsLoading(state, payload) {
			state.isLoading = payload;
		},
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
				commit('updateIsLoading', false);
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
				commit('updateIsLoading', false);
			} catch (error) {
				console.log('Error adding new feedback');
			}
			return result;
		},

		// ADMIN

		async getFeedbackListAdmin({ commit}) {
			let result = null;
			try {
				result = await fetchData('admin/feedback');
				commit('setFeedbackList', result.data);
				console.log('feedbacks', result.data)
				commit('updateIsLoading', false);
			} catch (error) {
				console.log('Error adding new feedback');
			}
			return result;
		},

		async removeFeedbackAdmin({ commit }, id) {
			let result = null;
			try {
				result = await fetchData('admin/feedback/remove/:id', 'DELETE', { id });
				commit('setFeedback', result.data);
				console.log(result.data)
				commit('updateIsLoading', false);
			} catch (error) {
				console.log('Error removing feedback');
			}
			return result;
		},

		async updateFeedbackAdmin({ commit }, { id, body }) {
			let result = null;
			try {
				result = await fetchData('admin/feedback/update/:id', 'PATCH', { id }, body);
				commit('setFeedback', result.data);
				console.log(result.data)
				commit('updateIsLoading', false);
			} catch (error) {
				console.log('Error removing feedback');
			}
			return result;
		}
	}
}
