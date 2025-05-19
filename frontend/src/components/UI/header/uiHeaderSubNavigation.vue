<template>
	<div class="header__menu-subitem">
		<ui-search-form />
		<button
			class="header__menu-enterButton elem-sub"
			@click.prevent="checkFunction"
		>
			{{ userPageLabel }}
		</button>

		<button
			v-if="isAuthorized"
			class="header__menu-favoriteButton favorite-count count-elem elem-sub"
			@click="goToFavorite"
		>
			Избранное
		</button>
		<button
			class="header__menu-basketButton elem-sub basket-count count-elem"
			@click="$router.push({name: 'basket'})"
		>
			Корзина
		</button>
	</div>
</template>

<script>
import UiSearchForm from "@/components/UI/forms/uiSearchForm.vue";
import {
	mapActions,
	mapGetters,
	mapMutations
} from "vuex";
import { checkFunction, getUser } from "@/services/handleLogInDialog";

export default {
	name: "uiHeaderSubNavigation.vue",
	components: {UiSearchForm},
	emits: ['updateUser'],
	data() {
		return {
			basketQuantity: 0,
			displayDialog: false,
			isFavorite: false,
			checkFunction,
			getUser
		}
	},
	computed: {
		...mapGetters({
			favoritesCount: 'user/favoritesCount',
			totalQuantity: 'order/totalQuantity',
			order: 'order/order',
			isAuthorized: 'user/isAuthorized',
		}),
		userPageLabel() {
			return this.isAuthorized ? 'Кабинет' : 'Войти';
		},
	},
	methods: {
		...mapMutations({
			setIsAuthorizedInfo: 'user/setIsAuthorizedInfo',
			setIsRegisteredInfo: 'user/setIsRegisteredInfo',
			setDisplayDialogState: 'dialog/setDisplayDialogState',
		}),
		...mapActions({
			getAuthUser: 'user/getAuthUser',
		}),
		async goToFavorite() {
			this.isFavorite = true;
			await this.getUser(true);
		},
	},
	mounted() {
		setTimeout(() => {
			this.basketQuantity = this.order.totalQuantity;
			document.documentElement.style.setProperty('--favorite-count', `"${ this.favoritesCount || 0 }"`);
			document.documentElement.style.setProperty('--basket-count', `"${ this.basketQuantity || 0 }"`);
		}, 10)
	},
	watch: {
		favoritesCount(val) {
			document.documentElement.style.setProperty('--favorite-count', `"${ val || 0 }"`);
		},
		order: {
			handler(val) {
				this.basketQuantity = val.totalQuantity
			},
			deep: true
		},
		basketQuantity(val) {
			document.documentElement.style.setProperty('--basket-count', `"${ val || 0 }"`);
		},
	},
}
</script>

<style scoped lang="sass">
.basket-count
	&:after
		content: var(--basket-count)
.favorite-count
	&:after
		content: var(--favorite-count)
.count-elem
	&:after
		position: absolute
		top: -6px
		left: calc(100% - 13%)
		z-index: 2
		width: 17px
		height: 17px
		background-color: #D3D3B5
		border-radius: 50%
		-webkit-text-fill-color: #5E5C5A
		text-fill-color: #5E5C5A
		display: flex
		justify-content: center
		align-items: center
		font: 400 normal 0.625rem 'Montserrat'
		line-height: 0.75rem
		color: #5E5C5A
</style>
