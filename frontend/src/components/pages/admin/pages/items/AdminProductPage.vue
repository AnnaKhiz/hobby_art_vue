<template>
    <router-view v-if="$route.path.includes('add') || $route.path.includes('edit')" @updated-item="updateItemData"></router-view>
    <div v-else v-for="(item, index) in productList" :key="item._id" class="items-container__item">
      <div class="info">
        <h3 class="item-row"><span class="label">Название:</span> {{item.name}}</h3>
        <p class="item-row"><span class="label">Описание:</span> {{item.description}}</p>
        <p class="item-row"><span class="label">Цена:</span> {{item.price}}</p>
        <p class="item-row"><span class="label">Остатки (количество):</span> {{item.restBalance}}</p>
        <p class="item-row"><span class="label">Наличие на складе:</span> {{item.isSold}}</p>
        <p class="item-row"><span class="label">Наличие скидки:</span> {{item.isDiscount}}</p>
        <p class="item-row"><span class="label">Размер скидки:</span> {{item.discountPercentage}}%</p>
        <p class="item-row"><span class="label">Цвета:</span> {{ renderColorsArray(item.color)}}</p>
        <p class="item-row"><span class="label">Рейтинг:</span> {{item.rating}}</p>
      </div>
      <div class="actions">
        <button class="button" @click.prevent="editItem(item, index)">Редактировать</button>
        <button class="button" @click.prevent="removeProduct(item._id)">Удалить</button>
      </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "uiAdminProductCard",
  props: {
    isNewFormData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productList: [],
      editFormData: {}
    }
  },
  emits: ['updateIsNewFormData', 'editItem', 'update'],
	computed: {
		...mapState('items', ['itemsList']),
	},
  methods: {
		...mapActions('items', ['fetchItems', 'removeItem']),
    updateItemData(item) {
      const index = this.productList.findIndex(el => el._id === item._id);
      if (index === -1) return false;
      this.productList[index] = item;
    },
    openAddProduct() {
      this.$emit('updateIsNewFormData', true)
      // this.isNewFormData = true;
      this.editFormData = {}
    },
    openEditItem(item) {
      this.$emit('updateIsNewFormData', true)
      // this.isNewFormData = true
      this.editFormData = item
    },
    addProduct(item) {
      this.$emit('updateIsNewFormData', false)
      // this.isNewFormData = false;
      this.editFormData = {}
      this.productList.push(item)
    },

    async removeProduct(id) {
			await this.removeItem(id);
			this.$emit('update', id);
    },
    renderColorsArray(item){
      if (!item) return
      let items = ''
      item.forEach(el => items += el.text + ', ')
      return items.slice(0, -2)
    },

    editItem(item) {
      this.$router.push({name: 'admin-items-edit', params: { itemId: item._id }})
    },
    updateFormData() {
      this.$emit('updateIsNewFormData', false);
      this.editFormData = {};
    },
  },
  async mounted() {
		this.updateFormData();
		await this.fetchItems();
		this.productList = this.itemsList;
  }
}
</script>


<style scoped lang="sass">
.block
  display: block
  width: 100%
  &.exit
    background: #525252
    color: white
    margin-top: 50px
    transition: color 0.3s ease-in-out 0s
    &:hover
      transition: color 0.3s ease-in-out 0s
      background: #ddd9d9
      border: 1px solid #525252
      color: #525252
  @media screen and (max-width: 1200px)
    font-size: 0.8rem
    padding: 13px 30px
  @media screen and (max-width: 900px)
    font-size: 0.8rem
    padding: 10px 20px
.items-container
  &__item
    display: flex
    flex-direction: column
    background: #E8E8E8
    border-radius: 12px
    width: 30%
    padding: 15px
    height: 350px
    & .info
      flex-grow: 1
    & > .actions
      display: flex
      align-items: center
      justify-content: start
      gap: 20px
      margin-top: 15px
.button
  font-size: 1rem
  color: #7B4646
  transition: color 0.3s ease-in-out 0s
  background: transparent
  &:hover
    transition: color 0.3s ease-in-out 0s
    color: #5E5C5A
    text-decoration: underline
.label
  font-weight: bold
  font-size: 1rem

.item-row
  margin-bottom: 5px
</style>
