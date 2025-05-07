<template>
  <div class="main__user-page-content-block first-block">
    <div class="main__user-page-content-user-info">
      <div class="main__user-page-content-user-photo">
        <img src="@/assets/img/user-photo.png" alt="user-photo">
      </div>
      <p class="main__user-page-content-user-name" >
        {{ userData.name }} {{ userData.lastName }}
      </p>

    </div>

    <ul class="main__user-page-content-user-list" >
      <li
        v-for="link in userSidebarItems"
        :key="link.value"
      >
        <a
					:href="link.url"
					@click.prevent="changeLink(link.value)"
				>
					{{ link.text }}
				</a>
      </li>
    </ul>
    <a
      href=""
      class="main__user-page-content-user-exit"
      @click.stop="logOut"
    >
      Выйти из личного кабинета
    </a>
  </div>
</template>

<script>
import {
	mapGetters,
	mapMutations,
	mapActions
} from "vuex";

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
		changeLink(link) {
			this.$router.push({
				name: 'User',
					params: {
				id: this.user._id,
			},
				query: {
					link,
				}
			})
		},
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
