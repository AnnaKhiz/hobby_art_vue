<template>
  <div class="main__product-page-content-item" id="item-{{id}}">

<!--    product item header-->
    <div class="main__product-page-content-item-header">
			<img :src="likeIcon" alt="like button">
			<img :src="menuDots" alt="menu button">
    </div>

<!--    finished product item header -->
    <div class="main__product-page-content-item-img favorites-img">
      <a href="">
        <img src="@/assets/img/catalog-img-link1.png" alt="card image">
      </a>
    </div>
    <div class="main__product-page-content-item-label">
      <a href="#">Тут название</a>
    </div>
    <div class="main__product-page-content-item-color-variants">
			<img :src="mockedColors" alt="mocked colors">
    </div>
    <div class="main__product-page-content-item-price">
      Тут цена
    </div>
    <a href="" class="main__product-page-content-item-btnBuy">
      В корзину
    </a>
  </div>
</template>

<script>
import likeIcon from "@/assets/icons/like.svg";
import menuDots from "@/assets/icons/menu-dots.svg";
import mockedColors from "@/assets/icons/mocked-color-options.svg";
import {mapGetters} from "vuex";
export default {
  name: "userPageFavorites",
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
		...mapGetters({
			user: 'user/userInfo'
		})
	},
	methods: {

	},
	mounted() {
		console.log(this.user)
	}
}
</script>
