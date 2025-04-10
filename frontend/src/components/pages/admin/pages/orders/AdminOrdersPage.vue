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
import {mapGetters} from "vuex";

export default
{
  name: "uiAdminOrdersCard.vue",
  components: {},
  data() {
    return {
			apiBaseUrl: process.env.VUE_APP_API_URL,
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
    }
  },
  computed: {
    ...mapGetters({
      parseDeliveryValue: 'delivery/parseDeliveryValue',
      parsePaymentValue: 'delivery/parsePaymentValue'
    }),

  },
  methods: {

    showOrderDetails(order, index) {
      this.$router.push({name: 'admin-orders-edit', params: { orderId: order._id } })
      this.message = ''
      this.isShowDetails = true
      order.index = index;
      this.selectedOrder = order;
    },

    async removeOrder(orderId, index) {
      try {
        const result = await fetch(`${this.apiBaseUrl}/api/orders/remove/${orderId}`, {
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
        const result = await fetch(`${this.apiBaseUrl}/api/orders`, {
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
.hidden
  display: none
</style>
