<template>
  <div v-if="userOrdersList.length">

		<ui-order-info-container
			:user-orders-list="userOrdersList"
			@update-orders-list="handleUpdate"
			@update-show="handleExpand"
		/>

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
import UiOrderInfoContainer from "@/components/UI/order/uiOrderInfoContainer.vue";

export default {
  name: "userPageHistory",
  components: {UiOrderInfoContainer, UiNotifyDialog },
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
		...mapActions({
			addNewOrder: 'order/addNewOrder',
			getUserOrdersList: 'order/getUserOrdersList',
		}),
		handleUpdate(value) {
			this.userOrdersList.push(value);
		},
		handleExpand(index) {
			this.userOrdersList[index].show = !this.userOrdersList[index].show
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
