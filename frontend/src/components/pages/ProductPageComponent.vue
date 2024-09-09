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
            <a href="#" @click.prevent="sortProducts('-')">Цена &#8595;</a>
          </div>
          <div class="main__product-page-price-block-btn" id="price-down-link">
            <a href="#" @click.prevent="sortProducts('+')">Цена &#8593;</a>
          </div>
        </section>
        <section class="main__product-page-container">
          <ui-filter-sidebar @search="searchFilters = $event"/>
          <ui-product-list-page @items-list="itemsList = $event" :search-filters="searchFilters"/>
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
  data() {
    return {
      itemsList: [],
      searchFilters: {}
    }
  },
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
    }),
  },
  methods: {
    sortProducts(condition) {

      switch(condition) {
        case '-': return this.itemsList.sort((a, b) => a.price - b.price);
        case '+': return this.itemsList.sort((a, b) => b.price - a.price);
        default: return this.itemsList
      }

    }
  }
}
</script>



<style scoped lang="sass">

</style>
