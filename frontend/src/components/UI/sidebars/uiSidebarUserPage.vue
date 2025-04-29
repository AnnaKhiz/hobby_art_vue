<template>
  <div class="main__user-page-content-block first-block" id="user-page-content-block">

    <div class="main__user-page-content-user-info" id="user-name-info">
      <div class="main__user-page-content-user-photo" id="auth-user-photo">
        <img src="@/assets/img/user-photo.png" alt="user-photo">
      </div>
      <p class="main__user-page-content-user-name" id="auth-user-name">
        {{ userData.name }} {{ userData.lastName }}
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
import {mapGetters, mapMutations, mapActions} from "vuex";
// import axios from "axios";

export default {
  name: "uiSidebarUserPage",
	props: {
		user: {
			type: Object,
			default: () => {}
		}
	},
  data() {
    return {
      userData: {},
    }
  },
  computed: {
    ...mapGetters({
      getUserInfo: 'user/getUserInfo',
			userSidebarItems: 'userSidebar/userSidebarItems',
    }),
  },
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),
		...mapActions('user', ['logOutUser']),
    async logOut() {
			await this.logOutUser();
      this.setIsAuthorizedInfo(false);
      localStorage.setItem('auth', 'false');

      this.$router.push({ name: 'HobbyArt'});
    }

  },
  mounted() {
    this.userData = this.user;
  }

}
</script>

<style scoped lang="sass">

</style>
