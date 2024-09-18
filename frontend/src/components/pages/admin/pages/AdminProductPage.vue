<template>
  <div class="container__item content">
    <router-view v-if="$route.path.includes('add') || $route.path.includes('edit')" @updated-item="updateItemData"></router-view>
    <div v-else v-for="(item, index) in itemsList" :key="item._id" class="items-container__item">
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
        <button class="button" @click.prevent="removeItem(item._id)">Удалить</button>
      </div>
    </div>
  </div>

</template>

<script>
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
      itemsList: [],
      editFormData: {}
    }
  },
  emits: ['updateIsNewFormData', 'editItem', 'update'],
  methods: {
    updateItemData(item) {
      const index = this.itemsList.findIndex(el => el._id === item._id);
      if (index === -1) return false;
      this.itemsList[index] = item;
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
      this.itemsList.push(item)
    },

    removeProduct(id) {
      const index = this.itemsList.findIndex(el => el._id === id)

      console.log(index)

      if (index === -1) return;

      this.itemsList.splice(index, 1)
    },
    renderColorsArray(item){
      if (!item) return
      let items = ''
      item.forEach(el => items += el.text + ', ')
      return items.slice(0, -2)
    },

    async removeItem(id) {
      console.log(id)
      try {
        const result = await fetch(`http://localhost:3000/api/items/remove/${id}`, {
          method: 'DELETE'
        })

        const data = await result.json();
        if (!data.result) return;

        this.$emit('update', id)
      } catch (error) {
        console.log(error)
      }
    },
    editItem(item) {
      this.$router.push({name: 'item-edit', params: { itemId: item._id }})
    },
    async getItemsList() {
      this.$emit('updateIsNewFormData', false)
      this.editFormData = {}
      try {
        const result = await fetch('http://localhost:3000/api/items')
        const data = await result.json();
        if(!data.result) return
        this.itemsList = data.items

      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getItemsList()
  }
}
</script>


<style scoped lang="sass">
.items-container
  &__item
    display: flex
    flex-direction: column
    background: #E8E8E8
    border-radius: 12px
    width: 30%
    padding: 15px
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
