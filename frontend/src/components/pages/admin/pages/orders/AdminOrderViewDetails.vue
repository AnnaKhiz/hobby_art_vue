<template>
  <div v-if="isShowDetails" style="position: absolute; top: -30px; left: 0; color: red">
    {{ errorMessage }}
  </div>
  <div  class="items-container__item" style="width: 100%; padding: 0">

    <ui-table-content
      :orderId="orderId"
      @error="errorMessage = $event"
    >
      <template #deliveryMethod="{item}">
        {{ parseDeliveryValue(item.value) }}
      </template>

      <template #paymentMethod="{item}">
        {{ parsePaymentValue(item.value) }}
      </template>
    </ui-table-content>

    <div v-if="selectedOrder.items.length" class="main__basket-info-item-product-count container">
      <div v-for="(item, index) in selectedOrder.items" :key="item._id" class="main__basket-info-item-product" data-count="count-block" style="margin-bottom: 15px">
        <div style="display: flex; align-items: center; justify-content: flex-start; column-gap: 15px">
          <div class="main__basket-info-item-product-img" style="width: 50px; height: 50px; object-fit: contain; aspect-ratio: 1/1">
            <img :src="`/uploads/${item._id.photo ? item._id.photo : 'no_image.png'}`" alt="product image" style="height: 100%">
          </div>
          <p class="main__basket-info-item-product-name admin-order-view" >
            {{ item._id.name }}
          </p>
          <p class="main__basket-info-item-product-name admin-order-view" style="font-weight: 400">
            ( {{ parseCheckedColors(item.checkedColor, index)}} )
          </p>
        </div>

        <ui-quantity-counter @input="changeCountAndPrice(index, $event)" :order-count="item.quantity"/>
        <p class="main__basket-info-item-product-price" data-price="basket-item-price">
          {{ item.price }} грн
        </p>
        <ui-delete-icon @remove="selectedOrder.items.length > 1 ? deleteItemFromOrder(item, index) : notify('В заказе должен быть хотябы 1 товар')"/>
      </div>
    </div>
		<div
			v-else
			class="main__basket-info-item-product-count container alert"
		>
			В этом заказе нет товаров
		</div>

    <button class="button" @click="getItemsList" style="padding-left: 20px">Добавить товар</button>
    <div class="button-container">
      <button class="button" @click="$router.push({name: 'admin-orders'})">Назад</button>
      <h2 class="notify-message">{{message}}</h2>
    </div>


    <!--  DIALOG add products to order  -->
    <ui-modal-template :value="isDisplayDialog" @close="isDisplayDialog = $event" width="80%" height="fit-content">
      <template #tableData>
        <table class="order-items-table">
          <tr>
            <td v-for="header in headers" :key="header.value">{{header.text}}</td>
          </tr>
          <tr v-for="(item, index) in productList" :key="item._id">
            <td style="width: 50px">{{ index + 1 }}</td>
            <td>{{item._id}}</td>
            <td>{{item.name}}</td>
            <td style="width: 200px">
              <select class="select-list" v-model="item.checkedColor" >
                <option :value="item.checkedColor" disabled >Выберите цвет</option>
                <option
                  v-for="option in item.color"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </td>
            <td style="width: 80px">{{item.restBalance}}</td>
            <td>{{item.discountPercentage}} %</td>
            <td>
              <p :class="{ 'discount-style': item.discountPercentage > 0 }">{{item.price}} грн</p>
              <p style="color: var(--errorText)">{{ item.discountPercentage > 0 ? `${item.price - (item.price * item.discountPercentage) / 100} грн` : '' }} </p>
            </td>
            <td>
              <img src="../../../../../assets/img/add-30.png" alt="add icon" style="cursor: pointer" @click="updateItemsListInOrder(item)">
            </td>
          </tr>
        </table>
      </template>
    </ui-modal-template>
  </div>
</template>

<script>
import UiTableContent from "@/components/pages/admin/UI/table/uiTableContent.vue";
import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";
import UiModalTemplate from "@/components/UI/modal/uiModalTemplate.vue";
import UiDeleteIcon from "@/components/UI/icons/uiDeleteIcon.vue";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "AdminOrderViewDetails.vue",
  components: {UiDeleteIcon, UiModalTemplate, UiQuantityCounter, UiTableContent},
  props: {
    orderId: {
      type: String,
      default: ''
    },
    isShowDetails: {
      type: Boolean,
      default: false
    }
  },
  data() {
		return {
			productList: [],
			isDisplayDialog: false,
			selectedOrder: {
				items: [],
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
			message: '',
			errorMessage: '',

			headers: [
				{ text: "№", value: 'count' },
				{ text: "Артикул", value: 'id' },
				{ text: "Название", value: 'name' },
				{ text: "Цвет", value: 'color' },
				{ text: "Остаток", value: 'restBalance' },
				{ text: "Скидка", value: 'discountPercentage' },
				{ text: "Цена", value: 'price' },
				{ text: "Добавить", value: 'add' },
			]
			}
  },
  emits: ['updateShowDetails'],
  computed: {
    ...mapGetters({
			order: 'order/order',
      parseDeliveryValue: 'delivery/parseDeliveryValue',
      parsePaymentValue: 'delivery/parsePaymentValue'
    }),
		...mapState('items', ['itemsList']),
  },
  methods: {
		...mapActions('items', ['fetchItems']),
		...mapActions('order', ['fetchOrderById', 'updateItemsInOrder', 'updateOrder', 'removeItemFromOrder']),

    notify(text) {
      this.message = text;
    },

    parseCheckedColors(color, itemId) {
			if (!this.selectedOrder.items.length) return;

      const currentItem = this.selectedOrder.items[itemId];
			console.log(currentItem)
      const colorObject = currentItem?._id?.color.find(el => el.value === color);
      if (!colorObject) return '';

      return colorObject.text
    },
    async changeCountAndPrice(index, quantity) {
      const updatedFinalPrice = quantity * this.selectedOrder.items[index]._id?.price;

      this.selectedOrder.items[index].quantity = quantity;
      this.selectedOrder.items[index].price = updatedFinalPrice;

      const itemId = this.selectedOrder.items[index]._id?._id;

      const updatedObject = {
        'price': updatedFinalPrice,
        'quantity': quantity,
        'totalPrice': this.selectedOrder.items.reduce((acc, curElem) => acc + +curElem.price, 0),
        'totalQuantity': this.selectedOrder.items.reduce((acc, curElem) => acc + +curElem.quantity, 0),
      }

      await this.updateItemsInOrder(
				{
					idOrder: this.orderId,
					idItem: itemId,
					body: updatedObject,
				});
    },

    async deleteItemFromOrder(item) {
      this.message = '';

			const result = await this.removeItemFromOrder({
				idOrder: this.orderId,
				idItem: item._id._id,
				color: item.checkedColor
			})

			if (!result) return;
			this.selectedOrder.items = result.data.items;

			const resultUpdate = await this.updateOrder({
				id: this.orderId,
				body: {
					totalPrice: result.data.items.reduce((acc, curElem) => acc + +curElem.price, 0),
					totalQuantity: result.data.items.reduce((acc, curElem) => acc + +curElem.quantity, 0)
				},
			})

			this.selectedOrder = resultUpdate.data;

    },
    async getItemsList() {
      this.isDisplayDialog = true;

			await this.fetchItems();
			this.productList = this.itemsList;

			if(!this.selectedOrder.items.length) return;

			const list = this.selectedOrder.items.map(el => ({_id: el._id._id, checkedColor: el.checkedColor}));

			list.forEach(element => {
				this.productList = this.productList
					.map(el => (
						el._id === element._id
							? {...el, color: el.color.filter(color => color.value !== element.checkedColor)}
							: el
					))
					.filter(el => el.color.length)
			})
    },
    async updateItemsListInOrder(item) {
      const updatedItemsList = [
				...this.selectedOrder.items,
				{
					price: item.price,
					quantity: 1,
					_id: item ,
					checkedColor: item.checkedColor
				}
			]

			const result = await this.updateOrder({
				id: this.orderId,
				body: { items: updatedItemsList },
			})

			this.selectedOrder.items = [...result.data.items];

			const updatedObject = {
				'price': item.price,
				'quantity': 1,
				'totalPrice': result.data.items.reduce((acc, curElem) => acc + +curElem.price, 0),
				'totalQuantity': result.data.items.reduce((acc, curElem) => acc + +curElem.quantity, 0),
			}

			await this.updateItemsInOrder(
				{
					idOrder: this.orderId,
					idItem: item._id,
					body: updatedObject,
				});

			this.isDisplayDialog = false;
    },
  },
  async mounted() {
		await this.fetchOrderById(this.orderId);
		this.selectedOrder = this.order;
  },
}
</script>

<style scoped lang="sass">
.items-container
  &__item
    background: #E8E8E8
    border-radius: 12px
    width: 30%
    height: fit-content
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
.container
  width: 100%
  padding: 0 20px
.alert
  color: red
</style>
