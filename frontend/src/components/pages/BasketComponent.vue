<template>
  <main class="main">
    <div class="main__basket" id="main-basket">
      <div class="container">
        <ui-breadcrumbs :link="getCheckedHeaderLink" />
        <section class="main__basket-info">
          <div class="main__basket-info-item user-info">

            <form action="#">
              <div class="main__basket-info-delivery">
                <h2 class="main__basket-info-delivery-label">
                  Способ получения
                </h2>
                <input
                  v-model="deliveryInfo.address.city"
                  type="text"
                  placeholder="Город"
                  style="width: 100%"
                >
                <div class="main__basket-info-delivery-method">
                  <select v-model="deliveryInfo.deliveryMethod" style="color: #424242">
                    <option
                      v-for="method in deliveryMethods"
                      :key="method"
                      :value="method.value"
                    >
                      {{ method.text }}
                    </option>
                  </select>
                </div>
                <div class="main__basket-info-delivery-subflex">
                  <input
                    v-model="deliveryInfo.address.street"
                    type="text"
                    placeholder="Улица"
                    id="street"
                  >
                  <input
                    v-model="deliveryInfo.address.house"
                    type="text"
                    placeholder="Дом"
                    id="house"
                  >
                  <input
                    v-model="deliveryInfo.address.apartment"
                    type="number"
                    placeholder="Квартира"
                    id="apartment"
                  >
                  <input
                    v-model="deliveryInfo.address.zipCode"
                    type="number"
                    placeholder="Индекс"
                    id="postcode"
                  >
                </div>
                <input
                  v-model="deliveryInfo.userComment"
                  type="text"
                  placeholder="Добавить комментарий"
                  id="comment"
                >
              </div>
              <div class="main__basket-info-user">
                <h2 class="main__basket-info-user-label">
                  Данные получателя
                </h2>
                <div class="main__basket-info-user-subflex">
                  <input
                    v-model="deliveryInfo.receiver.lastName"
                    type="text"
                    placeholder="Фамилия"
                    id="del-lastname"
                  >
                  <input
                    v-model="deliveryInfo.receiver.name"
                    type="text"
                    placeholder="Имя"
                    id="del-firstname"
                  >
                  <input
                    v-model="deliveryInfo.receiver.surName"
                    type="text"
                    placeholder="Отчество"
                    id="del-surname"
                  >
                </div>
                <input
                  v-model="deliveryInfo.receiver.phone"
                  type="tel"
                  placeholder="Номер телефона"
                  id="del-phone"
                >
                <p class="main__basket-info-user-text">
                  По этому номеру телефона мы с вяжемся с вами для подтверждения заказа
                </p>
                <input
                  v-model="deliveryInfo.receiver.email"
                  type="email"
                  placeholder="E-mail"
                  id="del-email"
                >
                <p class="main__basket-info-user-text">
                  На эту почту вам придет письмо с составом заказа, а так же трэк-номер для его отслеживания
                </p>

                <label for="subscribe-basket" class="main__basket-info-user-checkbox">
                  <input
                    v-model="deliveryInfo.receiver.isMailing"
                    type="checkbox"
                    id="subscribe-basket"
                    name="subscribed"
                  >
                  <span class="main__basket-info-user-checkbox-text">Подписаться на рассылку новинок и акций</span>
                </label>


              </div>
              <div class="main__basket-info-payment">
                <h2 class="main__basket-info-payment-label">
                  Способ оплаты
                </h2>
                <label
                  v-for="option in paymentMethod"
                  :key="option"
                  :for="option.value"
                  class="main__basket-info-payment-radio-btn"
                  style="margin-bottom: 20px"
                >
                  <input
                    v-model="deliveryInfo.paymentMethod"
                    type="radio"
                    name="payment"
                    :value="option.value"
                    style="margin-bottom: 0;"
                  >
                  <span class="main__basket-info-payment-radio-text">{{ option.text }}</span>
                </label>
              </div>
            </form>
          </div>
          <div class="main__basket-info-item order-info">
            <h2 class="main__basket-info-item-label">
              Состав заказа
            </h2>

            <div v-if="orders.items.length" class="main__basket-info-item-product-count">

              <div v-for="(item, index) in orders.items" :key="item._id" class="main__basket-info-item-product" data-count="count-block">
                <div class="main__basket-info-item-product-img">
                  <img :src="require(`@/assets/${item.item.photo ? item.item.photo : 'img/image-card-item7.png'}`)" alt="product image">
                </div>
                <p class="main__basket-info-item-product-name">
                  {{ item.item.name }}
                </p>
                <p class="main__basket-info-item-product-name" style="font-size: 0.8rem; font-weight: 400">
                  ({{ parseCheckedColors(item.checkedColor, item.item._id) }})
                </p>
                <ui-quantity-counter @input="countPrice(index, $event)" :order-count="item.quantity"/>
                <p class="main__basket-info-item-product-price" data-price="basket-item-price">
                  {{ item.price }} грн
                </p>
                <ui-delete-icon @remove="deleteItemFromBasket(index)"/>
              </div>
            </div>

            <div v-else class="empty-basket">
              Корзина пуста
            </div>
            <div class="main__basket-info-item-order">
              <h2 class="main__basket-info-item-order-label">
                Промокод
              </h2>
              <div class="main__basket-info-item-order-promo">
                <input type="text" placeholder="Промокод" id="promo" name="promokod">
                <button>Активировать</button>
              </div>
              <p class="main__basket-info-item-order-text">
                У вас есть промокод? Активируйте его
              </p>
              <div class="main__basket-info-item-order-bonuses">
                <p class="main__basket-info-item-order-bonuses-text">
                  Доступно для списания: <span>25 бонусов</span>
                </p>
                <a href="" class="main__basket-info-item-order-bonuses-link">Использовать</a>
              </div>
              <div class="main__basket-info-item-order-total">
                <div class="main__basket-info-item-order-total-item">
                  <p class="main__basket-info-item-order-total-item-text">
                    Товары, <span> {{ $store.state.order.order.totalQuantity }} </span> шт
                  </p>
                  <p class="main__basket-info-item-order-total-item-sum" id="total-sum">

                  </p>
                </div>
                <div class="main__basket-info-item-order-total-item">
                  <p class="main__basket-info-item-order-total-item-text">
                    Доставка
                  </p>
                  <p class="main__basket-info-item-order-total-item-sum" id="delivery-price">
                    {{ deliveryPrice !== 0 ? `${deliveryPrice} грн` : "Бесплатно" }}
                  </p>
                </div>
                <div class="main__basket-info-item-order-total-item">
                  <p class="main__basket-info-item-order-total-item-text">
                    Списание бонусов
                  </p>
                  <p class="main__basket-info-item-order-total-item-sum" id="discount">
                    -25 грн
                  </p>
                </div>
                <div class="main__basket-info-item-order-total-item total">
                  <p class="main__basket-info-item-order-total-item-desc">
                    Вам будет начислено:
                    <span class="basket-bonuses">51 бонус</span>
                  </p>
                  <p class="main__basket-info-item-order-total-item-final" id="total-sum-discount">
                    {{ $store.state.order.order.totalPrice + (deliveryPrice !== 0 && orders.items.length ? deliveryPrice - 25 : 0) }} грн
                  </p>
                </div>
              </div>
              <div class="main__basket-info-item-order-submit">
                <a
                  @click.prevent="sendOrder"
                  class="main__basket-info-item-order-submit-link"
                  id="send-order"
                  style="cursor: pointer"
                >
                  Оформить заказ
                </a>
                <p class="main__basket-info-item-order-submit-text">
                  Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!--   dialogs -->
    <Transition name="fade">
      <ui-notify-dialog v-if="display" text="Заказ успешно отправлен!"/>
    </Transition>
  </main>
</template>


<script>
import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue";
import {mapGetters, mapMutations, mapState} from "vuex";
import UiDeleteIcon from "@/components/UI/icons/uiDeleteIcon.vue";
import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";

export default {
  name: "BasketComponent",
  components: {UiNotifyDialog, UiQuantityCounter, UiDeleteIcon, UiBreadcrumbs},
  data() {
    return {
      display: false,
      orders: {
        items: [],
      },

      currentOrder: {
        date: '',
        dateCompleted:'',
        totalPrice: '',
        totalQuantity: '',
        deliveryInfo: {
          address: {}
        },
        isMailing: false
      },
      deliveryInfo: {
        address: {},
        deliveryMethod: 'novapost',
        paymentMethod: 'cash',
        receiver: {},
      },
      user: {},
      // userAddress: {},
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
    ...mapState('order', ['order']),
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
    }),
    deliveryPrice() {
      const deliveryObject = this.deliveryMethods.find(el => el.value === this.deliveryInfo.deliveryMethod);

      if(!deliveryObject) return;

      return deliveryObject.price
    },
    // address() {
    //   const { city, street, house, apartment, postcode } = this.userAddress;
    //   if (!city || !street || !house || !apartment || !postcode) return false;
    //   return `Город: ${city}, ул. ${street}, дом ${house}, кв. ${apartment}. Индекс ${postcode}`
    // },
    // fullName() {
    //   const { name, lastname, surname } = this.user;
    //   if (!name || !lastname || !surname) return false;
    //   return `${lastname} ${name} ${surname}`
    // }

  },
  methods: {
    ...mapMutations('order', ['updateOrders', 'updateTotalQuantity', 'updateTotalPrice', 'clearOrder']),
    parseCheckedColors(color, itemId) {
      const currentItem = this.orders.items.find(el => el.item._id === itemId);

      const colorObject = currentItem.item.color.find(el => el.value === color);
      if (!colorObject) return;

      return colorObject.text
    },

    async sendOrder() {
      // this.deliveryInfo.receiver.fullName = this.fullName;
      // this.deliveryInfo.fullAddress = this.address;

      this.currentOrder.deliveryInfo = {...this.deliveryInfo};

      this.currentOrder.date = Date.now();
      this.currentOrder.totalPrice = this.$store.state.order.order.totalPrice;
      this.currentOrder.totalQuantity = this.$store.state.order.order.totalQuantity;
      this.currentOrder.items = this.$store.state.order.order.items.map(el => ( { _id: el.item._id, price : el.price, quantity: el.quantity, checkedColor: el.checkedColor } ));

      // console.log(this.currentOrder)

      await this.addNewOrder();

      this.clearOrderInfo();
      this.display = true;
    },

    clearOrderInfo() {
      this.orders = {
        items: [],
      };

      this.currentOrder = {
        date: '',
        dateCompleted:'',
        totalPrice: '',
        totalQuantity: '',
        deliveryInfo: {},
        isMailing: false,
        users: ''
      };

      this.deliveryInfo = {
        deliveryMethod: 'novapost',
        paymentMethod: 'cash',
        receiver: {},
        address: {}
      };
      // this.user = {};
      // this.userAddress = {};

      localStorage.removeItem('order');
      this.clearOrder()
    },

    async addNewOrder() {
      const result = await fetch('http://localhost:3000/api/orders/add', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.currentOrder),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await result.json();

      console.log(response)
    },
    countPrice(index, quantity) {
      this.$store.state.order.order.items[index].quantity = quantity;
      const price = this.$store.state.order.order.items[index].item.price;
      this.$store.state.order.order.items[index].price = price * quantity;

      this.updateStore();
    },
    deleteItemFromBasket(index) {
      this.$store.state.order.order.items.splice(index, 1)

      this.updateStore();
    },
    updateStore() {
      this.updateTotalQuantity();
      this.updateTotalPrice();

      localStorage.setItem('order', JSON.stringify(this.$store.state.order.order))
    },
    async getUser() {
      const result = await fetch(`http://localhost:3000/user`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await result.json()

      if (!data.result) {
        // console.log('no requested result')
        // this.$router.back()
        // await this.getAdmin()
      } else {
        // this.setIsAuthorizedInfo(true);

        this.user = await data.user[0]
        // this.$router.push(`/user_page/${this.user._id}`);
        return this.user
      }
    }
  },
 created() {
    if( localStorage.getItem('order') ) {
      this.orders = JSON.parse(localStorage.getItem('order'));
      this.updateOrders(this.orders)
    }
  },
  async mounted() {
    if (localStorage.getItem('auth') === 'true') {
      await this.getUser()
      this.deliveryInfo.address = this.user.address
      this.deliveryInfo.receiver = this.user
      this.currentOrder.isMailing = this.user.mailing
      this.currentOrder.users = this.user._id
    }
  },
  watch: {
    display(val) {
      if (val) {
        setTimeout(() => {
          this.display = false
        }, 2000)
      }
    }
  }

}
</script>



<style scoped lang="sass">
.empty-basket
  font: 400 normal 1rem/1rem 'Montserrat'
  height: 100px
  padding: 30px 20px
  text-align: center
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.8s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
