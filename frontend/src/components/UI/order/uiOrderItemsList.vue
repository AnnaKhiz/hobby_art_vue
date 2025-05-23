<template>
	<div
		v-for="item in order?.items"
		:key="item._id"
		class="main__user-page-content-story-container-block "
		:class="{ 'non-visible' : !order.show }"
	>
		<ui-order-item :item="item" />
	</div>
</template>

<script>
import UiOrderItem from "@/components/UI/order/uiOrderItem.vue";

export default {
	name: "uiOrderItemsList.vue",
	components: { UiOrderItem },
	props: {
		order: {
			type: Object,
			default: () => {}
		}
	}
}
</script>
