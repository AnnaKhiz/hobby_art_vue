import { fetchData } from "@/services/api";

export const itemsModule = {
	namespaced: true,
	state: () => ({
		itemsList: [],
		orderItemsList: [],
	}),
	getters: {
		getItems(state) {
			return state.itemsList;
		},
		getOrderItems(state) {
			return state.orderItemsList;
		},
	},
	mutations: {
		setItems(state, payload) {
			state.itemsList = payload;
		},
		removeItems(state, payload) {
			const index = state.itemsList.findIndex(el => el._id === payload);
			if (index === -1) return;
			state.itemsList = state.itemsList.splice(payload, 1);
		},
		setOrderItems(state, payload) {
			state.orderItemsList = payload;
		}
	},
	actions: {
		async fetchItems({ commit }) {
			try {
				const result = await fetchData('items');
				addSelectedOption(result.items);
				commit('setItems', result.items);
			} catch (error) {
				console.error('Error fetching items:', error);
			}
		},
		async fetchOrderItems({ commit }, id) {
			try {
				const result = await fetchData('items/:id', 'GET', { id });
				commit('setOrderItems', result.items);
			} catch (error) {
				console.error('Error fetching items:', error);
			}
		},
		async removeItem({ commit }, id) {
			try {
				const result = await fetchData('items/remove/:id', 'DELETE', { id })
				console.log(result)
				commit('removeItems', result.data._id);
			} catch (error) {
				console.log(error)
			}
		}
	}
}

function addSelectedOption(list) {
	if (!list.length) return;
	return list.map(el => ({...el, isSelectedItem: false }));
}
