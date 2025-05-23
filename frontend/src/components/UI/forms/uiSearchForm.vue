<template>
  <form class="header__menu-search elem-sub">
    <input
			v-model="searchText"
			type="text"
			placeholder="Поиск товара"
			@focus="onFocusSearch"
			@input="searchItem"
		>
  </form>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "uiSearchForm",
	data() {
		return {
			searchText: '',
			itemsList: []
		}
	},
	methods: {
		...mapMutations({
			search: 'search/searchItem',
			setCheckedHeaderLink: 'links/setCheckedHeaderLink',
			resetSearch: 'search/resetSearch'
		}),
		...mapActions('items', ['fetchItems']),
		onFocusSearch() {
			this.$router.push({
				name: 'Product-page',
				params: {
					type: 'search'
				}
			});
			this.setCheckedHeaderLink('search');
		},
		searchItem() {
			if (!this.searchText) {
				this.resetSearch([]);
			}
			this.$store.dispatch('search/getItemsList');
			this.search(this.searchText);
		}
	}
}
</script>
