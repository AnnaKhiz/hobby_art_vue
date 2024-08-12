<template>
  <div class="main__user-page-content-editable-content" style="position: relative" >
    <p class="info-message">
      {{message}}
    </p>
    <p class="main__user-page-content-user-name data-page">
      Мои данные
    </p>
    <div class="main__user-page-content-block-data">
      <ul class="main__user-page-content-user-data">
        <li v-for="(item, index) in userData" :key="index">
          <label :for="item.idLabel" class="form-label">{{item.text}}</label>
          <input
            v-model="entityDataUser[item.value]"
            :type="item.value !== 'password' ? 'text' : 'password'"
            :placeholder="item.text"
            :id="item.idLabel"
            ref="inputs"
            @input="entityDataResult[item.value] = entityDataUser[item.value]"
          />
          <a href="" class="main__user-page-content-user-edit-link" @click.prevent="focusInput(index)">
            <img src="../../assets/img/edit.svg" alt="edit icon">Изменить
          </a>
        </li>
      </ul>
    </div>
    <a href="" class="main__user-page-content-user-save-button" @click.prevent="saveChanges">Сохранить данные</a>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "uiUserPageAboutForm",
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      message: '',
      entityDataResult: {},
      entityDataUser: {},
      userData: [
        { text: 'Имя:', value: 'name', idLabel: 'user-name' },
        { text: 'Фамилия:', value: 'lastName', idLabel: 'user-surname' },
        { text: 'Отчество:', value: 'surName', idLabel: 'user-surname-2' },
        { text: 'Дата рождения:', value: 'birthDate', idLabel: 'user-birth-date' },
        { text: 'Номер телефона:', value: 'phone', idLabel: 'user-phone' },
        { text: 'E-mail:', value: 'email', idLabel: 'user-email' },
        { text: 'Адрес:', value: 'address', idLabel: 'user-address' },
        { text: 'Сменить пароль:', value: 'password', idLabel: 'user-password' },
      ]
    }
  },
  methods: {
    focusInput(index) {
      this.$refs.inputs[index].focus()
    },
    async saveChanges() {
      const result = await fetch('http://localhost:3000/user/edit', {
        method: 'PATCH',
        body: JSON.stringify(this.entityDataResult),
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      });

      const data = await result.json()

      if (!data.result) return;

      this.message = 'Данные успешно обновлены. Страница будет перезагружена автоматически.'

      setTimeout(() => {
        this.message = '';
        this.$router.go(0)
      }, 1500)

    }
  },
  mounted() {
    this.entityDataUser = this.user
  }
}
</script>

<style scoped lang="sass">
.form-label
  display: block
  padding-left: 20px
  margin-bottom: 5px
.info-message
  color: red
  height: 20px
  position: absolute
  top: 0
  left: 0
</style>
