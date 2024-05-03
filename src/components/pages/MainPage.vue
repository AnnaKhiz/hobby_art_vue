<template>
 <div class="main">
   <ui-main-banner />

   <section class="main__slider-popular">
     <div class="container">
        <ui-switcher-main >

          <template #popular-swiper>
            <ui-popular-products />
          </template>

        </ui-switcher-main>

     </div>
   </section>

   <section class="main__catalog" id="catalog">
     <div class="container">
       <img src="@/assets/img/text-katalog.png" alt="image fon" class="main__catalog-fon-img">
       <h2 class="main__catalog-label">
         Каталог товаров
       </h2>
       <div class="main__catalog-container">
         <ui-catalog-item
          v-for="item in catalogItemsInfo"
          :key="item.value"
          :catalogItemsInfo="item"
         />
       </div>
     </div>
   </section>
 </div>

</template>

<script >

import {defineComponent} from "vue";
import UiMainBanner from "@/components/UI/sliders/uiMainBanner.vue";
import UiSwitcherMain from "@/components/UI/uiSwitcherMain.vue";
import UiPopularProducts from "@/components/UI/sliders/uiPopularProducts.vue";
import UiCatalogItem from "@/components/UI/uiCatalogItem.vue"

export default defineComponent({
  components: {UiCatalogItem, UiPopularProducts, UiSwitcherMain, UiMainBanner},
  data() {
    return {
      catalogItemsInfo: [
        { text: 'Макраме', value: 'makrame', price: '250', link: '', image: 'catalog-img-pink.png' },
        { text: 'Вязание', value: 'knitting', price: '250', link: '', image: 'catalog-img-violet.png' },
        { text: 'Вышивка', value: 'crosstich', price: '250', link: '', image: 'catalog-img-pink-shadow.png' },
        { text: 'Лепка', value: 'modeling', price: '250', link: '', image: 'catalog-img-pink-shadow.png' },
        { text: 'Инструменты', value: 'tools', price: '250', link: '', image: 'catalog-img-pink.png' },
        { text: 'Упаковка', value: 'package', price: '250', link: '', image: 'catalog-img-violet.png' },
        { text: 'Товары для творчества', value: 'art-supplies', price: '250', link: '', image: 'catalog-img-pink-shadow.png' },
        { text: 'Книги', value: 'books', price: '250', link: '', image: 'catalog-img-pink-shadow.png' },
      ]
    }
  }
})
</script>

<style scoped lang="sass">

</style>