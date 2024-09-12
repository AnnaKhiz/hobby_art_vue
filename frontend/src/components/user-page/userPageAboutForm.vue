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
            v-if="item.value.includes('address')"
            v-model="entityDataUser.address[(item.value).slice(8)]"
            :type="item.value !== 'password' ? 'text' : 'password'"
            :placeholder="item.text"
            :id="item.idLabel"
            ref="inputs"
            @input="entityDataResult[item.value] = entityDataUser.address[(item.value).slice(8)]"
          />
          <input
            v-else
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
      entityDataUser: {address:{}},
      userData: [
          { text: 'Имя:', value: 'name', idLabel: 'user-name', isReadable: false },
          { text: 'Фамилия:', value: 'lastName', idLabel: 'user-surname', isReadable: false},
          { text: 'Отчество:', value: 'surName', idLabel: 'user-surname-2', isReadable: false },
          { text: 'Дата рождения:', value: 'birthDate', idLabel: 'user-birth-date', isReadable: false },
          { text: 'Номер телефона:', value: 'phone', idLabel: 'user-phone', isReadable: false },
          { text: 'E-mail:', value: 'email', idLabel: 'user-email', isReadable: false },
          { text: 'Город:', value: 'address.city', idLabel: 'user-city', isReadable: true },
          { text: 'Улица:', value: 'address.street', idLabel: 'user-street', isReadable: true },
          { text: 'Дом:', value: 'address.house', idLabel: 'user-house', isReadable: true },
          { text: 'Квартира:', value: 'address.apartment', idLabel: 'user-apartment', isReadable: true },
          { text: 'Индекс:', value: 'address.zipCode', idLabel: 'user-code', isReadable: true },
          { text: 'Сменить пароль:', value: 'password', idLabel: 'user-password', isReadable: false },
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

      console.log('edited user', data)

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
    console.log('mounted', this.entityDataUser)
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
