<template>
	<loader-component v-if="loading" />
	<main
		v-else
		class="main"
	>
		<ui-main-banner />
		<section class="main__product-page">
			<div class="container">
				<ui-breadcrumbs :link="getCheckedHeaderLink" product />
				<section class="main__product-page-price-block">
					<div class="main__product-page-price-block-filter bl-hidden">
						<a v-if="documentSize" href="" class="main__product-page-price-block-filter-button" @click.prevent="isHidden = !isHidden">
							Фильтры
						</a>
					</div>
					<!--	SORT BUTTONS  -->
					<div :class="{ 'hide-filters' : isHidden && documentSize }" class="main__product-page-price-block-filter-sort">
						<ui-sort-button
							desc
							@update-items="handleItemsList"
							:items="itemsList"
						/>
						<ui-sort-button
							asc
							@update-items="handleItemsList"
							:items="itemsList"
						/>
					</div>

				</section>
				<section class="main__product-page-container" >
					<ui-filter-sidebar
						@search="handleSearchFilters"
						:filter-items-quantity="filterItemsQuantity"
						:class="{ 'hide-filters' : isHidden && documentSize }"
					/>
					<ui-product-list-page
						:items="itemsList"
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
import UiProductListPage from "@/components/UI/product/uiProductListPage.vue";
import UiBreadcrumbs from "@/components/UI/breadcrumbs/uiBreadcrumbs.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import UiSortButton from "@/components/UI/uiSortButton.vue";
import LoaderComponent from "@/components/UI/loader/LoaderComponent.vue";

export default {
  name: "ProductPageComponent",
  components: {
		LoaderComponent,
		UiSortButton,
		UiBreadcrumbs,
		UiFilterSidebar,
		UiMainBanner,
		UiProductListPage
	},
  data() {
    return {
      itemsList: [],
      searchFilters: {},
      filterItemsQuantity: null,
			isHidden: true
    }
  },
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
			isLoading: 'items/isLoading',
			items: 'items/getItems'
    }),
		loading() {
			return this.isLoading;
		},
		documentSize() {
			return window.innerWidth <= '820';
		}
  },
  methods: {
		...mapActions({
			fetchItems: 'items/fetchItems',
			getAuthUser: 'user/getAuthUser',
		}),
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
	async mounted() {
		if (localStorage.getItem('auth') === 'true') {
			this.setIsAuthorizedInfo(true);
		}

		await this.fetchItems();
		this.itemsList = this.items;
	},
}
</script>
<style scoped lang="sass">
.hide-filters
	display: none
</style>
