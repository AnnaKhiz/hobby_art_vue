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

    <label for="photo" class="form-label">Выбрать изображение</label>
		<div style="position: relative; cursor: pointer">
			<button
				class="header__menu-enterButton cover-input"
				style="text-align: center"
			>
				{{ form.file?.name || form.photo || 'Загрузить...' }}
			</button>
			<ui-upload-image @update-file="form.file = $event" style="opacity: 0" />
		</div>

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
import {
	mapActions,
	mapGetters,
	mapState
} from "vuex";
import UiUploadImage from "@/components/UI/forms/uiUploadImage.vue";

export default {
  name: "adminItemsForm",
	components: { UiUploadImage },
  props: {
    itemId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      message: '',
      form: {
				file: {
					name: ''
				},
				color: [],
      },
    }
  },
  emits: ['submitEdit', 'updatedItem'],
	computed: {
		...mapState('items', ['item']),
		...mapGetters({
			boolOptions: 'items/boolOptions',
			colorsSelect: 'items/colorsSelect',
			file: 'uploadFile/file',
			itemTypesList: 'filter/type',
			brandsList: 'filter/brand',
			composition: 'filter/composition'
		})
	},
  methods: {
		...mapActions({
			fetchItemById: 'items/fetchItemById',
			addItem: 'items/addItem',
			updateItem: 'items/updateItem',
			sendFile: 'uploadFile/sendFile'
		}),
		async appendFormFile() {
			if (!this.file) {
				this.message = 'Файл не выбран!';
				return;
			}
			const formData = new FormData();
			formData.append('file', this.form.file);
			await this.sendFile(formData);
		},
    async addNewItem() {
      this.parseFormFields();

			await this.appendFormFile();

			if (!this.file.filename) {
				this.message = "Не удалось загрузить изображение";
				return;
			}

			this.form.photo = this.file.filename;
			delete this.form.file;
			await this.addItem(this.form);

			this.message = "Товар добавлен в базу данных";

			setTimeout(() => {
				this.message = "";
				this.$router.push({name: 'admin-items'});
			}, 1000)

    },

    parseFormFields() {
      return this.form = {
        ...this.form,
        color: this.colorsSelect.filter(el => this.form.color.includes(el.value)),
        type: this.itemTypesList.find(el => this.form.type === el.value),
        brand: this.brandsList.find(el => this.form.brand === el.value),
        composition: this.composition.find(el => this.form.composition === el.value)
      }
    },

    async sendEditedItem() {
        this.parseFormFields();

				if (this.form.file) {
					await this.appendFormFile();
					if (!this.file.filename) {
						this.message = "Не удалось загрузить изображение";
						return;
					}
				}

				this.form.photo = this.file.filename;
				delete this.form.file;

        this.message = "Товар обновлен успешно";

        setTimeout(async () => {
          this.message = "";
					await this.updateItem({ body: this.form, id: this.itemId } );
					this.$emit('updatedItem', this.form);
          this.$router.push({name: 'admin-items'})
        }, 1500)
      }
  },
  async mounted() {
    if (this.itemId) {
      await this.fetchItemById(this.itemId);

      this.form = {
        ...this.item,
        brand: this.item.brand.value,
        type: this.item.type.value,
        composition: this.item.composition.value,
        color: this.item.color.map(el => el.value)
      }

    } else {
      this.form = {
        color: [],
      }
    }
  },
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
  @media screen and (max-width: 1000px)
    width: 60%
  @media screen and (max-width: 768px)
    width: 100%
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
.cover-input
  position: absolute
  top: 0
  left: 0
  width: 100%
  pointer-events: none
  &:before
    content: url("../../../../../assets/icons/upload.png")
    top: 2px
    left: 20px

</style>
