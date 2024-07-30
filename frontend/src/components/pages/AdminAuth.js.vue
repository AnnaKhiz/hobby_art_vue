<template>
  <div class="admin-form">
    <div class="scroll_on" v-if="getIsRegisteredInfo" >
      <form action="#" class="modal__registration-form login" id="login-form">
        <h2 class="modal__registration-form-label login">
          Войти в личный кабинет
        </h2>
        <div class="modal__registration-form-error-block" id="enter-error-block" >
        </div>
        <input
          v-model="entityData.login"
          type="text"
          placeholder="Email"
          value="eve.holt@reqres.in"
        >
        <input
          v-model="entityData.password"
          type="password"
          placeholder="Пароль"
          value="pistol"
        >
        <button
          class="modal__registration-form-button"
          @click.prevent="logIn"
        >
          Войти
        </button>
      </form>
  </div>
  </div>

</template>

<script>
import {mapGetters, mapMutations} from "vuex";
// import axios from "axios";

export default {
  name: "AdminAuth.js",
  data() {
    return {
      entityData: {}
    }
  },
  computed: {
    ...mapGetters({
      getIsRegisteredInfo: 'user/getIsRegisteredInfo'
    })
  },
  methods: {
    ...mapMutations({
      setIsRegisteredInfo: 'user/setIsRegisteredInfo',
      setDisplayDialogState: 'dialog/setDisplayDialogState',
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo',
      setUserInfo: 'user/setUserInfo'
    }),
    async initPage() {
      const result = await fetch('http://localhost:3000/admin/login', {
        method: 'GET',
        credentials: 'include'
      })
      const data = await result.json()
      console.log(data)
      if (data.result) {
        this.$router.push('/admin/login')
      }
    },

    async logIn() {

      const result = await fetch(`http://localhost:3000/admin/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.entityData),
        headers: { "Content-Type": "application/json" }
      });

      const data = await result.json()
      if (!data.result) {
        console.log('no requested result')
      }
      // localStorage.setItem('auth', 'true')
      // this.user = data.result
      // this.setUserInfo = this.user
      if (result.role === 'admin') {
        this.$router.push(`/admin`)
      } else {
        this.$router.back()
      }

      // this.setIsRegisteredInfo(true)
      // this.setIsAuthorizedInfo(true)
      this.setDisplayDialogState(false)
      console.log(this.user)
    }
  },
  mounted() {
    // await this.initPage()
  }
}
</script>

<style scoped lang="sass">
.admin-form
  width: 30%
  margin: 50px auto
.login
  &::after
    content: none
</style>
