export const ordersModule = {
  namespaced: true,
  state: () => ({
    order: {
      items: [],
      totalPrice: 0,
      totalQuantity: 0
    }
  }),
  getters: {
    order: state => state.order
  },
  mutations: {
    updateOrders(state, payload) {
      state.order = payload
    },
    addToOrder(state, payload) {
      console.log('payload', payload)

      if (state.order.items.length) {
        console.log('state.order.items', state.order.items)
        state.order.items.forEach(el=> console.log(el.item._id, + ' ', payload.item._id))
        const index = state.order.items.findIndex(el => el.item._id === payload.item._id);

        console.log('index', index)
        if (index === -1) {
          state.order.items.push(payload)
        } else {
          state.order.items[index].price += payload.price
          state.order.items[index].quantity += payload.quantity
        }

      } else {
        state.order.items.push(payload)
      }

      state.order.totalQuantity = state.order.items.reduce((acc, curVal) => acc + +curVal.quantity, 0)
      state.order.totalPrice = state.order.items.reduce((acc, curVal) => acc + +curVal.price, 0)
      localStorage.setItem('order', JSON.stringify(state.order))
      console.log(state.order)
    },

    clearOrder(state) {
      state.orderItems = {}
    }
  }
}
