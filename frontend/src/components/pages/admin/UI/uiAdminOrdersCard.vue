<template>
  <div v-if="!orders.length">
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
      <h3  class="item-row"><span class="label">Заказ №: </span> {{index + 1}}</h3>
    </div>
    <div class="content">
      <p class="item-row"><span class="label">Стоимость: </span> {{order.totalPrice}} ₽</p>
      <p class="item-row"><span class="label">Количество товаров: </span> {{order.totalQuantity}}</p>
      <p class="item-row"><span class="label">Заказчик: </span> {{order.deliveryInfo.receiver.fullName}}</p>
      <p class="item-row"><span class="label">Способ доставки: </span> {{ parseDeliveryValue(order.deliveryInfo.deliveryMethod) }}</p>
      <p class="item-row"><span class="label">Способ оплаты: </span> {{ parsePaymentValue(order.deliveryInfo.paymentMethod) }}</p>
      <p class="item-row"><span class="label">Комментарий пользователя: </span> {{order.deliveryInfo.userComment}}</p>
    </div>

    <div class="actions">
      <button class="button" @click.prevent="showOrderDetails(order, index + 1)">Подробнее</button>
      <button class="button" @click.prevent="removeOrder(order._id, index)">Удалить</button>
    </div>
  </div>


  <div v-if="isShowDetails" class="items-container__item" style="width: 100%; padding: 0">
    <ui-table-content
      :items="selectedOrder ? tableItems : []"
      :delivery-methods="deliveryMethods"
      :payment-method="paymentMethod"
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
        </div>

        <ui-quantity-counter @input="changeCountAndPrice(index, $event)" :order-count="item.quantity"/>
        <p class="main__basket-info-item-product-price" data-price="basket-item-price">
          {{ item.price }} ₽
        </p>
        <ui-delete-icon @remove="selectedOrder.items.length > 1 ? deleteItemFromBasket(item, index) : notify('В заказе должен быть хотябы 1 товар')"/>
      </div>
    </div>

    <button class="button" @click="addItemToOrder(item, index)" style="padding-left: 20px">Добавить товар</button>
    <div class="button-container">
      <button class="button" @click="isShowDetails = false">Назад</button>
      <h2 class="notify-message">{{message}}</h2>
    </div>


    <!--  DIALOG add products to order  -->
    <ui-modal-template :value="isDisplayDialog" @input="isDisplayDialog = $event">

      <template #tableData>
        <p>content +++</p>
      </template>


    </ui-modal-template>
  </div>

</template>

<script>
import UiTableContent from "@/components/pages/admin/UI/table/uiTableContent.vue"
import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";
import UiDeleteIcon from "@/components/UI/icons/uiDeleteIcon.vue";
import UiModalTemplate from "@/components/UI/modal/uiModalTemplate.vue";

export default {
  name: "uiAdminOrdersCard.vue",
  components: {UiModalTemplate, UiDeleteIcon, UiQuantityCounter, UiTableContent},
  data() {
    return {
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
      ]
    }
  },
  computed: {
    tableItems() {
      return [
        { text: 'Заказ №', value: this.selectedOrder.index || 0, name: 'title', id: this.selectedOrder._id},
        { text: 'Получатель', value: this.selectedOrder.deliveryInfo.receiver.fullName, name: 'receiver' },
        { text: 'Телефон', value: this.selectedOrder.deliveryInfo.receiver.phone, name: 'phone' },
        { text: 'E-mail', value: this.selectedOrder.deliveryInfo.receiver.email, name: 'email'  },
        { text: 'Адресс доставки', value: this.selectedOrder.deliveryInfo.fullAddress, name: 'address'  },
        { text: 'Комментарий', value: this.selectedOrder.deliveryInfo.userComment, name: 'comment'  },
        { text: 'Способ доставки', value: this.selectedOrder.deliveryInfo.deliveryMethod, name: 'deliveryMethod'  },
        { text: 'Способ оплаты', value: this.selectedOrder.deliveryInfo.paymentMethod, name: 'paymentMethod'  },

      ]
    },
  },
  methods: {
    notify(text) {
      this.message = text;
    },
    showOrderDetails(order, index) {
      this.message = ''
      this.isShowDetails = true
      order.index = index;
      this.selectedOrder = order;
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


    addItemToOrder(item, index) {
      this.isDisplayDialog = true

      console.log(item, index)
    },

    async getItemsList() {
      try {
        const result = await fetch('http://localhost:3000/api/items')
        const data = await result.json();
        if(!data.result) return
        this.itemsList = data.items

      } catch (error) {
        console.log(error)
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
    async initPage() {
      try {
        const result = await fetch(`http://localhost:3000/api/orders`, {
          method: 'GET'
        })

        const data = await result.json();

        if (!data.result) return;

        this.orders = data.orders

        // this.$emit('update', id)

        console.log('get orders result', data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.initPage();

  }
}
</script>



<style scoped lang="sass">
.items-container
  &__item
    background: #E8E8E8
    border-radius: 12px
    width: 30%
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
</style>
