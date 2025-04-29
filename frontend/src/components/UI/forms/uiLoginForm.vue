<template>
  <div class="scroll_on" id="login-inner-content" v-if="getIsRegisteredInfo" >
    <form action="#" class="modal__registration-form login" id="login-form">
      <h2 class="modal__registration-form-label login">
        Войти в личный кабинет
      </h2>
      <div class="modal__registration-form-error-block" >
        {{ message }}
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
import {
	mapActions,
	mapGetters,
	mapMutations
} from "vuex";

export default {
  name: "uiLoginForm",
  components: { UiRegistForm },
  data() {
    return {
      entityData: {},
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      getIsRegisteredInfo: 'user/getIsRegisteredInfo',
			userInfo: 'user/userInfo'
    })
  },
  methods: {
		...mapMutations({
			setIsRegisteredInfo: 'user/setIsRegisteredInfo',
      setDisplayDialogState: 'dialog/setDisplayDialogState',
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo',
      setUserInfo: 'user/setUserInfo'
		}),
		...mapActions('user', ['userLogIn']),

		async logIn() {
			const result = await this.userLogIn(this.entityData);

      if (!result.result) {
        this.message = 'Пользователь не найден';
        return;
			}

      this.message = '';
      localStorage.setItem('auth', 'true');

      if (result.role === 'admin') {
        this.$router.push(`/admin`);
      } else {
        this.$router.push(`/user/page/${this.userInfo._id}`);
      }
      this.setDisplayDialogState(false);
		}
	},
}
</script>
