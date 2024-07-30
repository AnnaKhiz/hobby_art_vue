<template>
  <main class="main admin"  style="text-align: left">
    <div class="container">
      <h2 class="container__label">Welcome to Admin panel</h2>
      <div class="container__flex">
        <div class="container__item aside">
          <button @click="checkedMenu = 'items'" class="modal__registration-form-button block">Товары</button>
          <button @click="checkedMenu = 'items'" class="modal__registration-form-button block">Заказы</button>
          <button @click="checkedMenu = 'items'" class="modal__registration-form-button block">Пользователи</button>
          <button @click="checkedMenu = 'items'" class="modal__registration-form-button block">Комментарии</button>
          <button @click="$router.push('/')" class="modal__registration-form-button block exit">Выход</button>
        </div>
        <div class="container__item content">
          <admin-items-form v-if="checkedMenu === 'items'" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>




import AdminItemsForm from "@/components/UI/forms/adminItemsForm.vue"


export default {
  name: "AdminLogin.vue",
  components: {AdminItemsForm},
  data() {
    return {
      form: {},
      checkedMenu: ''
    }
  },
  methods: {

  },
  async mounted() {
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
</style>
