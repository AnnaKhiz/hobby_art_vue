import { fetchData } from "@/services/api";

export const itemsModule = {
	namespaced: true,
	state: () => ({
		itemsList: [],
		item: [],
	}),
	getters: {
		getItems(state) {
			return state.itemsList;
		},
		getItemById(state) {
			return state.item;
		},
	},
	mutations: {
		setItems(state, payload) {
			state.itemsList = payload;
		},
		addNewItem(state, payload) {
			state.itemsList.push(payload);
		},
		updateItemsList(state, { id, payload }) {
			const index = state.itemsList.findIndex(el => el._id === id);
			if (index === -1) return;
			state.itemsList[id] = payload;
		},
		removeItems(state, id) {
			const index = state.itemsList.findIndex(el => el._id === id);
			if (index === -1) return;
			state.itemsList.splice(index, 1);
		},
		setItem(state, payload) {
			state.item = payload;
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

		async fetchItemById({ commit }, id) {
			try {
				const result = await fetchData('items/:id', 'GET', { id });
				commit('setItem', result.items || result.item);
			} catch (error) {
				console.error('Error fetching item:', error);
			}
		},

		async addItem({ commit }, body) {
			let result = {};
			try {
				result = await fetchData('items/add', 'POST', {}, body);
				commit('addNewItem', result.data)
			} catch (error) {
				console.error('Error adding items:', error);
			}
			return result.data;
		},

		async updateItem({ commit }, { id, body }) {
			try {
				await fetchData('items/update/:id', 'PATCH', { id }, body);
				commit('updateItemsList', { id, payload: body });
			} catch (error) {
				console.error('Error updating items:', error);
			}
		},

		async removeItem({ commit }, id) {
			console.log('removed id', id)
			try {
				const result = await fetchData('items/remove/:id', 'DELETE', { id })
				commit('removeItems', result.data._id);
			} catch (error) {
				console.log('Error removing items:', error)
			}
		}
	}
}

function addSelectedOption(list) {
	if (!list.length) return;
	return list.map(el => ({...el, isSelectedItem: false }));
}
