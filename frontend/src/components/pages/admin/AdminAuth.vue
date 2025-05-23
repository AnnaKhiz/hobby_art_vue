<template>
  <div class="admin-form">
    <div class="scroll_on" v-if="getIsRegisteredInfo" >
      <form action="#" class="modal__registration-form login" id="login-form">
        <h2 class="modal__registration-form-label login">
          Войти в личный кабинет
        </h2>
        <div class="modal__registration-form-error-block" id="enter-error-block" > {{ errorMessage }} </div>
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
import {
	mapActions,
	mapGetters,
	mapMutations
} from "vuex";

export default {
  name: "AdminAuth",
  data() {
    return {
      entityData: {},
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters({
      getIsRegisteredInfo: 'user/getIsRegisteredInfo'
    })
  },
  methods: {
    ...mapMutations({
      setDisplayDialogState: 'dialog/setDisplayDialogState',
    }),
		...mapActions({
			logInAdmin: 'admin/logInAdmin'
		}),

    async logIn() {
			const result = await this.logInAdmin(this.entityData);

      if (!result.result) {
        this.errorMessage = 'Не верный логин или пароль!';
        return;
      }

      if (result.role !== 'admin') {
        this.$router.back();
      }

      localStorage.setItem('auth', 'true');
      this.setDisplayDialogState(false);

      this.$router.push({ name: 'admin'});
    }
  },
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
