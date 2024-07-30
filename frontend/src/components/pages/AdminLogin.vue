<template>
  <main class="main admin"  style="text-align: left">
    <div class="container">
      <h2 class="container__label">Welcome to Admin panel</h2>
      <div class="container__flex">
        <div class="container__item aside">
          <button @click="openMenu('items')" class="modal__registration-form-button block">Товары</button>
          <div v-if="checkedMenu === 'items'" class="sidebar">
            <a href="#" class="sidebar__submenu" @click.prevent="getItemsList">Все товары</a>
            <a href="#" class="sidebar__submenu">Добавить товар</a>
          </div>
          <button @click="openMenu('orders')" class="modal__registration-form-button block">Заказы</button>
          <button @click="openMenu('users')" class="modal__registration-form-button block">Пользователи</button>
          <button @click="openMenu('comments')" class="modal__registration-form-button block">Комментарии</button>
          <button @click="logOut" class="modal__registration-form-button block exit">Выход</button>
        </div>
        <div class="container__item content">
          <div class="items-container">
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
                <button class="button">Edit</button>
                <button class="button">Delete</button>
              </div>
            </div>
          </div>
          <admin-items-form v-if="false" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>




import AdminItemsForm from "@/components/UI/forms/adminItemsForm.vue"
import {mapMutations} from "vuex";


export default {
  name: "AdminLogin.vue",
  components: {AdminItemsForm},
  data() {
    return {
      itemsList: [],
      form: {},
      checkedMenu: ''
    }
  },
  computed: {

  },
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),
    renderColorsArray(item){
      let items = ''
      item.forEach(el => items += el.text + ', ')
      return items.slice(0, -2)
    },
    openMenu(name) {
      this.checkedMenu = name
    },
    async getItemsList() {
      try {
        const result = await fetch('http://localhost:3000/api/items')
        const data = await result.json();
        if(!data.result) return
        this.itemsList = data.items

      } catch (error) {
        console.log(error)
      }
    },
    async initPage() {
      const result = await fetch('http://localhost:3000/admin', {
        method: 'GET',
        credentials: 'include'
      })
      const data = await result.json()
      console.log(data)

      if (!data.result) {
        this.$router.push('/admin/login')
      }
    },
    async logOut() {
      this.setIsAuthorizedInfo(false)
      localStorage.setItem('auth', 'false');

      const result = await fetch('http://localhost:3000/admin/logout', {
        method: 'GET',
        credentials: 'include'
      });

      console.log(result)
      this.$router.push('/')
    }
  },
  async mounted() {
    await this.initPage()
    this.checkedMenu = 'items';

  }
}
</script>

<style scoped lang="sass">
.main.admin
  height: 100vh
.container
  min-height: 100%
  padding: 50px 20px
  display: flex
  flex-direction: column
  &__flex
    display: flex
    gap: 20px
    height: 100%
    flex-grow: 1
  &__item
    border-radius: 24px
    &.aside
      width: 20%
      background: rgba(199, 193, 187, 0.52)
      padding: 20px
    &.content
      padding: 50px 100px
      text-align: start
      background: rgba(255, 253, 253, 0.47)
      width: 80%
  &__label
    font: 600 normal 1.75rem/2.6875rem 'Spectral SC' //28/43px
    text-transform: uppercase
    color: #424242
    text-align: center
    margin-bottom: 50px
.block
  display: block
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
.sidebar
  padding-bottom: 20px
  &__submenu
    display: block
    text-align: center
    color: #424242
    &:hover
      color: #7B4646
    &:not(:last-child)
      margin-bottom: 10px
.items-container
  display: flex
  align-items: stretch
  justify-content: start
  flex-wrap: wrap

  gap: 15px
  &__item
    //border: 1px solid black
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
