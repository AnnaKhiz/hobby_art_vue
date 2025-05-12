<template>
	<div v-if="itemsPerPageList.length" >
		<div class="main__product-page-content" style="margin-bottom: 30px">
			<ui-product-item
				v-for="(item, index) in itemsPerPageList"
				:key="item._id"
				:item="item"
				:index="index"
				:user="user"
				:itemId="item._id"
				class="main__product-page-content-item"
				@update-display="handleDisplayState"
				@update-is-checked-color-notify="handleCheckedColorNotify"
			/>
		</div>
		<div>
			<span
				v-for="page in pages"
				:key="page"
				@click="handlePaginationCount(page)"
				class="pagination-item"
				:class="{ 'checked': currentPage === page}"
			>
				{{page}}
			</span>
		</div>
	</div>

  <div v-else>
    <p class="text-no-products">Нет товаров соответствующих критериям поиска</p>
  </div>


	<!--   dialogs -->
	<Transition name="fade">
		<ui-notify-dialog v-if="display" />
	</Transition>

	<Transition name="fade">
		<ui-notify-dialog v-if="isCheckedColorNotify" text="Выберите цвет!" background="#ff0000" textColor="white" weight="600"/>
	</Transition>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";
import UiProductItem from "@/components/UI/uiProductItem.vue";


export default {
  name: "uiProductListPage.vue",
  components: {UiProductItem, UiNotifyDialog},
  props: {
    searchFilters: {
      type: Object,
      default: () => {}
    },
		items: {
			type: Array,
			default: () => []
		}
  },
  data() {
    return {
      isCheckedColorNotify: false,
      display: false,
			itemsPerPage: 10,
			pages: 1,
			currentPage: 1,
			startIndex: 0,
			lastIndex: 10
    }
  },
  emits: ['itemsList', 'change'],
  computed: {
		...mapState('items', ['itemsList']),
		...mapGetters({
			searchList: 'search/searchList',
			searchText: 'search/searchText',
			user: 'user/userInfo',
			isAuthorized: 'user/isAuthorized',
		}),
    filteredItems() {
			if (this.searchText) {
				return this.searchList;
			}

      const { brand, composition, type, width } = this.searchFilters;

      if (!brand && !composition && !type && !width) {
          return this.itemsList;
			}

      return this.itemsList.filter(product => {
        const typeMatch = !type.length || type.includes(product.type?.value) ;
        const compositionMatch = !composition.length || composition.includes(product.composition?.value);
        const brandMatch = !brand.length || brand.includes(product.brand?.value);
        const widthMatch = !width.length || width.includes(product.width.toString());

        return typeMatch && compositionMatch && brandMatch && widthMatch
      })
    },
		itemsPerPageList() {
			return this.filteredItems.filter((el, index) => index < this.lastIndex && index >= this.startIndex);
		}
  },

  methods: {
    ...mapMutations('order', ['addToOrder']),
		...mapActions({
			fetchItems: 'items/fetchItems',
			getAuthUser: 'user/getAuthUser',
		}),
		handleDisplayState(value) {
			this.display = value;
		},
		handleCheckedColorNotify(value) {
			this.isCheckedColorNotify = value;
		},
		handlePaginationCount(value) {
			this.currentPage = value;

			this.lastIndex = +this.currentPage * this.itemsPerPage;
			this.startIndex = this.lastIndex - 10;
		}
  },

  async mounted() {
		if (this.isAuthorized) {
			await this.getAuthUser();
		}

		this.pages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  },
  watch: {
    display(val) {
      if (val) {
        setTimeout(() => {
          this.display = false;
        }, 2000)
      }
    },

    isCheckedColorNotify(val) {
      if (val) {
        setTimeout(() => {
          this.isCheckedColorNotify = false;
        }, 2000)
      }
    },
    filteredItems: {
      handler(val) {
				this.handlePaginationCount(1);
				this.pages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
        this.$emit('change', val.length);
      },
      deep: true
    }
  },
}
</script>

<style scoped lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.8s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0

.text-no-products
  font: 400 normal 1rem/1.3rem 'Montserrat'
  color: var(--colorTextMain)

.pagination-item
  cursor: pointer
  margin-right: 10px
  background-color: var(--colorTextButton)
  padding: 10px
  box-shadow: 1px 1px 2px #ece1e1, inset -1px -1px 2px #818080
  border-radius: 4px
  &:hover
    color: var(--colorTextButton)
    background-color: var(--grayLinkColor)
  &.checked
    color: #976464
    background-color: var(--colorLineBasket)
    box-shadow: inset 1px 1px 2px #ece1e1, -1px -1px 2px #818080
</style>
