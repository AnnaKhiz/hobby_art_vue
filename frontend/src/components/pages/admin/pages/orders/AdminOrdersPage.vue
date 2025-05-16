<template>
  <router-view v-if="$route.path.includes('add') || $route.path.includes('edit')" :is-show-details="isShowDetails"></router-view>
  <div v-else-if="!orders.length">
    Пока нет заказов
  </div>

    <div
			v-else
			v-for="(tableRow, index) in tableRowList"
			:key="tableRow.text"
			class="items-container__item pa-4"
			:class="{ 'hidden' : isShowDetails}"
		>
      <div class="content" >
				<p class="label align-self-center">Заказ №:</p>
				<p class="row-value align-self-center mb-3">{{ tableRow.id}}</p>
				<p class="label">Стоимость:
					<span class="row-value">{{ tableRow.price }}</span>
				</p>
				<p class="label">Количество:
					<span class="row-value">{{ tableRow.quantity }}</span>
				</p>
				<p class="label">Заказчик:
					<span class="row-value">{{ tableRow.user }}</span>
				</p>
				<p class="label">Способ доставки:
					<span class="row-value">{{ tableRow.delivery }}</span>
				</p>
				<p class="label">Способ оплаты:
					<span class="row-value">{{ tableRow.payment }}</span>
				</p>
				<p class="label">Комментарий:
					<span class="row-value">{{ tableRow.comment }}</span>
				</p>
				<div class="actions mt-auto">
					<button class="button" @click.prevent="showOrderDetails(tableRow, index + 1)">Подробнее</button>
					<button class="button" @click.prevent="handleRemoveOrder(tableRow.id, index)">Удалить</button>
				</div>
			</div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

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
			tableRowList: []
		}
  },
  computed: {
    ...mapGetters({
			ordersList: 'order/ordersList',
			// tableRowsList: 'order/orderTableRowsList',
      parseDeliveryValue: 'delivery/parseDeliveryValue',
      parsePaymentValue: 'delivery/parsePaymentValue'
    }),


  },
  methods: {
		...mapActions('order', ['fetchOrders', 'removeOrder']),
    showOrderDetails(order, index) {
      this.$router.push({name: 'admin-orders-edit', params: { orderId: order.id } })
      this.message = ''
      this.isShowDetails = true
      order.index = index;
      this.selectedOrder = order;
    },

    async handleRemoveOrder(orderId, index) {
			const result = await this.removeOrder(orderId);

			if (!result) return;

			this.tableRowList.splice(index, 1);
    },
  },
  async mounted() {
		await this.fetchOrders();
		this.orders = this.ordersList;

		this.tableRowList = this.orders.map(el => (
			{
				id: el._id,
				price: el.totalPrice,
				quantity: el.totalQuantity,
				user: `${el.users?.lastName || ''} ${el.users?.name || ''} ${el.users?.surName || ''}`,
				delivery: this.parseDeliveryValue(el.deliveryInfo.deliveryMethod),
				payment: this.parsePaymentValue(el.deliveryInfo.paymentMethod),
				comment: el.deliveryInfo.receiver.userComment || '',
				isParsedValue: false,
			})
		)
		console.log(this.tableRowList)
  }
}
</script>



<style scoped lang="sass">
.items-container
  &__item
    background: #E8E8E8
    border-radius: 12px
    width: 48%
    height: 350px
    padding: 15px
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: space-between
    & > .title
      width: 100%
      text-align: center
    & > .content
      display: flex
      flex-direction: column
      gap: 10px
      flex-grow: 1
.actions
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
.row-value
  max-width: 200px
  font-weight: 400
</style>
