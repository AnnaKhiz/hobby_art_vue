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
      <a
        class="main__product-page-content-item-btnBuy"
        style="cursor: pointer"
        @click.prevent="addToBasket(item)"
      >
        В корзину
      </a>
    </div>
    <!--   dialogs -->
    <Transition name="fade">
      <ui-notify-dialog v-if="display" />
    </Transition>
  </div>
</template>

<script>
import UiProductItemHeader from "@/components/UI/uiProductItemHeader.vue"
import UiColorsIcon from "@/components/UI/icons/uiColorsIcon.vue"
import {mapMutations} from "vuex";
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";


export default {
  name: "uiProductListPage.vue",
  components: {UiNotifyDialog, UiColorsIcon, UiProductItemHeader},
  data() {
    return {
      display: false,
      productList: []
    }
  },
  methods: {
    ...mapMutations('order', ['addToOrder']),
    addToBasket(item) {
      const orderItem = {quantity: 1, price: item.price, item: item}
      this.addToOrder(orderItem);
      this.display = true;

    },
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
  watch: {
    display(val) {
      if (val) {
        setTimeout(() => {
          this.display = false
        }, 2000)
      }
    }
  }

}
</script>



<style scoped lang="sass">

</style>
