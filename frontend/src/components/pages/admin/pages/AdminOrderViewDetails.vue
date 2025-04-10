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


    <div class="main__basket-info-item-product-count" style="width: 100%; padding: 0 20px">
      <div v-for="(item, index) in selectedOrder.items" :key="item._id" class="main__basket-info-item-product" data-count="count-block" style="margin-bottom: 15px">
        <div style="display: flex; align-items: center; justify-content: flex-start; column-gap: 15px">
          <div class="main__basket-info-item-product-img" style="width: 50px; height: 50px; object-fit: contain; aspect-ratio: 1/1">
            <img :src="require(`@/assets/${item._id.photo ? item._id.photo : 'img/image-card-item7.png'}`)" alt="product image" style="height: 100%">
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
        <ui-delete-icon @remove="selectedOrder.items.length > 1 ? deleteItemFromBasket(item, index) : notify('В заказе должен быть хотябы 1 товар')"/>
      </div>
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
          <tr v-for="(item, index) in itemsList" :key="item._id">
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
              <img src="../../../../assets/img/add-30.png" alt="add icon" style="cursor: pointer" @click="updateItemsListInOrder(item)">
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
import {mapGetters} from "vuex";

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
     itemsList: [],
     isDisplayDialog: false,
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
      parseDeliveryValue: 'delivery/parseDeliveryValue',
      parsePaymentValue: 'delivery/parsePaymentValue'
    }),
  },
  methods: {

    notify(text) {
      this.message = text;
    },

    parseCheckedColors(color, itemId) {
      const currentItem = this.selectedOrder.items[itemId];

      const colorObject = currentItem._id.color.find(el => el.value === color);
      if (!colorObject) return '';

      return colorObject.text
    },
    changeCountAndPrice(index, quantity) {
      const updatedFinalPrice = quantity * this.selectedOrder.items[index]._id.price;

      this.selectedOrder.items[index].quantity = quantity;
      this.selectedOrder.items[index].price = updatedFinalPrice;

      const itemId = this.selectedOrder.items[index]._id._id;

      const updatedObject = {
        'price': updatedFinalPrice,
        'quantity': quantity,
        'totalPrice': this.selectedOrder.items.reduce((acc, curElem) => acc + +curElem.price, 0),
        'totalQuantity': this.selectedOrder.items.reduce((acc, curElem) => acc + +curElem.quantity, 0),
      }

      this.updateOrder(updatedObject, itemId);
    },
    async updateOrder(dataField, itemId) {

      try {
        const result = await fetch(`http://localhost:3000/api/orders/update/${this.selectedOrder._id}/${itemId}`, {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify(dataField),
          headers: {'Content-Type': 'application/json'}
        })
        const data = await result.json();
        console.log(data)
      } catch (error) {
        console.log('Update error', error)
      }
    },
    async deleteItemFromBasket(item, index) {
      this.message = '';
      try {
        const result = await fetch(`http://localhost:3000/api/orders/remove/${this.selectedOrder._id}/${item._id._id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
        const data = await result.json();
        if (!data.result) return false;
        this.selectedOrder.items.splice(index, 1)
      } catch (error) {
        console.log('Update error', error)
      }
    },
    async getItemsList() {
      this.isDisplayDialog = true
      try {
        const result = await fetch('http://localhost:3000/api/items')
        const data = await result.json();
        if (!data.result) return

        const list = this.selectedOrder.items.map(el => ({_id: el._id._id, checkedColor: el.checkedColor}))

        this.itemsList = data.items;

        list.forEach(element => {
          this.itemsList = this.itemsList
            .map(el => (
              el._id === element._id
                ? {...el, color: el.color.filter(color => color.value !== element.checkedColor)}
                : el
            ))
            .filter(el => el.color.length)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async updateItemsListInOrder(item) {
      const updatedItemsList = [...this.selectedOrder.items, { price: item.price, quantity: 1, _id: item , checkedColor: item.checkedColor}]
      console.log(updatedItemsList)
      try {
        const result = await fetch(`http://localhost:3000/api/orders/update/${this.selectedOrder._id}`, {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify({
            items: updatedItemsList
          }),
          headers: {'Content-Type': 'application/json'}
        })
        const data = await result.json();
        console.log(data)

        this.selectedOrder.items.push({ price: item.price, quantity: 1, _id: item , checkedColor: item.checkedColor })
        this.isDisplayDialog = false;

      } catch (error) {
        console.log('Update error', error)
      }
    },
    async initPage() {
      try {
        const result = await fetch(`http://localhost:3000/api/orders/${this.orderId}`, {
          method: 'GET',
          credentials: 'include',
        })

        const data = await result.json()
        console.log('order by id', data.data)
        this.selectedOrder = data.data

      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    await this.initPage()
  }

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
