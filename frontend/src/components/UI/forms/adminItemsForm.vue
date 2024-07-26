<template>
  <form class="modal__registration-form no_line" style="width: 30%; margin: auto;">
    <label for="name" class="form-label">Название</label>
    <input
      v-model="form.name"
      id="name"
      type="text"
    >

    <label for="description" class="form-label">Описание</label>
    <input
      v-model="form.description"
      id="description"
      type="text"
    >

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
      style="width: 100%; margin: 0 auto 24px auto; border: 1px solid #BDBDBD;"
    >
      <option v-for="option in colorsSelect" :key="option" :value="option.value">
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
      style="width: 100%; margin: 0 auto 24px auto; border: 1px solid #BDBDBD; height: 30px"
    >
      <option v-for="option in boolOptions" :key="option" :value="option.value">
        {{ option.text }}
      </option>
    </select>

    <label for="isDiscount" class="form-label">Наличие скидки</label>
    <select
      v-model="form.isDiscount"
      id="isDiscount"
      style="width: 100%; margin: 0 auto 24px auto; border: 1px solid #BDBDBD; height: 30px"
    >
      <option v-for="option in boolOptions" :key="option" :value="option.value">
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

    <button class="modal__registration-form-button" style="text-align: center">Добавить</button>
  </form>
</template>

<script>
export default {
  name: "adminItemsForm.vue",
  data() {
    return {
      form: {},
      boolOptions: [
        { text: 'В наличии', value: true },
        { text: 'Нет на складе', value: false }
      ],
      colorsSelect: [
        { text: 'Красный', value: 'red' },
        { text: 'Зеленый', value: 'green' },
        { text: 'Желтый', value: 'yellow' },
        { text: 'Синий', value: 'blue' },
        { text: 'Белый', value: 'white' },
      ]
    }
  }
}
</script>

<style scoped lang="sass">
.form-label
  display: block
  padding-left: 20px
  margin-bottom: 5px
.no_line::after
  content: none
</style>
