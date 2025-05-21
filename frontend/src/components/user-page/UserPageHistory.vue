<template>
  <div v-if="userOrdersList.length">
    <div v-for="(order, index) in userOrdersList" :key="order._id" class="main__user-page-content-story-container" >
      <div>
        <div class="main__user-page-content-story-container-flex">
          <div class="main__user-page-content-story-block">
            <p class="main__user-page-content-story-desc">
              {{ order.isOrderCopy ? 'КОПИЯ ' : '' }}Заказ № {{ order._id }} от {{ order.date }}
            </p>
            <p class="main__user-page-content-story-desc">
              {{ order.totalQuantity}} товара на сумму {{ order.totalPrice }} грн
            </p>
            <a href="" class="main__user-page-content-story-link" @click.prevent="expandOrder(index)">
              <span >Подробнее о заказе</span>
							<img
								src="@/assets/img/arrow-down.svg"
								alt="arrow-down icon"
								:style="`${order.show ? 'transform: rotate(180deg)' : 'transform: rotate(0)'}`"
							>
            </a>
          </div>
          <div class="main__user-page-content-story-block block-right">
            <p class="main__user-page-content-story-desc right-block">
              <span>Статус:</span>
                {{ order.dateCompleted !== '' ? order.dateCompleted : 'В работе' }}
            </p>

            <a href="" class="main__user-page-content-story-repeat-link" @click.prevent="addNewOrderHandler(index)">
              Повторить заказ
            </a>
          </div>

        </div>
				<!--      order list block -->
        <ui-order-items-list :order="order" />
      </div>

    </div>

    <!--  dialog notify -->
    <Transition name="fade">
      <ui-notify-dialog v-if="showNotify" text="Копия заказа создана!"/>
    </Transition>
  </div>
  <div v-else>
    <h3 style="font-family: 'Montserrat'">У вас еще нет ни одного заказа.</h3>
  </div>

</template>

<script>
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";
import { mapActions, mapGetters } from "vuex";
import UiOrderItemsList from "@/components/UI/order/uiOrderItemsList.vue";

export default {
  name: "userPageHistory",
  components: { UiOrderItemsList, UiNotifyDialog },
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showNotify: false,
      show: false,
      userOrdersList: [],
      date: '',
    }
  },
	computed: {
		...mapGetters({
			orderItems: ('order/order'),
			ordersList: ('order/ordersList'),
		}),
	},
  methods: {
		...mapActions('order', ['addNewOrder', 'getUserOrdersList']),

    expandOrder(index) {
      this.userOrdersList[index].show = !this.userOrdersList[index].show
    },

    async addNewOrderHandler(index) {
      const now = new Date(Date.now());
      const options = { timeZone: 'Europe/Kiev', hour12: false };
      this.date = now.toLocaleString('en-GB', options).replaceAll('/', '-');

      let newOrderCopy = { ...this.userOrdersList[index], date: this.date };

      delete newOrderCopy._id;
			newOrderCopy.isOrderCopy = true;
			await this.addNewOrder({ copy: true, body: newOrderCopy })

      this.userOrdersList.push(this.orderItems);
    },

    async initPage() {
			await this.getUserOrdersList(this.user._id);

      this.userOrdersList = this.ordersList.map(el => ({...el, show: false}));
    },
  },
  async mounted() {
    await this.initPage();
  }
}
</script>
<style scoped lang="sass">

</style>
