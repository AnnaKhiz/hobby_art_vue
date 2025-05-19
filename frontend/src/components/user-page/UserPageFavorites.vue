<template>
	<div v-if="favorites.length" class="main__product-page-content">
		<ui-product-item
			v-for="(item, index) in favorites"
			:key="item._id._id"
			:item="item._id"
			:index="index"
			:user="user"
			:itemId="item._id._id"
			default-like
			class="main__product-page-content-item shadow"
			@update-display="handleDisplayState"
			@update-is-checked-color-notify="handleCheckedColorNotify"
		/>
	</div>

	<div v-else>
		<p class="text-no-products">Нет избранных товаров</p>
	</div>

	<!--   dialogs -->
	<Transition name="fade">
		<ui-notify-dialog v-if="display" />
	</Transition>

	<Transition name="fade">
		<ui-notify-dialog v-if="isCheckedColorNotify" text="Выберите цвет!" background="#ff0000" textColor="white" weight="600"/>
	</Transition>
</template>

<script>
import {mapGetters} from "vuex";
import likeIcon from "@/assets/icons/like.svg";
import menuDots from "@/assets/icons/menu-dots.svg";
import mockedColors from "@/assets/icons/mocked-color-options.svg";
import uiProductItem from "@/components/UI/product/uiProductItem.vue";
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";
export default {
  name: "userPageFavorites",
	components: {UiNotifyDialog, uiProductItem },
  data() {
    return {
      id: 0,
			isCheckedColorNotify: false,
			display: false,
			likeIcon,
			menuDots,
			mockedColors,
    }
  },
	computed: {
		...mapGetters({
			user: 'user/userInfo',
		}),
		favorites() {
			if (!this.user.favorites) return [];
			return this.user.favorites.filter(el => el.isLiked);
		}
	},
	methods: {
		handleDisplayState(value) {
			this.display = value;
		},
		handleCheckedColorNotify(value) {
			this.isCheckedColorNotify = value;
		}
	},
	watch: {
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
	box-shadow: 1px 1px 6px var(--colorTextMain)
</style>
