<template>
	<div v-if="recommendedItemsList.length" class="main__product-details-recommend-flex align-stretch" >
		<ui-product-item
			v-for="(item, index) in recommendedItemsList"
			:item="item"
			:key="item._id"
			:itemId="item._id"
			:index="index"
			is-recommended
			class="main__product-page-content-item shadow"
			@update-is-checked-color-notify="handleCheckedColorNotify"
			@update-display="handleDisplayState"
		/>
	</div>
	<div v-else >Похожие товары не найдены</div>

	<!--   dialogs -->
	<Transition name="fade">
		<ui-notify-dialog v-if="display" />
	</Transition>

	<Transition name="fade">
		<ui-notify-dialog v-if="isCheckedColorNotify" text="Выберите цвет!" background="#ff0000" textColor="white" weight="600"/>
	</Transition>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UiProductItem from "@/components/UI/uiProductItem.vue"
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";

export default {
	name: "uiRecommendedList.vue",
	components: {UiNotifyDialog, UiProductItem },
	props: {
		isUpdate: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isCheckedColorNotify: false,
			display: false,
		}
	},
	emits: ['update'],
	computed: {
		...mapGetters({
			recommendedItemsList: 'items/recommendedItemsList',
		})
	},
	methods: {
		...mapActions({
			fetchRecommendedItems: 'items/fetchRecommendedItems',
		}),
		handleDisplayState(value) {
			this.display = value;
			console.log(value)
		},
		handleCheckedColorNotify(value) {
			this.isCheckedColorNotify = value;
		},
	},
	async mounted() {
		await this.fetchRecommendedItems({
			id: this.$route.params?.id,
			type: this.$route.params?.type
		})
	},
	watch: {
		isUpdate: {
			async handler(newVal) {
				console.log('updated', newVal)
				await this.fetchRecommendedItems({
					id: this.$route.params?.id,
					type: this.$route.params?.type
				})

				this.$emit('update', false);
			}
		},
		display(val) {
			if (val) {
				setTimeout(() => {
					this.display = false;
				}, 2000)
			}
		},

		isCheckedColorNotify(val) {
			if (val) {
				setTimeout(() => {
					this.isCheckedColorNotify = false;
				}, 2000)
			}
		},
	}
}
</script>



<style scoped lang="sass">
.shadow
	box-shadow: 1px 1px 5px rgba(66, 66, 66, 0.71)
</style>
