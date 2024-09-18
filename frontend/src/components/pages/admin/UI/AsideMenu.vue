<template>
  <div class="container__item aside">
    <button @click="goToPage('items')" class="modal__registration-form-button block">Товары</button>
    <div v-if="checkedMenu === 'items'" class="sidebar">
      <a href="#" class="sidebar__submenu" @click.prevent="$emit('getAll')">Все товары</a>
      <a href="#" class="sidebar__submenu"  @click.prevent="$emit('addNew')" >Добавить товар</a>
    </div>
    <button @click="goToPage('orders')" class="modal__registration-form-button block">Заказы</button>
    <div v-if="checkedMenu === 'orders'" class="sidebar" >
      <a href="#" class="sidebar__submenu" @click.prevent="$emit('getAll')">Все заказы</a>
      <a href="#" class="sidebar__submenu"  @click.prevent="$emit('addNew')" >Добавить заказ</a>
    </div>
    <button @click="goToPage('users')" class="modal__registration-form-button block">Пользователи</button>
    <button @click="goToPage('comments')" class="modal__registration-form-button block">Комментарии</button>
    <button @click="logOut" class="modal__registration-form-button block exit">Выход</button>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "AsideMenu.vue",

  props: {
    checkedMenu: {
      type: String,
      default: 'items'
    }
  },
  emits: ['addNew', 'getAll', 'add-item', 'add-order', 'menu'],
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),
    goToPage(value) {
      this.$router.push(`/admin/${value}`)
      this.$emit('menu', value)
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
  }
}
</script>



<style scoped lang="sass">
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
      width: 30%
      background: rgba(199, 193, 187, 0.52)
      padding: 20px
      @media screen and (max-width: 1200px)
        padding: 10px
    &.content
      padding: 50px
      text-align: start
      background: rgba(255, 253, 253, 0.47)
      width: 80%
      @media screen and (max-width: 1200px)
        padding: 50px
  &__label
    font: 600 normal 1.75rem/2.6875rem 'Spectral SC' //28/43px
    text-transform: uppercase
    color: #424242
    text-align: center
    margin-bottom: 50px
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
</style>
