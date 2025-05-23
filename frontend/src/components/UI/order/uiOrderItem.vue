<template>
	<div class="main__user-page-content-story-container-items "  >
		<div class="main__user-page-content-story-container-items-flex">
			<div class="main__user-page-content-story-container-items-block left-block w-100">
				<div class="main__user-page-content-story-container-items-img order-image">
					<img :src="`/uploads/${item._id.photo}`" alt="image card">
				</div>
				<p class="main__user-page-content-story-container-items-name w-100">
					{{ item._id.name }}
					<span style="font-size: 0.8rem; font-weight: 400">
										( {{ parseCheckedColors(item.checkedColor, item) }} )
									</span>
				</p>
			</div>
			<div class="main__user-page-content-story-container-items-block right-block" style="column-gap: 50px">
				<p class="main__user-page-content-story-container-items-sum" style="min-width: fit-content">
					{{ item.quantity }} шт
				</p>
				<p class="main__user-page-content-story-container-items-price">
					{{ item.price }} грн
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "uiOrderItem.vue",
	props: {
		item: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		parseCheckedColors(color, item) {
			const colorObject = item._id.color.find(el => el.value === color);
			if (!colorObject) return '';

			return colorObject.text;
		},
	}
}
</script>

<style scoped lang="sass">
.order-image
	width: 100px
	object-fit: contain
	aspect-ratio: 1/1
</style>
