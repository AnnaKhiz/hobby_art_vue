<template>
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
</template>

<script>
import UiOrderItemsList from "@/components/UI/order/uiOrderItemsList.vue";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "uiOrderInfoItem.vue",
	components: { UiOrderItemsList },
	props: {
		userOrdersList: {
			type: Array,
			default: () => []
		},
		order: {
			type: Object,
			default: () => {}
		},
		index: {
			type: Number,
			default: 0
		}
	},
	emits: ['updateOrdersList', 'updateShow'],
	computed: {
		...mapGetters({
			orderItems: ('order/order'),
		}),
	},
	methods: {
		...mapActions({
			addNewOrder: 'order/addNewOrder',
		}),
		expandOrder(index) {
			this.$emit('updateShow', index);
		},

		async addNewOrderHandler(index) {
			const now = new Date(Date.now());
			const options = { timeZone: 'Europe/Kiev', hour12: false };
			this.date = now.toLocaleString('en-GB', options).replaceAll('/', '-');

			let newOrderCopy = { ...this.userOrdersList[index], date: this.date };

			delete newOrderCopy._id;
			newOrderCopy.isOrderCopy = true;
			await this.addNewOrder({ copy: true, body: newOrderCopy });

			this.$emit('updateOrdersList', this.orderItems);
		},
	}
}
</script>
