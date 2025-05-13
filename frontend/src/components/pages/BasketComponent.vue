<template>
  <main class="main" ref="basket">
    <div class="main__basket">
      <div class="container">
        <ui-breadcrumbs :link="getCheckedHeaderLink" />
        <section class="main__basket-info">
          <div class="main__basket-info-item user-info">
						<ui-new-order-form
							ref="newOrderForm"
							:is-sent="isSent"
							@update-delivery-info="handleDeliveryInfo"
							@update-order="handleUpdateOrder"
						/>
          </div>
          <div class="main__basket-info-item order-info">
            <h2 class="main__basket-info-item-label">
              Состав заказа
            </h2>

            <div v-if="order.items.length" class="main__basket-info-item-product-count">

              <div v-for="(item, index) in order.items" :key="item._id" class="main__basket-info-item-product" data-count="count-block">
                <div class="main__basket-info-item-product-img">
                  <img :src="`/uploads/${item.item.photo ? item.item.photo : 'no_image.png'}`" alt="product image">
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
                    {{ $store.state.order.order.totalPrice + (deliveryPrice !== 0 && order.items.length ? deliveryPrice - 25 : 0) }} грн
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
      <ui-notify-dialog v-if="display" :text="notifyMessage" :background="notifyStatus"/>
    </Transition>
  </main>
</template>


<script>
import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue";
import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
import UiDeleteIcon from "@/components/UI/icons/uiDeleteIcon.vue";
import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";
import UiNewOrderForm from "@/components/UI/forms/uiNewOrderForm.vue";
// import * as yup from 'yup';

export default {
  name: "BasketComponent",
  components: {UiNewOrderForm, UiNotifyDialog, UiQuantityCounter, UiDeleteIcon, UiBreadcrumbs},
  data() {
    return {
      display: false,
      order: {
        items: [],
      },
			isSent: false,
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
			basketComponent: null,
			notifyMessage: '',
			notifyStatus: 'var(--bg-color-banner)',
    }
  },
  computed: {
    ...mapState('order', ['order']),
    ...mapGetters({
			orderItems: ('order/order'),
			userInfo: ('user/userInfo'),
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
			paymentMethod: 'delivery/paymentMethod',
			deliveryMethods: 'delivery/deliveryMethods',
    }),
    deliveryPrice() {
      const deliveryObject = this.deliveryMethods.find(el => el.value === this.deliveryInfo.deliveryMethod);

      if(!deliveryObject) return;

      return deliveryObject.price
    },
  },
  methods: {
    ...mapMutations('order', [
			'updateOrder',
			'updateTotalQuantity',
			'updateTotalPrice',
			'clearOrder',
		]),
		...mapActions('order', ['addNewOrder']),
		...mapActions('user', ['getAuthUser']),
		handleUpdateOrder(value) {
			this.currentOrder = { ...value};
		},
		handleDeliveryInfo(value) {
			this.deliveryInfo = {...value};
		},
    parseCheckedColors(color, itemId) {
      const currentItem = this.order.items.find(el => el.item._id === itemId);

      const colorObject = currentItem.item.color.find(el => el.value === color);
      if (!colorObject) return;

      return colorObject.text
    },

    async sendOrder() {
			const validationResult = await this.$refs.newOrderForm.validation();
			if (!validationResult) return;

      this.currentOrder.deliveryInfo = {...this.deliveryInfo};
      const now = new Date(Date.now());
      const options = { timeZone: 'Europe/Kiev', hour12: false };
      const date = now.toLocaleString('en-GB', options).replaceAll('/', '-')

      this.currentOrder.date = date;
      this.currentOrder.totalPrice = this.$store.state.order.order.totalPrice;
      this.currentOrder.totalQuantity = this.$store.state.order.order.totalQuantity;
      this.currentOrder.items = this.$store.state.order.order.items.map(el => ( { _id: el.item._id, price : el.price, quantity: el.quantity, checkedColor: el.checkedColor } ));


			if (!this.currentOrder.items.length) {
				this.display = true;
				this.notifyMessage = 'Пустой заказ!';
				this.notifyStatus = 'var(--errorText)';
				return
			}
      console.log('current order', this.currentOrder)

      await this.addNewOrder({
				body: this.currentOrder
			});

      this.clearOrderInfo();
			this.scrollTop();
      this.display = true;
			this.notifyMessage = 'Заказ успешно отправлен!';
			this.notifyStatus = 'var(--bg-color-banner)';
    },

    clearOrderInfo() {
      this.order = {
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

			this.isSent = true;
      this.deliveryInfo = {
        deliveryMethod: 'novapost',
        paymentMethod: 'cash',
        receiver: {},
        address: {}
      };


      localStorage.removeItem('order');
      this.clearOrder()
    },
		// addEmptyAddress() {
		// 	this.deliveryInfo.address = {
		// 		city: '',
		// 		street: '',
		// 		house: '',
		// 		apartment: null,
		// 		zipCode: null,
		// 	};
		// 	this.deliveryInfo.receiver = {};
		// 	this.currentOrder.isMailing = false;
		// 	this.currentOrder.users = '';
		// },

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
    // async initPage() {
		// 	if (localStorage.getItem('auth') === 'true') {
		// 		try {
		// 			await this.getAuthUser();
		// 			this.user = this.userInfo;
		// 			console.log(this.user)
		// 			this.deliveryInfo.address = this.user.address || {};
		// 			this.deliveryInfo.receiver = this.user || {};
		// 			this.currentOrder.isMailing = this.user.mailing || false;
		// 			this.currentOrder.users = this.user._id || '';
		//
		// 		} catch (error) {
		// 			console.error('Error in getting user (basket):', error);
		// 			this.addEmptyAddress();
		// 		}
		//
		// 	} else {
		// 		this.addEmptyAddress();
		// 	}
    // },
		scrollTop() {
			this.basketComponent.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			})
		}
  },
 created() {
    if( localStorage.getItem('order') ) {
      this.order = JSON.parse(localStorage.getItem('order'));
			console.log(this.order)
      this.updateOrder(this.order) // ???
    }
  },
  async mounted() {
    // await this.initPage();
		this.basketComponent = this.$refs.basket.closest('div');
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
