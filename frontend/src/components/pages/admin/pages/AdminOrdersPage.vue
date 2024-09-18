<template>
  <router-view v-if="$route.path.includes('add') || $route.path.includes('edit')" :is-show-details="isShowDetails"></router-view>
  <div v-else-if="!orders.length">
    Пока нет заказов
  </div>

  <div
    v-else
    class="items-container__item"
    :class="{ 'hidden' : isShowDetails}"
    v-for="(order, index) in orders"
    :key="order._id"
  >
    <div class="title">
      <h3  class="item-row"><span class="label">Заказ №: </span> {{ order._id }}</h3>
    </div>
    <div class="content">
      <p class="item-row"><span class="label">Стоимость: </span> {{order.totalPrice}} грн</p>
      <p class="item-row"><span class="label">Количество товаров: </span> {{order.totalQuantity}}</p>
      <p class="item-row"><span class="label">Заказчик: </span> {{ order.deliveryInfo.fullName }}</p>
      <p class="item-row"><span class="label">Способ доставки: </span> {{ parseDeliveryValue(order.deliveryInfo.deliveryMethod) }}</p>
      <p class="item-row"><span class="label">Способ оплаты: </span> {{ parsePaymentValue(order.deliveryInfo.paymentMethod) }}</p>
      <p class="item-row"><span class="label">Комментарий пользователя: </span> {{order.deliveryInfo.userComment}}</p>
    </div>

    <div class="actions">
      <button class="button" @click.prevent="showOrderDetails(order, index + 1)">Подробнее</button>
      <button class="button" @click.prevent="removeOrder(order._id, index)">Удалить</button>
    </div>
  </div>



</template>

<script>
// import UiTableContent from "@/components/pages/admin/UI/table/uiTableContent.vue"
// import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";
// import UiDeleteIcon from "@/components/UI/icons/uiDeleteIcon.vue";
// import UiModalTemplate from "@/components/UI/modal/uiModalTemplate.vue";


export default
{
  name: "uiAdminOrdersCard.vue",
  components: {},
  data() {
    return {
      errorMessage: '',
      checkedColor: '',
      isDisplayDialog: false,
      itemsList: [],
      message: '',
      isShowDetails: false,
      selectedOrder: {
        deliveryInfo: {
          receiver: {
            fullName: '',
            phone: '',
            email: '',
          },
          fullAddress: '',
          deliveryMethod: '',
          paymentMethod: '',
          userComment: ''
        }
      },
      orders: [],
      deliveryMethods: [
        { text: 'Новая почта', value: 'novapost', price: 250 },
        { text: 'Укрпочта', value: 'ukrpost', price: 150 },
        { text: 'Самовывоз', value: 'pickup', price: 0 },
      ],
      paymentMethod: [
        { text: 'Оплата при получении наличными или картой', value: 'cash' },
        { text: 'Оплата банковской картой онлайн', value: 'online' },
      ],
    }
  },
  methods: {
    showOrderDetails(order, index) {
      this.$router.push({name: 'admin-orders-edit', params: { orderId: order._id } })
      this.message = ''
      this.isShowDetails = true
      order.index = index;
      this.selectedOrder = order;
    },


    parseDeliveryValue(value) {
      const deliveryObject = this.deliveryMethods.find(el => el.value === value);

      if (!deliveryObject) return;

      return deliveryObject.text
    },
    parsePaymentValue(value) {
      const paymentObject = this.paymentMethod.find(el => el.value === value);

      if (!paymentObject) return;

      return paymentObject.text
    },

    async removeOrder(orderId, index) {
      try {
        const result = await fetch(`http://localhost:3000/api/orders/remove/${orderId}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        const data = await result.json();
        if (!data.result) return false;
        this.orders.splice(index, 1)
      } catch (error) {
        console.log('Update error', error)
      }
    },

    async initPage() {
      try {
        const result = await fetch(`http://localhost:3000/api/orders`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await result.json();

        if (!data.result) return;

        this.orders = data.orders

      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    await this.initPage();
  }
}
</script>



<style scoped lang="sass">
.items-container
  &__item
    background: #E8E8E8
    border-radius: 12px
    width: 30%
    height: 350px

    padding: 15px
    display: flex
    flex-direction: column
    align-items: flex-start
    & > .title
      width: 100%
      text-align: center
    & > .content
      flex-grow: 1
    & > .actions
      display: flex
      align-items: center
      justify-content: start
      gap: 20px
      margin-top: 15px
.item-row
  margin-bottom: 5px
  &:not(p.item-row)
    margin-bottom: 15px
.label
  font-weight: bold
  font-size: 1rem
.button
  font-size: 1rem
  color: #7B4646
  transition: color 0.3s ease-in-out 0s
  background: transparent
  &:hover
    transition: color 0.3s ease-in-out 0s
    color: #5E5C5A
    text-decoration: underline
.button-container
  padding: 20px
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
.hidden
  display: none
.notify-message
  color: var(--errorText)
table.order-items-table, th, td
  border: 1px solid var(--grayLinkColor)
  border-collapse: collapse
  & tr
    transition: all 0.3s ease-in-out 0s
    &:hover
      background: var(--colorLineBasket)
  & td
    padding: 10px
.discount-style
  width: 100px
  text-decoration: line-through
  color: var(--colorCounter)
.select-list
  padding: 8px 11px
  width: 100%
  background-color: var(--colorTextButton)
  font-size: 1rem
  font-family: inherit
  border-radius: 12px
  box-shadow: 1px -1px 6px inset rgba(94, 92, 90, 0.58)
</style>
