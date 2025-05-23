<template>
	<div >
		<ui-product-item-header
			:is-item-liked="defaultLike ? defaultLike : isLiked"
			@update-is-liked="handleLike"
			@open-details="openProductInfo"
			@update-basket="checkedColor.length ? addToBasket() : $emit('updateIsCheckedColorNotify', true);"
		/>
		<div class="main__product-page-content-item-img">
			<a @click="$router.push(routeImage)" style="cursor: pointer">
				<img :src="`/uploads/${item.photo}`" alt="card image">
			</a>
		</div>
		<div class="main__product-page-content-item-label">
			<a @click="$router.push(routeName)" style="cursor: pointer">{{ item.name }} </a>
		</div>
		<div class="main__product-page-content-item-color-variants" @click.stop="checkIsSelectedItemUsed">
			<ui-colors-icon
				:item="item"
				size="20"
				position="flex-start"
				@check="addCheckedColor"
			/>
		</div>
		<p
			v-if="showColorsList"
			class="checked-colors"
		>
        <span>
          <span style="font-weight: 600; line-height: 1.2rem">Выбранные цвета:</span> {{ parseCheckedColors() }}
        </span>
		</p>
		<div class="main__product-page-content-item-price">
			{{ item.price }} грн
		</div>
		<a
			class="main__product-page-content-item-btnBuy"
			style="cursor: pointer"
			@click.prevent="checkedColor.length ? addToBasket() : $emit('updateIsCheckedColorNotify', true)"
		>
			В корзину
		</a>
	</div>
</template>

<script>
import UiProductItemHeader from "@/components/UI/product/uiProductItemHeader.vue";
import UiColorsIcon from "@/components/UI/icons/uiColorsIcon.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
export default {
  name: "uiProductItem.vue",
	components: {UiProductItemHeader, UiColorsIcon},
	props: {
		item: {
			type: Object,
			default: () => {},
		},
		index: {
			type: [String, Number],
			default: 0,
		},
		itemId: {
			type: String,
			default: ''
		},
		defaultLike: {
			type: Boolean,
			default: false
		},
		isRecommended: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return{
			checkedColor: [],
			savedIndex: null,
			isItemLiked: false,
		}
	},
	emits: ['updateDisplay', 'updateIsCheckedColorNotify'],
	computed: {
		...mapState('items', ['itemsList']),
		...mapGetters({
			searchList: 'search/searchList',
			searchText: 'search/searchText',
			user: 'user/userInfo',
			isAuthorized: 'user/isAuthorized',
		}),
		routeImage() {
			return {
				name: 'product-page-details',
				params: {
					type: this.item.type.value,
					id: this.item._id
				}
			}
		},
		routeName() {
			return {
				name: 'product-page-details',
				params: {
					type: this.item.type.value,
					id: this.item._id,
				},
				query: {
					colors: this.checkedColor,
				}
			}
		},
		isLiked() {
			if (!this.isAuthorized) return false;
			return this.item.users.find(el => el._id._id === this.user._id)?.isFavorite;
		},
		showColorsList() {
			return this.parseCheckedColors() && this.item.isSelectedItem && this.savedIndex === this.itemId;
		}
	},
	methods: {
		...mapMutations('order', ['addToOrder']),
		...mapMutations({
			setItems: 'items/setItems',
			updateIsSelectedItem: 'items/updateIsSelectedItem',
			updateIsSelectedFavorite: 'user/updateIsSelectedItem',
			updateColorsInRecommended: 'items/updateColorsInRecommended'
		}),
		...mapActions({
			fetchItems: 'items/fetchItems',
			getAuthUser: 'user/getAuthUser',
			userAddFavorite: 'user/userAddFavorite'
		}),
		openProductInfo(event) {
			event ? this.$router.push(this.routeName) : false
		},
		async handleLike(value) {
			const body = { id: this.itemId, isLiked: value };
			await this.userAddFavorite(body);
		},
		updateSelected(data) {
			return this.isRecommended ? this.updateColorsInRecommended(data) :	this.updateIsSelectedItem(data);
		},
		checkIsSelectedItemUsed(event) {
			if (event.target.parentElement.id === this.itemId) {
				this.savedIndex = this.itemId;
				this.defaultLike
					? this.updateIsSelectedFavorite({ id: this.itemId, payload: true})
					: this.updateSelected({ index: this.index, payload: true});
			} else {
				this.savedIndex = '';
				this.defaultLike
					? this.updateIsSelectedFavorite({ id: this.itemId, payload: false})
					:	this.updateSelected({ index: this.index, payload: false});
			}
			this.setItems(this.itemsList);
		},
		addCheckedColor(value) {
			if (this.savedIndex !== this.itemId) {
				this.checkedColor = [];
				this.checkedColor.push(value);

			} else {

				if (this.checkedColor.includes(value)) {
					const index = this.checkedColor.findIndex(el => el === value);

					if (index === -1) return false;

					this.checkedColor.splice(index, 1);
				} else {
					this.checkedColor.push(value);
				}
			}
		},
		parseCheckedColors() {
			const currentItem = !this.itemsList.length
				? this.item
				: this.itemsList.find(el => el._id === this.itemId);

			const colorObjects = this.defaultLike
				? this.item.color.filter(el => this.checkedColor.includes(el.value))
				: currentItem.color.filter(el => this.checkedColor.includes(el.value));
			if (!colorObjects) return;

			return colorObjects.map(el => (el.text)).join(', ');
		},

		addToBasket() {
			this.$emit('updateIsCheckedColorNotify', false);
			this.checkedColor.forEach(el => {
				const orderItem = { quantity: 1, price: this.item.price, checkedColor: el, item: this.item };
				this.addToOrder(orderItem);
				this.checkedColor = [];
			})

			this.$emit('updateDisplay', true);
			this.savedIndex = null;
		},
	},
}
</script>
<style scoped lang="sass">
.checked-colors
	min-height: 30px
	font-size: 0.8rem
	overflow: hidden
	padding: 10px 0
</style>

