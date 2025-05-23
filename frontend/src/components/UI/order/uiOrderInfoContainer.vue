<template>
	<div
		v-for="(order, index) in userOrdersList"
		:key="order._id"
		class="main__user-page-content-story-container"
	>
		<ui-order-info-item
			:order="order"
			:index="index"
			:user-orders-list="userOrdersList"
			@update-show="handleShow"
			@update-orders-list="handleUpdate"
		/>
	</div>
</template>

<script>
import UiOrderInfoItem from "@/components/UI/order/uiOrderInfoItem.vue";

export default {
	name: "uiOrderInfoContainer.vue",
	components: { UiOrderInfoItem },
	props: {
		userOrdersList: {
			type: Array,
			default: () => []
		}
	},
	emits: ['updateOrder', 'updateShowValue'],
	methods: {
		handleShow(index) {
			this.$emit('updateShowValue', index);
		},
		handleUpdate(value) {
			this.$emit('updateOrder', value);
		}
	}
}
</script>
