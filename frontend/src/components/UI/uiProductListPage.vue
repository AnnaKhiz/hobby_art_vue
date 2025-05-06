<template>
  <div v-if="filteredItems.length" class="main__product-page-content">
		<ui-product-item
			v-for="(item, index) in filteredItems"
			:key="item._id"
			:item="item"
			:index="index"
			:user="user"
			class="main__product-page-content-item"
			@update-display="handleDisplayState"
			@update-is-checked-color-notify="handleChackedColorNotify"
		/>
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
    }
  },
  data() {
    return {
      isCheckedColorNotify: false,
      display: false,
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
        const typeMatch = !type.length || type.includes(product.type.value) ;
        const compositionMatch = !composition.length || composition.includes(product.composition.value);
        const brandMatch = !brand.length || brand.includes(product.brand.value);
        const widthMatch = !width.length || width.includes(product.width.toString());

        return typeMatch && compositionMatch && brandMatch && widthMatch
      })
    },
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
		handleChackedColorNotify(value) {
			this.isCheckedColorNotify = value;
		}
  },

  async mounted() {
		await this.fetchItems();
		if (this.isAuthorized) {
			await this.getAuthUser();
		}

		this.$emit('itemsList', this.itemsList);
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
        this.$emit('change', val.length)
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
</style>
