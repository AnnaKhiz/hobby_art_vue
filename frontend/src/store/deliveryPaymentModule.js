export const deliveryPaymentModule = {
  namespaced: true,
  state: () => ({
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
    parseDeliveryValue: (state) => (value) => {
      const delivery = state.deliveryMethods.find(el => el.value === value);
      if (!delivery) return;
      return delivery.text;
    },
    parsePaymentValue: (state) => (value) => {
      const payment = state.paymentMethod.find(el => el.value === value);
      if (!payment) return;
      return payment.text;
    },
  },
}
