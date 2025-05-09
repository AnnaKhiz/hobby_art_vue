<template>
	{{errors}}
    <form class="modal__registration-form login px-10">
      <h2 class="modal__registration-form-label login">
        Войти в личный кабинет
      </h2>
      <div class="modal__registration-form-error-block" >
        {{ message }}
      </div>
			<div class="login-input-container">
				<input
					v-model="entityData.login"
					type="text"
					placeholder="Email"
					value="eve.holt@reqres.in"
				>
				<span class="modal__registration-form-error-block small" v-if="errors.login">{{ errors.login }}</span>
			</div>
      <div class="login-input-container">
				<input
					v-model="entityData.password"
					type="password"
					placeholder="Пароль"
					value="pistol"
				>
				<span class="modal__registration-form-error-block small" v-if="errors.password">{{ errors.password }}</span>
			</div>

      <div class="modal__registration-subitem-ch">
        <input
            v-model="entityData.mailing"
            :value="false"
            type="checkbox"
        >
        <label for="checkbox-save-user" class="checkbox-label">Запомнить меня</label>
      </div>

      <div class="modal__registration-subitem">
        <a
					href="#"
					class="modal__registration-form-button"
					@click.prevent="logIn"
				>
					Войти
				</a>
        <a
					href="#"
					class="modal__registration-block-text"
				>
          Забыли пароль?
        </a>
      </div>
    </form>
    <div class="modal__login-block-register">
      <p class="modal__login-block-text">
        Вы еще не зарегистрированы?
      </p>
      <a
				href="#"
				class="modal__login-block-button"
				@click.stop="$router.push({ name: 'user-regist'})"
			>
        Регистрация
      </a>
    </div>

</template>

<script>

import {
	mapActions,
	mapGetters,
	mapMutations
} from "vuex";
import * as yup from 'yup'

export default {
  name: "uiLoginForm",
  data() {
    return {
      entityData: {},
      message: '',
			errors: {}
    }
  },
  computed: {
    ...mapGetters({
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
	async validation() {
		const schema = yup.object({
			login: yup.string().email('Неправильный email').required('Email обязателен'),
			password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен')
		})

		try {
			await schema.validate(this.entityData, { abortEarly: false });
			this.message = 'Пожалуйста, подождите';
			this.errors = {};
		} catch (error) {
			error.inner.forEach((validationError) => {
				this.errors[validationError.path] = validationError.message
			})
		}
	},

	async logIn() {
		await this.validation();

		const { login, password } = this.errors;
		if (login || password) return;


		const result = await this.userLogIn(this.entityData);

		if (!result.result) {
			this.message = 'Пользователь не найден';
			return;
		}

		this.message = '';
		localStorage.setItem('auth', 'true');

		if (result.role === 'admin') {
			this.$router.push({ name: 'admin'});
		} else {
			this.$router.push({ name: 'User', params: { id: this.userInfo._id }});
		}
		this.setDisplayDialogState(false);
		}
	},
}
</script>
<style scoped lang="sass">
.login-input-container
	position: relative
	margin-bottom: 30px
.small
	position: absolute
	bottom: -35px
	left: 10px
	font-size: 0.8rem
</style>
