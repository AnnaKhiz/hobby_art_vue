<template>
  <main class="main">
    <ui-main-banner />
    <section class="main__product-page">
      <div class="container">
        <ui-breadcrumbs :link="getCheckedHeaderLink" product />
        <section class="main__product-page-price-block">
          <div class="main__product-page-price-block-filter bl-hidden">
            <a href="" class="main__product-page-price-block-filter-button" id="filter-show-button">
              Фильтры
            </a>
          </div>

          <div class="main__product-page-price-block-btn" id="price-up-link">
            <a href="#">Цена &#8595;</a>
          </div>
          <div class="main__product-page-price-block-btn" id="price-down-link">
            <a href="#">Цена &#8593;</a>
          </div>
        </section>
        <section class="main__product-page-container">
          <ui-filter-sidebar />
          <ui-product-list-page />

        </section>
      </div>
    </section>
  </main>
</template>

<script>
import UiMainBanner from "@/components/UI/sliders/uiMainBanner.vue";
import UiFilterSidebar from "@/components/UI/sidebars/uiFilterSidebar.vue"
import UiProductListPage from "@/components/UI/uiProductListPage.vue";
import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue";
import {mapGetters} from "vuex";

export default {
  name: "ProductPageComponent",
  components: {UiBreadcrumbs, UiFilterSidebar, UiMainBanner, UiProductListPage},
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
    }),
  },
}
</script>



<style scoped lang="sass">

</style>
