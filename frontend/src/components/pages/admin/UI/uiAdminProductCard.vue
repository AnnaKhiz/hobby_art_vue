<template>
  <div v-for="item in itemsList" :key="item._id" class="items-container__item">
    <h3 class="item-row"><span class="label">Название:</span> {{item.name}}</h3>
    <p class="item-row"><span class="label">Описание:</span> {{item.description}}</p>
    <p class="item-row"><span class="label">Цена:</span> {{item.price}}</p>
    <p class="item-row"><span class="label">Остатки (количество):</span> {{item.restBalance}}</p>
    <p class="item-row"><span class="label">Наличие на складе:</span> {{item.isSold}}</p>
    <p class="item-row"><span class="label">Наличие скидки:</span> {{item.isDiscount}}</p>
    <p class="item-row"><span class="label">Размер скидки:</span> {{item.discountPercentage}}%</p>
    <p class="item-row"><span class="label">Цвета:</span> {{ renderColorsArray(item.color)}}</p>
    <p class="item-row"><span class="label">Рейтинг:</span> {{item.rating}}</p>
    <div class="actions">
      <button class="button" @click.prevent="$emit('editItem', item)">Редактировать</button>
      <button class="button" @click.prevent="removeItem(item._id)">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "uiAdminProductCard",
  props: {
    itemsList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update', 'editItem'],
  methods: {
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

        console.log('remove result', data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>


<style scoped lang="sass">
.items-container
  &__item
    background: #E8E8E8
    border-radius: 12px
    width: 30%
    padding: 15px
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
