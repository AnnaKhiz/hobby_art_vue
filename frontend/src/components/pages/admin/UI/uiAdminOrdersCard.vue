<template>
  <div
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
      <button class="button" @click.prevent="showOrderDetails(order)">Подробнее</button>
      <button class="button" @click.prevent="removeItem(item._id)">Удалить</button>
    </div>
  </div>


  <div v-if="isShowDetails">
    <ui-table-content
      :items="selectedOrder ? tableItems : []"
    >
      <template #deliveryMethod="{item}">
        {{ parseDeliveryValue(item.value) }}
      </template>

      <template #paymentMethod="{item}">
        {{ parsePaymentValue(item.value) }}
      </template>
    </ui-table-content>
<!--    <code>selectedOrder.items: {{selectedOrder.items}}</code>-->

    <div class="main__basket-info-item-product-count">
      <div v-for="(item, index) in selectedOrder.items" :key="item._id" class="main__basket-info-item-product" data-count="count-block">
        <div class="main__basket-info-item-product-img">
          <img :src="require(`@/assets/${item._id.photo ? item._id.photo : 'img/image-card-item7.png'}`)" alt="product image">
        </div>
        <p class="main__basket-info-item-product-name">
          {{ item.name }}
        </p>
        <ui-quantity-counter @input="countPrice(index, $event)" :order-count="item.quantity"/>
        <p class="main__basket-info-item-product-price" data-price="basket-item-price">
          {{ item.price }} ₽
        </p>
        <ui-delete-icon @remove="deleteItemFromBasket(index)"/>
      </div>
    </div>

    <button class="button" @click="isShowDetails = false">Назад</button>
  </div>

</template>

<script>
import UiTableContent from "@/components/pages/admin/UI/table/uiTableContent.vue"
import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";
import UiDeleteIcon from "@/components/UI/icons/uiDeleteIcon.vue";

export default {
  name: "uiAdminOrdersCard.vue",
  components: {UiDeleteIcon, UiQuantityCounter, UiTableContent},
  data() {
    return {
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
        { text: 'Получатель', value: this.selectedOrder.deliveryInfo.receiver.fullName, name: 'receiver' },
        { text: 'Телефон', value: this.selectedOrder.deliveryInfo.receiver.phone, name: 'phone' },
        { text: 'E-mail', value: this.selectedOrder.deliveryInfo.receiver.email, name: 'email'  },
        { text: 'Адресс доставки', value: this.selectedOrder.deliveryInfo.fullAddress, name: 'address'  },
        { text: 'Способ доставки', value: this.selectedOrder.deliveryInfo.deliveryMethod, name: 'deliveryMethod'  },
        { text: 'Способ оплаты', value: this.selectedOrder.deliveryInfo.paymentMethod, name: 'paymentMethod'  },
        { text: 'Комментарий', value: this.selectedOrder.deliveryInfo.userComment, name: 'comment'  },
      ]
    },
  },
  methods: {
    showOrderDetails(order) {
      this.isShowDetails = true
      this.selectedOrder = order;
    },

    countPrice(index, quantity) {
      console.log(index, quantity)
      // this.$store.state.order.order.items[index].quantity = quantity;
      // const price = this.$store.state.order.order.items[index].item.price;
      // this.$store.state.order.order.items[index].price = price * quantity;

      // this.updateStore();
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
    this.initPage()
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
.hidden
  display: none

</style>
