<template>
	<div v-if="user.favorites.length" class="main__product-page-content">
<!--		<div v-for="item in user.favorites" :key="item._id">{{item}}</div>-->
		<ui-product-item
			v-for="(item, index) in user.favorites"
			:key="item._id._id"
			:item="item._id"
			:index="index"
			:user="user"
			:itemId="item._id._id"
			class="main__product-page-content-item"
		/>
	</div>
	<div v-else>
		<p class="text-no-products">Нет товаров соответствующих критериям поиска</p>
	</div>
<!--  <div class="main__product-page-content-item" id="item-{{id}}">-->

<!--&lt;!&ndash;    product item header&ndash;&gt;-->
<!--    <div class="main__product-page-content-item-header">-->
<!--			<img :src="likeIcon" alt="like button">-->
<!--			<img :src="menuDots" alt="menu button">-->
<!--    </div>-->

<!--&lt;!&ndash;    finished product item header &ndash;&gt;-->
<!--    <div class="main__product-page-content-item-img favorites-img">-->
<!--      <a href="">-->
<!--        <img src="@/assets/img/catalog-img-link1.png" alt="card image">-->
<!--      </a>-->
<!--    </div>-->
<!--    <div class="main__product-page-content-item-label">-->
<!--      <a href="#">Тут название</a>-->
<!--    </div>-->
<!--    <div class="main__product-page-content-item-color-variants">-->
<!--			<img :src="mockedColors" alt="mocked colors">-->
<!--    </div>-->
<!--    <div class="main__product-page-content-item-price">-->
<!--      Тут цена-->
<!--    </div>-->
<!--    <a href="" class="main__product-page-content-item-btnBuy">-->
<!--      В корзину-->
<!--    </a>-->
<!--  </div>-->
</template>

<script>
import likeIcon from "@/assets/icons/like.svg";
import menuDots from "@/assets/icons/menu-dots.svg";
import mockedColors from "@/assets/icons/mocked-color-options.svg";
import {mapActions, mapGetters, mapState} from "vuex";
import UiProductItem from "@/components/UI/uiProductItem.vue";
export default {
  name: "userPageFavorites",
	components: {UiProductItem},
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      id: 0,
			likeIcon,
			menuDots,
			mockedColors
    }
  },
	computed: {
		...mapState('items', ['itemsList']),
		...mapGetters({
			user: 'user/userInfo'
		})
	},
	methods: {
		...mapActions({
			fetchItems: 'items/fetchItems',
		}),

	},
	async mounted() {
		console.log(this.user.favorites)

		await this.fetchItems();
	}
}
</script>
