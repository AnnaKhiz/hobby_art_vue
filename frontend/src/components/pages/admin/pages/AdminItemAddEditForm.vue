<template>
  <form class="modal__registration-form no_line">
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

    <label for="length" class="form-label">Длина нити</label>
    <input
      v-model="form.length"
      id="length"
      type="number"
    >

    <label for="width" class="form-label">Толщина нити</label>
    <input
      v-model="form.width"
      id="width"
      type="number"
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
// import axios from "axios";

export default {
  name: "adminItemsForm",
  props: {
    itemId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editFormData: {},
      message: '',
      form: {
        color: [],
      },
      boolOptions: [
        { text: 'Есть', value: true },
        { text: 'Нет', value: false }
      ],
      colorsSelect: [
        { text: 'Красный', value: 'red' },
        { text: 'Зеленый', value: 'green' },
        { text: 'Желтый', value: 'yellow' },
        { text: 'Синий', value: 'blue' },
        { text: 'Белый', value: 'white' },
      ],
    }
  },
  emits: ['goBack', 'submitEdit', 'updatedItem'],
  methods: {
    async addNewItem() {
      this.parseFormFields();

      try {
        const result = await fetch('http://localhost:3000/api/items/add', {
          method: 'POST',
          body: JSON.stringify(this.form),
          headers: { "Content-Type": "application/json"}
        });
        const data = await  result.json();

        if (!data.result) return;

        this.message = "Товар добавлен в базу данных"

        setTimeout(() => {
          this.message = "";
          this.$emit('goBack', data.data)
        }, 1500)

      } catch (error) {
        console.log(error)
      }
    },

    parseFormFields() {
      return this.form = {
        ...this.form,
        color: this.colorsSelect.filter(el => this.form.color.includes(el.value)),
        type: this.$store.state.filter.itemTypesList.find(el => this.form.type === el.value),
        brand: this.$store.state.filter.brandsList.find(el => this.form.brand === el.value),
        composition: this.$store.state.filter.itemCompositionsList.find(el => this.form.composition === el.value)
      }
    },

    sendEditedItem() {
      if (this.form.color.length) {
        this.parseFormFields();

        this.message = "Товар обновлен успешно";

        setTimeout(async () => {
          this.message = "";
          await this.editItemRequest();
          this.$router.push({name: 'admin-items'})
        }, 1500)
      }
    },

    async editItemRequest() {
      try {
        const result = await fetch(`http://localhost:3000/api/items/update/${this.itemId}`, {
          method: 'PATCH',
          body: JSON.stringify(this.form),
          headers: { "Content-Type": "application/json" }
        })

        const data = await result.json();
        if (!data.result) return;

        this.$emit('updatedItem', this.form);

      } catch (error) {
        console.log(error)
      }
    },

    async initPage() {
      try {
        const result = await fetch(`http://localhost:3000/api/items/${this.itemId}`, {
          method: 'GET',
          credentials: 'include'
        })
        const data = await result.json();
        this.editFormData = await data.item;

      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    console.log('this.editFormData' , this.editFormData)

    if (this.itemId) {
      await this.initPage();

      this.form = {
        ...this.editFormData,
        brand: this.editFormData.brand.value,
        type: this.editFormData.type.value,
        composition: this.editFormData.composition.value,
        color: this.editFormData.color.map(el => el.value)
      }
    } else {
      this.form = {
        color: [],
      }
    }
  },
  watch: {
    editFormData(val) {
      this.form = val
    }
  }

}
</script>

<style scoped lang="sass">
.form-label
  display: block
  padding-left: 20px
  margin-bottom: 5px
.no_line
  position: relative
  width: 50%
  margin: 0
  padding-bottom: 20px
  &::after
    content: none
.form-select
  color: black
  height: 45px
  width: 100%
  border: 1px solid #BDBDBD
  &.multiple
    height: 90px
    border-radius: 10px
.form-option
  color: black
  margin: 5px
.info-message
  color: red
  height: 20px
  position: absolute
  bottom: 0
  left: 0
.select-list
  &:hover
    color: black
  &:focus
    color: black
</style>
