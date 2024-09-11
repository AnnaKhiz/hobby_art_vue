<template>
  <form action="#" class="main__product-page-sidebar-search" id="search-sidebar">
    <div class="main__product-page-sidebar-item" v-for="header in headersSearch" :key="header">
      <h3 class="main__product-page-sidebar-title">
        {{ header.text }}
      </h3>
      <ul class="main__product-page-sidebar-block list-filters" v-for="item in $store.getters[`filter/${header.value}`]" :key="item.value">
        <li>
          <label :for="item.value">
            <input v-model="search[header.value]" type="checkbox" name="type" :value="item.value" :id="item.value">
            {{item.text}}
          </label>
        </li>
      </ul>
    </div>

    <div class="main__product-page-sidebar-buttons">
      <button
        type="reset"
        id="search-reset"
        class="main__product-page-sidebar-button"
        @click.prevent="resetForm"
      >
        Очистить
      </button>
      <div class="main__product-page-sidebar-message" id="search-result-message">
        Подобрано {{ filterItemsQuantity }} товаров
      </div>
    </div>

  </form>
</template>

<script>

export default {
  name: "uiFilterSidebar.vue",
  props: {
    filterItemsQuantity: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      search: {
        type: [],
        composition: [],
        width: [],
        brand: []
      },
      headersSearch: [
        { text: 'Тип изделий', value: 'type' },
        { text: 'Состав', value: 'composition' },
        { text: 'Диаметр', value: 'width' },
        { text: 'Производитель', value: 'brand' },
      ]
    }
  },
  emits: ['search'],

  methods: {

    // saveFilters() {
    //   this.$emit('search', this.search);
    // },
    resetForm() {
      this.search = {
        type: [],
        composition: [],
        width: [],
        brand: []
      }
    }
  },
  watch: {
    search: {
      handler(val) {
        this.$emit('search', val);
      },
      deep: true
    }
  }
}
</script>


<style scoped lang="sass">
.list-filters
  &:after
    content: none
</style>
