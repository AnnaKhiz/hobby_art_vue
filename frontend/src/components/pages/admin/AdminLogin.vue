<template>
  <main class="main admin"  style="text-align: left">
    <div class="container">
      <h2 class="container__label">Добро пожаловать в Админ панель!</h2>
      <div class="container__flex">
        <div class="container__item aside">
          <button @click="openMenu('items')" class="modal__registration-form-button block">Товары</button>
          <div v-if="checkedMenu === 'items'" class="sidebar">
            <a href="#" class="sidebar__submenu" @click.prevent="getItemsList">Все товары</a>
            <a href="#" class="sidebar__submenu"  @click.prevent="openAddProduct" >Добавить товар</a>
          </div>
          <button @click="openMenu('orders')" class="modal__registration-form-button block">Заказы</button>
          <button @click="openMenu('users')" class="modal__registration-form-button block">Пользователи</button>
          <button @click="openMenu('comments')" class="modal__registration-form-button block">Комментарии</button>
          <button @click="logOut" class="modal__registration-form-button block exit">Выход</button>
        </div>
        <div v-if="checkedMenu === 'items'" class="container__item content">
          <div v-if="!addItem" class="items-container">
            <ui-admin-product-card  :itemsList="itemsList" @update="removeProduct" @editItem="openEditItem"/>
          </div>
          <admin-items-form v-else @goBack="addProduct" :editFormData="editFormData" @submitEdit="editItem"/>
        </div>
        <div v-else class="container__item content">
          <div class="items-container" >
            <ui-admin-orders-card />
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script>




import AdminItemsForm from "@/components/pages/admin/UI/adminItemsForm.vue"
import {mapMutations} from "vuex";
import UiAdminProductCard from "@/components/pages/admin/UI/uiAdminProductCard.vue"
import UiAdminOrdersCard from "@/components/pages/admin/UI/uiAdminOrdersCard.vue"


export default {
  name: "AdminLogin",
  components: {UiAdminOrdersCard, UiAdminProductCard, AdminItemsForm},
  data() {
    return {
      editFormData: {},
      itemsList: [],
      form: {},
      checkedMenu: '',
      addItem: false
    }
  },
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),
    openAddProduct() {
      this.addItem = true;
      this.editFormData = {}
    },
    openEditItem(item) {
      this.addItem = true
      this.editFormData = item
    },
    async editItem(item) {

      try {
        const result = await fetch(`http://localhost:3000/api/items/update/${item._id}`, {
          method: 'PATCH',
          body: JSON.stringify(item),
          headers: { "Content-Type": "application/json" }
        })

        const data = await result.json();

        if (!data.result) return;

        const index = this.itemsList.findIndex(element => element._id === item._id);
        if (index === -1) return false;

        this.itemsList[index] = item;
        this.addItem = false;

      } catch (error) {
        console.log(error)
      }
    },

    openMenu(name) {
      this.checkedMenu = name
      name === 'items' ? this.getItemsList() : ''
    },

    addProduct(item) {
      this.addItem = false;
      this.editFormData = {}
      this.itemsList.push(item)
    },

    removeProduct(id) {
      const index = this.itemsList.findIndex(el => el._id === id)

      console.log(index)

      if (index === -1) return;

      this.itemsList.splice(index, 1)
    },
    async getItemsList() {
      this.addItem = false
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

      await this.getItemsList()
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

  },
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
