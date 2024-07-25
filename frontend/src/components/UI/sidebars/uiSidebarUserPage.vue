<template>
  <div class="main__user-page-content-block first-block" id="user-page-content-block">

    <div class="main__user-page-content-user-info" id="user-name-info">
      <div class="main__user-page-content-user-photo" id="auth-user-photo">
        <img src="@/assets/img/user-photo.png" alt="user-photo">
      </div>
      <p class="main__user-page-content-user-name" id="auth-user-name">
        {{ user.name }} {{ user.lastName }}
      </p>

    </div>

    <ul class="main__user-page-content-user-list" id="user-menu-list">
      <li
        v-for="link in userSidebarItems"
        :key="link.value"
      >
        <a :href="link.url" id="my-data" @click.prevent="$emit('input', link.value)">{{ link.text }}</a>
      </li>
    </ul>
    <a
      href=""
      class="main__user-page-content-user-exit"
      id="user-page-exit"
      @click.stop="logOut"
    >
      Выйти из личного кабинета
    </a>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import axios from "axios";

export default {
  name: "uiSidebarUserPage.vue",
	props: {
		user: {
			type: Object,
			default: () => {
        return {
          name: '',
          login: '',
          lastName: '',
          surName: '',
          birthDate: '',
          phone: '',
          email: '',
          address: '',
          bonuses: '',
          mailing: false,
          password: '',
          passwordSubmit: false
        }
      }
		}
	},
  data() {
    return {
      // userData: {},
      userSidebarItems: [
        { text: 'Мои данные', value: 'general', url: '' },
        { text: 'Бонусный счет', value: 'bonuses', url: '' },
        { text: 'Избранные товары', value: 'favorites', url: '' },
        { text: 'История заказов', value: 'history', url: '' },
        { text: 'Рассылка', value: 'mailing', url: '' },
        { text: 'Отзывы', value: 'feedback', url: '' },
      ]
    }
  },
  computed: {
    ...mapGetters({
      getUserInfo: 'user/getUserInfo',
    }),
  },
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),
    async logOut() {
      this.setIsAuthorizedInfo(false)
      localStorage.setItem('auth', 'false');

      const result = await axios.get('/user/logout');

      // if(!result) {
      //   console.log('did not logout')
      //   return
      // }

      console.log('logout res', result)

      this.$router.push('/')
    }
    // async getUser() {
      // this.userData = this.getUserInfo;
      // if (!userData) {
      //   return
      // }
      // const result = await fetch(`http://localhost:5000/user/${localStorage.getItem('id')}`)

      // const data = await result.json()
      // const [ user ] = data.user
      // this.userData = user
      // console.log(this.userData)
    // }
  },
  mounted() {
    console.log(this.user)
    // this.getUser()
  }

}
</script>

<style scoped lang="sass">

</style>
