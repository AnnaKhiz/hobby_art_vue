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
 </div>

</template>

<script >

import {defineComponent} from "vue";
import UiMainBanner from "@/components/UI/sliders/uiMainBanner.vue";
import UiSwitcherMain from "@/components/UI/uiSwitcherMain.vue";
import UiPopularProducts from "@/components/UI/sliders/uiPopularProducts.vue";

export default defineComponent({
  components: {UiPopularProducts, UiSwitcherMain, UiMainBanner}
})
</script>

<style scoped lang="sass">

</style>