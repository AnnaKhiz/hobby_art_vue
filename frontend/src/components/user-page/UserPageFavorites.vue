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
		/>
	</div>

	<div v-else>
		<p class="text-no-products">Нет избранных товаров</p>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import likeIcon from "@/assets/icons/like.svg";
import menuDots from "@/assets/icons/menu-dots.svg";
import mockedColors from "@/assets/icons/mocked-color-options.svg";
import uiProductItem from "@/components/UI/uiProductItem.vue";
export default {
  name: "userPageFavorites",
	components: { uiProductItem },
  data() {
    return {
      id: 0,
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
			if (!this.user && !this.user.favorites) return [];
			return this.user.favorites.filter(el => el.isLiked);
		}
	},
}
</script>
<style scoped lang="sass">
.shadow
	box-shadow: 1px 1px 6px var(--colorTextMain)
</style>
