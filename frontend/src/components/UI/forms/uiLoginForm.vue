<template>
  <div class="scroll_on" id="login-inner-content" v-if="getIsRegisteredInfo" >
    <form action="#" class="modal__registration-form login" id="login-form">
      <h2 class="modal__registration-form-label login">
        Войти в личный кабинет
      </h2>
      <div class="modal__registration-form-error-block" id="enter-error-block" >

      </div>
      <input
          v-model="entityData.name"
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
      <div class="modal__registration-subitem-ch">
        <input
            v-model="entityData.mailing"
            :value="false"
            type="checkbox"
        >
        <label for="checkbox-save-user" class="checkbox-label">Запомнить меня</label>
      </div>

      <div class="modal__registration-subitem">
        <a href="#" class="modal__registration-form-button" id="modal-registration-login" @click.prevent="logIn">Войти</a>
        <a href="#" class="modal__registration-block-text" id="modal-registration-forgot-button">
          Забыли пароль?
        </a>
      </div>
    </form>
    <div class="modal__login-block-register">
      <p class="modal__login-block-text">
        Вы еще не зарегистрированы?
      </p>
      <a href="#" class="modal__login-block-button" id="regist-button" @click.stop="setIsRegisteredInfo(false)">
        Регистрация
      </a>
    </div>
  </div>
  <ui-regist-form  v-else/>

</template>

<script>
import UiRegistForm from "@/components/UI/forms/uiRegistForm.vue"
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "uiLoginForm.vue",
  components: {UiRegistForm},
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
      setIsRegisteredInfo: 'user/setIsRegisteredInfo'
    }),

    logIn() {
      console.log(this.entityData)
    }
  }
}
</script>

<style scoped lang="sass">

</style>