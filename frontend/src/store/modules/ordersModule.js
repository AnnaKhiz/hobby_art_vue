import {fetchData} from "@/services/api";

export const ordersModule = {
  namespaced: true,
  state: () => ({
    order: {
			items: [],
			totalPrice: 0,
			totalQuantity: 0,
		},
		ordersList: [],
  }),
  getters: {
    order: state => state.order,
		ordersList: state => state.ordersList,
    totalQuantity: state => state.totalQuantity,
  },
  mutations: {
    updateOrder(state, payload) {
      state.order = payload;
    },
		updateOrdersList(state, payload) {
			state.ordersList = [...payload];
		},
		updateItemsInOrder(state, payload) {
			state.order = { ...state.order, ...payload };
		},
		updateOrderData(state, payload) {
			state.order = {...payload};
		},
    addToOrder(state, payload) {
      if (state.order.items.length) {
        searchForMatches(state, payload)
      } else {
        state.order.totalQuantity = payload.quantity;
        state.order.totalPrice = payload.price;
        state.order.items.push(payload)
      }

      if (!localStorage.getItem('order')) {
        localStorage.setItem('order', JSON.stringify(state.order))
      } else {
        state.order = JSON.parse(localStorage.getItem('order'))
        searchForMatches(state, payload);
        localStorage.setItem('order', JSON.stringify(state.order));
      }
    },

    updateTotalQuantity(state) {
      state.order.totalQuantity = state.order.items.reduce((acc, curVal) => acc + +curVal.quantity, 0)
    },
    updateTotalPrice(state) {
      state.order.totalPrice = state.order.items.reduce((acc, curVal) => acc + +curVal.price, 0)
    },

    clearOrder(state) {
      state.order = {
        items: [],
        totalPrice: 0,
        totalQuantity: 0
      }
    }
  },
	actions: {
		// ORDER (selected)
		async fetchOrderById({ commit }, id) {
			try {
				const result = await fetchData('orders/:id', 'GET', { id });

				commit('updateOrder', result.data);
			} catch (error) {
				console.error('Error fetching orders:', error);
			}
		},
		async updateOrder({commit}, { id, body }) {
			try {
				const result = await fetchData('orders/update/:id', 'PATCH', { id }, body);
				commit('updateItemsInOrder', result.data);
			} catch (error) {
				console.error('Error updating order items:', error);
			}
		},

		// ORDERS
		async fetchOrders({ commit }) {
			try {
				const result = await fetchData('orders');
				console.log(result)
				commit('updateOrdersList', result.orders);
			} catch (error) {
				console.error('Error fetching orders:', error);
			}
		},
		async removeOrder({ commit }, id) {
			let result = null;
			try {
				result = await fetchData('orders/remove/:id', 'DELETE', { id });
				console.log('remove order result', result.data)
				commit('updateOrdersList', result.data)
			} catch (error) {
				console.error('Error removing order items:', error);
			}
			return result;
		},

		// ORDER ITEMS
		async updateItemsInOrder({commit}, { idOrder, idItem, body }) {
			try {
				await fetchData('orders/update/:idOrder/:idItem', 'PATCH', { idOrder, idItem }, body);
				commit('updateOrderData', body);
			} catch (error) {
				console.error('Error updating order items:', error);
			}
		},
		async removeItemFromOrder({ commit }, { idOrder, idItem }) {
			let result = null;
			try {
				result = await fetchData('orders/remove/:idOrder/:idItem', 'DELETE', { idOrder, idItem });
				console.log('remove result', result)
				commit('updateOrder', result.data);
			} catch (error) {
				console.error('Error removing order items:', error);
			}
			return result
		},
	}
}

function countTotal(state, storeFieldName, objectFieldName) {
  state.order[storeFieldName] = state.order.items.reduce((acc, curVal) => acc + +curVal[objectFieldName], 0)
}

function searchForMatches(state, payload) {
  const index = state.order.items.findIndex(el => el.item._id === payload.item._id && el.checkedColor === payload.checkedColor);

  if (index === -1) {
    state.order.items.push(payload)
  } else {
    state.order.items[index].price += payload.price
    state.order.items[index].quantity += payload.quantity
  }

  countTotal(state, 'totalPrice', 'price')
  countTotal(state, 'totalQuantity', 'quantity')
}
