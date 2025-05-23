<template>
	<div class="dropdown__container">
		<ul>
			<li
				class="dropdown__item"
				v-for="item in dropdownList"
				:key="item"
				@click="handleClick(item.value)"
			>
				{{ item.text }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "uiDropdownComponent.vue",
	props: {
		isLiked: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			dropdownList: [
				{
					text: 'В избранное',
					value: 'favorites',
					id: 1
				},
				{
					text: 'Подробнее',
					value: 'details',
					id: 2
				},
				{
					text: 'В корзину',
					value: 'basket',
					id: 3
				},
			]
		}
	},
	emits: [
		'favorites',
		'details',
		'basket',
		'close'
	],
	methods: {
		handleClick(value) {
			if (['favorites', 'details', 'basket', 'close'].includes(value)) {
				this.$emit(value, true);
				this.$emit('close', false);
			}
		}
	},
	mounted() {
		if (this.isLiked) {
			this.dropdownList[0].text = 'Убрать из избранного';
		}
	}
}
</script>

<style scoped lang="sass">
.dropdown
	&__container
		position: absolute
		top: 20px
		right: 0
		padding: 10px 10px 0
		min-width: 150px
		border-radius: 4px
		background: linear-gradient(101.38deg, #e8b1b1 3.06%, #f3d6d6 85.68%)
		box-shadow: 1px 1px 5px rgba(66, 66, 66, 0.71)
	&__item
		padding: 6px 10px
		color: #424242
		margin-bottom: 10px
		&:not(:last-of-type)
			transition: color 0.3s ease-in-out 0s
			border-bottom: 1px solid #b9b9b9
		&:hover
			cursor: pointer
			color: #FFFFFF
</style>
