<template>
  <div class="scroll_on" id="regist-inner-content">
    <form action="#" class="modal__registration-form" id="registration-form">
      <h2 class="modal__registration-form-label">
        Регистрация
      </h2>
      <div class="error-message error-block" id="reg-error-block"></div>
      <input
          v-model="entityData.name"
          type="text"
          placeholder="Имя"
          required
      >
      <input
          v-model="entityData.lastName"
          type="text"
          placeholder="Фамилия"
          required
      >
      <input type="text" name="sur-name" id="user-sur-name-reg" placeholder="Отчество" data-register="new-user" required>
      <input type="tel" name="phone" id="regist-user-phone-reg" placeholder="Номер телефона" data-register="new-user" required>
      <input type="email" name="email" id="user-email-reg" placeholder="E-mail" data-register="new-user" required>
      <input
          v-model="entityData.password"
          type="password"
          placeholder="Придумайте пароль"
          required>
      <input type="password" name="password-confirm" id="user-confirm-password-reg" placeholder="Повторите пароль" data-register="new-user" required>
      <span class="modal__registration-form-message">Пароль должен содержать от 6 символов</span>
      <span class="modal__registration-form-message sec">(большие и маленькие латинские буквы, цифры)</span>

      <button class="modal__registration-form-button" id="send-registered-data" @click.prevent="registerOne">Зарегистрироваться</button>
    </form>

    <div class="modal__registration-block-login">
      <p class="modal__registration-block-text">
        Есть аккаунт?
      </p>
      <a href="#" class="modal__registration-block-button" id="login-button" data-modal="callModal" @click.stop="setIsRegisteredInfo(true)">
        Войти
      </a>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "uiRegistForm.vue",
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

    async registerOne() {
      console.log(this.entityData)
      const result = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.entityData)
          }
      )
      console.log(result)
    }
  }
}
</script>

<style scoped lang="sass">

</style>