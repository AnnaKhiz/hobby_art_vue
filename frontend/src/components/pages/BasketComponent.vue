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
                <input type="text" placeholder="Город" id="city">
                <div class="main__basket-info-delivery-method">
                  <select id="del-method" name="del-method" >
                    <option value="nova">Новая почта</option>
                    <option value="ukr">Укрпочта</option>
                    <option value="samovivoz">Самовывоз</option>
                  </select>
                </div>

                <div class="main__basket-info-delivery-subflex">
                  <input type="text" placeholder="Улица" id="street">
                  <input type="text" placeholder="Дом" id="house">
                  <input type="text" placeholder="Квартира" id="apartment">
                  <input type="text" placeholder="Индекс" id="code">
                </div>
                <input type="text" placeholder="Добавить комментарий" id="comment">
              </div>
              <div class="main__basket-info-user">
                <h2 class="main__basket-info-user-label">
                  Данные получателя
                </h2>
                <div class="main__basket-info-user-subflex">
                  <input type="text" placeholder="Фамилия" id="del-lastname">
                  <input type="text" placeholder="Имя" id="del-firstname">
                  <input type="text" placeholder="Отчество" id="del-surname">
                </div>
                <input type="tel" placeholder="Номер телефона" id="del-phone">
                <p class="main__basket-info-user-text">
                  По этому номеру телефона мы с вяжемся с вами для подтверждения заказа
                </p>
                <input type="email" placeholder="E-mail" id="del-email">
                <p class="main__basket-info-user-text">
                  На эту почту вам придет письмо с составом заказа, а так же трэк-номер для его отслеживания
                </p>

                <label for="subscribe-basket" class="main__basket-info-user-checkbox">
                  <input type="checkbox" id="subscribe-basket" name="subscribed">
                  <span class="main__basket-info-user-checkbox-text">Подписаться на рассылку новинок и акций</span>
                </label>


              </div>
              <div class="main__basket-info-payment">
                <h2 class="main__basket-info-payment-label">
                  Способ оплаты
                </h2>
                <label for="cash" class="main__basket-info-payment-radio-btn">
                  <input type="radio" value="cash" name="payment" id="cash" >
                  <span class="main__basket-info-payment-radio-text">Оплата при получении наличными или картой</span>
                </label>
                <label for="online" class="main__basket-info-payment-radio-btn">
                  <input type="radio" value="online" name="payment" id="online" checked >
                  <span class="main__basket-info-payment-radio-text">Оплата банковской картой онлайн</span>
                </label>
              </div>
            </form>
          </div>
          <div class="main__basket-info-item order-info">
            <h2 class="main__basket-info-item-label">
              Состав заказа
            </h2>
            <div class="main__basket-info-item-product-count">
              <div v-for="(item, index) in order.items" :key="item._id" class="main__basket-info-item-product" data-count="count-block">
                <div class="main__basket-info-item-product-img">
                  <img :src="require(`@/assets/${item.item.photo ? item.item.photo : 'img/image-card-item7.png'}`)" alt="product image">
                </div>
                <p class="main__basket-info-item-product-name">
                  {{ item.name }}
                </p>
                <ui-quantity-counter @input="countPrice(index, $event)" :order-count="item.quantity"/>
                <p class="main__basket-info-item-product-price" data-price="basket-item-price">
                  {{ item.price }} ₽
                </p>
                <ui-delete-icon />

              </div>

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
                    Товары, <span id="count-products"></span> шт
                  </p>
                  <p class="main__basket-info-item-order-total-item-sum" id="total-sum">

                  </p>
                </div>
                <div class="main__basket-info-item-order-total-item">
                  <p class="main__basket-info-item-order-total-item-text">
                    Доставка
                  </p>
                  <p class="main__basket-info-item-order-total-item-sum" id="delivery-price">
                    254 ₽
                  </p>
                </div>
                <div class="main__basket-info-item-order-total-item">
                  <p class="main__basket-info-item-order-total-item-text">
                    Списание бонусов
                  </p>
                  <p class="main__basket-info-item-order-total-item-sum" id="discount">
                    -25 ₽
                  </p>
                </div>
                <div class="main__basket-info-item-order-total-item total">
                  <p class="main__basket-info-item-order-total-item-desc">
                    Вам будет начислено:
                    <span class="basket-bonuses">51 бонус</span>
                  </p>
                  <p class="main__basket-info-item-order-total-item-final" id="total-sum-discount">

                  </p>
                </div>
              </div>
              <div class="main__basket-info-item-order-submit">
                <a href="" class="main__basket-info-item-order-submit-link" id="send-order">
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
  </main>
</template>


<script>
import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue";
import {mapGetters, mapMutations, mapState} from "vuex";
import UiDeleteIcon from "@/components/UI/icons/uiDeleteIcon.vue";
import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";

export default {
  name: "BasketComponent",
  components: {UiQuantityCounter, UiDeleteIcon, UiBreadcrumbs},
  data() {
    return {

    }
  },
  computed: {
    ...mapState('order', ['order']),
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',

    }),

  },
  methods: {
    ...mapMutations('order', ['updateOrders', 'updateTotalQuantity', 'updateTotalPrice']),
    countPrice(index, quantity) {
      this.$store.state.order.order.items[index].quantity = quantity;
      const price = this.$store.state.order.order.items[index].item.price;
      this.$store.state.order.order.items[index].price = price * quantity;

      this.updateTotalQuantity();
      this.updateTotalPrice();

      localStorage.setItem('order', JSON.stringify(this.$store.state.order.order))
    }
  },
  mounted() {
    if( localStorage.getItem('order') ) {
      const orders = JSON.parse(localStorage.getItem('order'));
      this.updateOrders(orders)
    }
  },
  // watch: {
  //   order(value) {
  //     console.log(value)
  //     this.order.items.forEach((el, index) => {
  //       const price = el.price / el.quantity
  //       console.log(price)
  //       this.$store.state.order.order.items[index].price = price * el.quantity
  //     })
  //   },
  //
  // }
}
</script>



<style scoped lang="sass">

</style>
