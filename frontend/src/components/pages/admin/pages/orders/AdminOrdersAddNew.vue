<template>
  <form class="modal__registration-form no_line">
    <label for="dateCompleted" class="form-label">Дата обработки заказа:</label>
    <input
      v-model="form.dateCompleted"
      id="dateCompleted"
      type="text"
    >

    <label for="totalPrice" class="form-label">Общая стоимость:</label>
    <input
      v-model="form.totalPrice"
      id="totalPrice"
      type="number"
    >

    <label for="totalQuantity" class="form-label">Общее количество товаров:</label>
    <input
      v-model="form.totalQuantity"
      id="totalQuantity"
      type="number"
    >

    <label for="width" class="form-label">Толщина нити</label>
    <input
      v-model="form.deliveryInfo.address.city"
      id="width"
      type="text"
    >

    <label for="brand" class="form-label">Производитель</label>
    <select class="select-list" v-model="form.brand" >
      <option
        v-for="brand in $store.state.filter.brandsList"
        :key="brand.value"
        :value="brand.value"
      >
        {{ brand.text }}
      </option>
    </select>

    <label for="type" class="form-label">Тип изделия</label>
    <select class="select-list" v-model="form.type" >
      <option
        v-for="type in $store.state.filter.itemTypesList"
        :key="type.value"
        :value="type.value"
      >
        {{ type.text }}
      </option>
    </select>

    <label for="composition" class="form-label">Состав</label>
    <select class="select-list" v-model="form.composition" >
      <option
        v-for="item in $store.state.filter.itemCompositionsList"
        :key="item.value"
        :value="item.value"
      >
        {{ item.text }}
      </option>
    </select>

    <label for="photo" class="form-label">Ссылка на изображение</label>
    <input
      v-model="form.photo"
      id="photo"
      type="text"
    >

    <label for="price" class="form-label">Цена</label>
    <input
      v-model="form.price"
      id="price"
      type="number"
    >

    <label for="color" class="form-label">Доступные цвета</label>
    <select
      v-model="form.color"
      id="color"
      multiple
      class="form-select multiple"
    >
      <option v-for="option in colorsSelect" :key="option" :value="option.value" class="form-option">
        {{ option.text }}
      </option>
    </select>

    <label for="restBalance" class="form-label">Остаток на складе</label>
    <input
      v-model="form.restBalance"
      id="restBalance"
      type="number"
    >

    <label for="isSold" class="form-label">Есть ли в наличии</label>
    <select
      v-model="form.isSold"
      id="isSold"
      class="form-select"
    >
      <option v-for="option in boolOptions" :key="option" :value="option.value" class="form-option">
        {{ option.text }}
      </option>
    </select>

    <label for="isDiscount" class="form-label">Наличие скидки</label>
    <select
      v-model="form.isDiscount"
      id="isDiscount"
      class="form-select"
    >
      <option v-for="option in boolOptions" :key="option" :value="option.value" class="form-option">
        {{ option.text }}
      </option>
    </select>

    <label for="discountPercentage" class="form-label">Скидка в процентах, %</label>
    <input
      v-model="form.discountPercentage"
      id="discountPercentage"
      type="number"
    >

    <label for="rating" class="form-label">Рейтинг</label>
    <input
      v-model="form.rating"
      id="rating"
      type="number"
    >

    <button
      class="modal__registration-form-button"
      style="text-align: center"
      @click.prevent="!itemId ? addNewItem() : sendEditedItem()"
    >
      {{ itemId ? 'Сохранить изменения' : 'Добавить' }}
    </button>
    <p class="info-message">{{message}}</p>
  </form>
</template>

<script>
export default {
  name: "AdminOrdersAddNew.vue",
  data() {
    return {
      form: {
        deliveryInfo: {
          address: {
            city: ''
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="sass">

</style>
