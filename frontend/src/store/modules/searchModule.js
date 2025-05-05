export const searchModule = {
	namespaced: true,
	state: () => ({
		searchText: '',
		searchList: [],
		itemsList: []
	}),
	getters: {
		searchText: state => state.searchText,
		searchList: state => state.searchList,
	},
	mutations: {
		searchItem(state, payload) {
			state.searchText = payload;

			state.searchList = state.itemsList.filter(item => item.brand.text.includes(payload)
				|| item.name.includes(payload)
				|| item.description.includes(payload)
				|| item.price === +payload
				|| item.type.text.toLowerCase() === payload.toLowerCase()
				|| item.length === +payload
				|| item.width === +payload
			)
		},
		resetSearch(state, payload) {
			state.searchText = '';
			state.searchList = payload;
		},
	},
	actions: {
		getItemsList({ state, rootState }) {
			state.itemsList = rootState.items.itemsList;
		}
	}
}
