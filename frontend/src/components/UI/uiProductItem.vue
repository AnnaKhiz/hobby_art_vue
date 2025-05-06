<template>
	<div >
		<ui-product-item-header
			:is-item-liked="isLiked"
			@update-is-liked="handleLike"
		/>
		<div class="main__product-page-content-item-img">
			<a @click="$router.push(`${$router.currentRoute.value.href}/${item._id}`)" style="cursor: pointer">
				<img :src="require(`@/assets/${item.photo}`)" alt="card image">
			</a>
		</div>
		<div class="main__product-page-content-item-label">
			<a @click="$router.push(`${$router.currentRoute.value.href}/${item._id}${params}` )" style="cursor: pointer">{{ item.name }} </a>
		</div>
		<div class="main__product-page-content-item-color-variants" @click.stop="checkIsSelectedItemUsed">
			<ui-colors-icon
				:item="item"
				size="20"
				position="flex-start"
				@check="addCheckedColor"
			/>
		</div>
		<p style="min-height: 30px; font-size: 0.8rem; font-family: 'Montserrat'; overflow: hidden; padding: 10px 0">
        <span v-if="parseCheckedColors() && item.isSelectedItem && savedIndex === item._id" >
          <span style="font-weight: 600; line-height: 1.2rem">Выбранные цвета:</span> {{ parseCheckedColors() }}
        </span>
		</p>
		<div class="main__product-page-content-item-price">
			{{ item.price }} грн
		</div>
		<a
			class="main__product-page-content-item-btnBuy"
			style="cursor: pointer"
			@click.prevent="checkedColor.length ? addToBasket() : $emit('updateIsCheckedColorNotify', true);"
		>
			В корзину
		</a>
	</div>
</template>

<script>
import UiProductItemHeader from "@/components/UI/uiProductItemHeader.vue";
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
		params() {
			return this.checkedColor.length ? '?colors=' + this.checkedColor : '';
		},
		isLiked() {
			if (!this.isAuthorized) return false;
			return this.item.users.find(el => el._id._id === this.user._id)?.isFavorite;
		},
	},
	methods: {
		...mapMutations('order', ['addToOrder']),
		...mapMutations({
			setItems: 'items/setItems',
			updateIsSelectedItem: 'items/updateIsSelectedItem'
		}),
		...mapActions({
			fetchItems: 'items/fetchItems',
			getAuthUser: 'user/getAuthUser',
			userAddFavorite: 'user/userAddFavorite'
		}),

		async handleLike(value) {
			const body = { id: this.item._id, isLiked: value };
			await this.userAddFavorite(body);
		},
		checkIsSelectedItemUsed(event) {
			if (event.target.parentElement.id === this.item._id) {
				this.savedIndex = this.item._id;
				this.updateIsSelectedItem({ index: this.index, payload: true});
			} else {
				this.savedIndex = '';
				this.updateIsSelectedItem({ index: this.index, payload: false});
			}
			this.setItems(this.itemsList);
		},
		addCheckedColor(value) {
			if (this.savedIndex !== this.item._id) {
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
			const currentItem = this.itemsList.find(el => el._id === this.item._id);

			const colorObjects = currentItem.color.filter(el => this.checkedColor.includes(el.value));
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

