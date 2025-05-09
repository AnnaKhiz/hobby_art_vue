<template>
	{{errors}}
	<form
		class="modal__registration-form regist px-10"
	>
		<h2 class="modal__registration-form-label">
			Регистрация
		</h2>
		<p
			v-if="error"
			class="error-message"
		>
			{{ error }}
		</p>
		<div class="login-input-container">
			<input
				v-model="entityData.name"
				type="text"
				placeholder="Имя"
				required
			/>
			<span class="modal__registration-form-error-block small" v-if="errors.name">{{ errors.name }}</span>
		</div>
		<div class="login-input-container">
			<input
				v-model="entityData.lastName"
				type="text"
				placeholder="Фамилия"
				required
			/>
			<span class="modal__registration-form-error-block small" v-if="errors.lastName">{{ errors.lastName }}</span>
		</div>
		<div class="login-input-container">
			<input
				v-model="entityData.surName"
				type="text"
				placeholder="Отчество"
				required
			/>
			<span class="modal__registration-form-error-block small" v-if="errors.surName">{{ errors.surName }}</span>
		</div>
		<div class="login-input-container">
			<input
				v-model="entityData.phone"
				type="tel"
				placeholder="Номер телефона"
				required
			/>
			<span class="modal__registration-form-error-block small" v-if="errors.phone">{{ errors.phone }}</span>
		</div>
		<div class="login-input-container">
			<input
				v-model="entityData.email"
				type="email"
				placeholder="E-mail"
				required
			/>
			<span class="modal__registration-form-error-block small" v-if="errors.email">{{ errors.email }}</span>
		</div>
		<div class="login-input-container">
			<input
				v-model="entityData.password"
				type="password"
				placeholder="Придумайте пароль"
				required
			/>
			<span class="modal__registration-form-error-block small" v-if="errors.password">{{ errors.password }}</span>
		</div>
		<div class="login-input-container">
			<input
				v-model="entityData.passwordSubmit"
				type="password"
				placeholder="Повторите пароль"
				required
			/>
			<span class="modal__registration-form-error-block small" v-if="errors.passwordSubmit">{{ errors.passwordSubmit }}</span>
		</div>
		<span
			class="modal__registration-form-message"
		>
			Пароль должен содержать от 6 символов
		</span>
		<span
			class="modal__registration-form-message sec"
		>
			(большие и маленькие латинские буквы, цифры)
		</span>

		<div class="modal__registration-subitem-ch ">
			<input
					v-model="entityData.mailing"
					:value="false"
					type="checkbox"
					id="checkbox-save-user"
			>
			<label
				for="checkbox-save-user"
				class="checkbox-label"
			>
				Запомнить меня
			</label>
		</div>

		<button
			class="modal__registration-form-button"
			@click.prevent="registerOne"
		>
			Зарегистрироваться
		</button>
	</form>

	<div class="modal__registration-block-login">
		<p class="modal__registration-block-text">
			Есть аккаунт?
		</p>
		<a
			href="#"
			class="modal__registration-block-button"
			@click.stop="$router.push({ name: 'user-login'})"
		>
			Войти
		</a>
	</div>

</template>

<script>
import {
	mapMutations,
	mapActions
} from "vuex";
import * as yup from 'yup';
export default {
  name: "uiRegistForm",
  data() {
    return {
      entityData: {
        mailing: false
      },
      error: '',
			errors: {}
    }
  },
  methods: {
    ...mapMutations({
      setDisplayDialogState: 'dialog/setDisplayDialogState',
    }),
		...mapActions('user', ['userRegister']),
		async validation() {
			const schema = yup.object({
				name: yup.string().min(2,'Имя не меньше 2 букв').required('Имя обязательно'),
				lastName: yup.string().min(2,'Фамилия не меньше 2 букв').required('Фамилия обязательна'),
				phone: yup.string().min(10,'Не менее 10 цифр').max(13, 'Не более 13 цифр').required('Телефон обязателен').matches(/^\d+$/, 'Только цифры'),
				email: yup.string().email('Неправильный формат email').required('Email обязателен'),
				password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
				passwordSubmit: yup.string()
					.min(6, 'Минимум 6 символов')
					.required('Подтверждение пароля обязательно')
					.oneOf([yup.ref('password')], 'Пароли не совпадают'),
			})

			try {
				await schema.validate(this.entityData, { abortEarly: false });
				this.error = 'Пожалуйста, подождите';

			} catch (error) {
				console.log('valid error', error)
				error.inner.forEach((validationError) => {
					this.errors[validationError.path] = validationError.message
				})
			}
		},

    async registerOne() {
			this.errors = {};
			await this.validation();

			const { name, lastName, login, password, phone, email, passwordSubmit } = this.errors;
			if ( name || lastName || login || password || phone || email || passwordSubmit ) return;

			const result = await this.userRegister({
				...this.entityData,
				login: this.entityData.email,
			})

      if (!result.result) {
        this.error = "Пользователь с таким email уже зарегистрирован!";
				return;
      }
			this.error = "Регистрация прошла успешно. Выполняется переадрессация...";

      localStorage.setItem('auth', 'true')
			setTimeout(() => {
				this.$router.push({ name: 'User', params: { id: result.id }});
				this.setDisplayDialogState(false);
				this.error = "";
			}, 1500)
    }
  }
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
