<template>
  <div class="main__product-page-content">
    <div v-for="item in productList" :key="item._id" class="main__product-page-content-item">
      <ui-product-item-header />
      <div class="main__product-page-content-item-img">
        <a @click="$router.push(`${$router.currentRoute.value.href}/${item._id}`)" style="cursor: pointer">
          <img :src="require(`@/assets/${item.photo}`)" alt="card image">
        </a>
      </div>
      <div class="main__product-page-content-item-label">
        <a @click="$router.push(`${$router.currentRoute.value.href}/${item._id}`)" style="cursor: pointer">{{ item.name }}</a>
      </div>
      <div class="main__product-page-content-item-color-variants">
        <ui-colors-icon :items="item.color" size="20" position="flex-start"/>
      </div>
      <div class="main__product-page-content-item-price">
        {{ item.price }} ₽
      </div>
      <a href="" class="main__product-page-content-item-btnBuy">
        В корзину
      </a>
    </div>

  </div>
</template>

<script>
import UiProductItemHeader from "@/components/UI/uiProductItemHeader.vue"
import UiColorsIcon from "@/components/UI/icons/uiColorsIcon.vue"
import {mapMutations} from "vuex";


export default {
  name: "uiProductListPage.vue",
  components: {UiColorsIcon, UiProductItemHeader},
  data() {
    return {
      productList: []
    }
  },
  methods: {
    ...mapMutations('order', ['addToOrder']),
    async getProductList() {
      try {
        const result = await fetch('http://localhost:3000/api/items', {
          method: 'GET',
          credentials: 'include'
        })
        const data = await result.json();
        this.productList = data.items;
        console.log('productList', this.productList)
      } catch (e) {
        console.log(e)
      }
    }
  },

  async mounted() {
    await this.getProductList()
  },

}
</script>



<style scoped lang="sass">

</style>
