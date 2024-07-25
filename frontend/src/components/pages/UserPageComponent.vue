<template>
  <main class="main">
    <ui-main-banner />
    <section class="main__user-page">
      <div class="container">
        <ui-breadcrumbs link="Личный кабинет"/>
        <section class="main__user-page-container">
          <h2 class="main__user-page-content-label">Личный кабинет</h2>

          <div class="main__user-page-content">
            <ui-sidebar-user-page
              @input="currentLink = $event"
							:user="user"
						/>

            <div class="main__user-page-content-block second-block main__user-page-content">
              <user-page-about-form v-if="currentLink === 'general'"/>
              <user-page-bonuses v-if="currentLink === 'bonuses'" />
              <!--  передать пропс bonuses  -->
              <user-page-favorites v-if="currentLink === 'favorites'" :user="user"/>
              <user-page-history v-if="currentLink === 'history'" :user="user" />
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
import UiMainBanner from "@/components/UI/sliders/uiMainBanner.vue";
import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue";
import UiSidebarUserPage from "@/components/UI/sidebars/uiSidebarUserPage.vue";
import axios from 'axios';
import {mapMutations} from "vuex";
import userPageAboutForm from "@/components/user-page/userPageAboutForm.vue"
import UserPageBonuses from "@/components/user-page/userPageBonuses.vue"
import UserPageFavorites from "@/components/user-page/userPageFavorites.vue"
import UserPageHistory from "@/components/user-page/userPageHistory.vue"


export default {
  name: "UserPageComponent.vue",
  components: {
    UserPageHistory,
    UserPageFavorites, UserPageBonuses, userPageAboutForm, UiSidebarUserPage, UiBreadcrumbs, UiMainBanner},
  props: {
    id: String
  },
	data() {
		return {
			user: {},
      currentLink: 'general'
		}
	},
	computed: {
		// userId() {
		// 	return this.$route.params.id
		// }
	},
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),
    async getUser() {
			// const token = localStorage.getItem('token')
      // console.log(this.id)
      const result = await axios.get(`/user`);
      if (!result) {
        console.log('no requested result')
      }
      console.log(result)
      this.setIsAuthorizedInfo(true)
      // localStorage.setItem('auth', 'true')
			this.user = await result.data.user[0]

      this.$router.push(`/user_page/${this.user._id}`);
      console.log(this.user)
    }
  },
  mounted() {
    console.log('mounted')
    // this.getUser()

  }

}
</script>

<style scoped lang="sass">

</style>
