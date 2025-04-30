<template>
	<div class="main__product-page-price-block-btn">
		<a
			href="#"
			@click.prevent="sortProducts"
		>
			Цена {{ desc ? '&#8595;' : '&#8593;' }}
		</a>
	</div>
</template>

<script>
export default {
	name: "uiSortButton.vue",
	props: {
		desc: {
			type: Boolean,
			default: false,
		},
		asc: {
			type: Boolean,
			default: false,
		},
		items: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			itemsList: []
		}
	},
	emits: ['updateItems'],
	methods: {
		sortProducts() {
			this.desc
				? this.$emit('updateItems', this.itemsList.sort((a, b) => b.price - a.price))
				: this.$emit('updateItems', this.itemsList.sort((a, b) => a.price - b.price));
		},
	},
	watch: {
		items(newValue) {
			this.itemsList = newValue;
		}
	}
}
</script>
