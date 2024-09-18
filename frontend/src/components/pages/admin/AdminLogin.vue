<template>
  <main class="main admin"  style="text-align: left">
    <div class="container">
      <h2 class="container__label">Добро пожаловать в Админ панель!</h2>
      <div class="container__flex">
        <aside-menu
          :checked-menu="checkedMenu"
          @get-all="isNewFormData = false"
          @add-new="isNewFormData = true"
          @menu="checkedMenu = $event"
        />
        <div class="container__item content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapMutations} from "vuex";
import AsideMenu from "@/components/pages/admin/UI/AsideMenu.vue"


export default {
  name: "AdminLogin",
  components: {AsideMenu},
  data() {
    return {
      editFormData: {},
      itemsList: [],
      form: {},
      checkedMenu: '',
      isNewFormData: false
    }
  },
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),

    async initPage() {
      const result = await fetch('http://localhost:3000/admin', {
        method: 'GET',
        credentials: 'include'
      })
      const data = await result.json();

      if (!data.result) {
        this.$router.push('/admin/login');
      }
      this.$router.push('/admin/items');
    },
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
    flex-grow: 1
    height: 100%
  &__item
    border-radius: 24px
    background: rgba(255, 253, 253, 0.47)
    &.aside
      width: 30%
      background: rgba(199, 193, 187, 0.52)
      padding: 20px
      @media screen and (max-width: 1200px)
        padding: 10px
    &.content
      display: flex
      gap: 15px
      flex-wrap: wrap
      padding: 50px
      text-align: start
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
