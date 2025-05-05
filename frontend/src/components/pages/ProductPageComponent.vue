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
					<!--	SORT BUTTONS  -->
					<ui-sort-button
						desc
						@update-items="handleItemsList"
						:items="itemsList"
					/>
					<ui-sort-button
						asc
						@update-items="handleItemsList"
						:items="itemsList "
					/>
        </section>
        <section class="main__product-page-container">
          <ui-filter-sidebar
						@search="handleSearchFilters"
						:filter-items-quantity="filterItemsQuantity"
					/>
          <ui-product-list-page
						@items-list="handleItemsList"
						:search-filters="searchFilters"
						@change="handleFilterItemsQuantity"
					/>
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
import {mapGetters, mapMutations} from "vuex";
import UiSortButton from "@/components/UI/uiSortButton.vue";

export default {
  name: "ProductPageComponent",
  components: {UiSortButton, UiBreadcrumbs, UiFilterSidebar, UiMainBanner, UiProductListPage},
  data() {
    return {
      itemsList: [],
      searchFilters: {},
      filterItemsQuantity: null
    }
  },
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
			getauth: 'user/isAuthorized'
    }),
  },
  methods: {
		...mapMutations('user', ['setIsAuthorizedInfo']),
		handleSearchFilters(value) {
			this.searchFilters = value;
		},
		handleItemsList(value) {
			this.itemsList = value;
		},
		handleFilterItemsQuantity(value) {
			this.filterItemsQuantity = value;
		},

  },
	mounted() {
		if (localStorage.getItem('auth') === 'true') {
			this.setIsAuthorizedInfo(true)
		}
		console.log('getauth', this.getauth)
	}
}
</script>
