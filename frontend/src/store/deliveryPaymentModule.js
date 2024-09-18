export const deliveryPaymentModule = {
  namespaced: true,
  state: () => ({
    delivery: '',
    payment: '',
    deliveryMethods: [
      { text: 'Новая почта', value: 'novapost', price: 250 },
      { text: 'Укрпочта', value: 'ukrpost', price: 150 },
      { text: 'Самовывоз', value: 'pickup', price: 0 },
    ],
    paymentMethod: [
      { text: 'Оплата при получении наличными или картой', value: 'cash' },
      { text: 'Оплата банковской картой онлайн', value: 'online' },
    ],
  }),
  getters: {
    parseDeliveryValue(state, value) {
      console.log('get delivery value', value)
      const deliveryObject = state.deliveryMethods.find(el => el.value === value);

      if (!deliveryObject) return;
      console.log(deliveryObject.text)

      return deliveryObject.text
    },
  },
  mutations: {
    parseDeliveryValue(state, value) {
      console.log('get delivery value', value)
      const deliveryObject = state.deliveryMethods.find(el => el.value === value);

      if (!deliveryObject) return;
      console.log(deliveryObject.text)

      return deliveryObject.text
    },
    parsePaymentValue(state, value) {
      const paymentObject =state.paymentMethod.find(el => el.value === value);

      if (!paymentObject) return;

      return paymentObject.text
    },
  }
}
