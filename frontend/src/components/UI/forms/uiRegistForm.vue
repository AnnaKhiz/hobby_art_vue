<template>
  <div  id="regist-inner-content">
    <form action="#" class="modal__registration-form regist" id="registration-form">
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
      <input
          v-model="entityData.surName"
          type="text"
          placeholder="Отчество"
          required>
      <input
          v-model="entityData.phone"
          type="tel"
          placeholder="Номер телефона"
          required
      >
      <input
          v-model="entityData.email"
          type="email"
          placeholder="E-mail"
          required
      >
      <input
          v-model="entityData.password"
          type="password"
          placeholder="Придумайте пароль"
          required>
      <input
          v-model="entityData.passwordSubmit"
          type="password"
          placeholder="Повторите пароль"
          required
      >
      <span class="modal__registration-form-message">Пароль должен содержать от 6 символов</span>
      <span class="modal__registration-form-message sec">(большие и маленькие латинские буквы, цифры)</span>
      <span class="error-message">{{ error }}</span>
      <div class="modal__registration-subitem-ch ">
        <input
            v-model="entityData.mailing"
            :value="false"
            type="checkbox"
            id="checkbox-save-user"
        >
        <label for="checkbox-save-user" class="checkbox-label">Запомнить меня</label>
      </div>

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
// import api from '../../../api';
import axios from 'axios';
export default {
  name: "uiRegistForm.vue",
  data() {
    return {
      entityData: {
        mailing: false
      },
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      getIsRegisteredInfo: 'user/getIsRegisteredInfo',
      getDisplayDialogState: 'dialog/getDisplayDialogState',

    })
  },
  methods: {
    ...mapMutations({
      setIsRegisteredInfo: 'user/setIsRegisteredInfo',
      setUserInfo: 'user/setUserInfo',
      setDisplayDialogState: 'dialog/setDisplayDialogState',
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),

    async registerOne() {
      console.log(this.entityData)

      const result = await axios.post('/register', {
          ...this.entityData,
          login: this.entityData.email
        })
      console.log(result)

      const data = await result.data
      if (result.status !== 200) {

        this.error = data.result
      }
			// localStorage.setItem('token', data.token)

      // document.cookie=`token=${data.token}`
      // this.setUserInfo(data.user);
      localStorage.setItem('auth', 'true')
      this.$router.push(`/user_page/${data.id}`);
      this.setDisplayDialogState(false)
      // this.setIsAuthorizedInfo(true)
      // console.log(data)
    }
  }
}
</script>

<style scoped lang="sass">

</style>
