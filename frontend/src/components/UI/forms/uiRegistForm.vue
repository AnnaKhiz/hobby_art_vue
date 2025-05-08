<template>
	<form
		class="modal__registration-form regist"
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
export default {
  name: "uiRegistForm",
  data() {
    return {
      entityData: {
        mailing: false
      },
      error: ''
    }
  },
  methods: {
    ...mapMutations({
      setDisplayDialogState: 'dialog/setDisplayDialogState',
    }),
		...mapActions('user', ['userRegister']),

    async registerOne() {
			const result = await this.userRegister({
				...this.entityData,
				login: this.entityData.email
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
