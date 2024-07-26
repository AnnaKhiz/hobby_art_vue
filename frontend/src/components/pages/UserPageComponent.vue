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
              v-if="show"
              @input="currentLink = $event"
							:user="{...this.user}"
						/>

            <div class="main__user-page-content-block second-block main__user-page-content">
              <user-page-about-form v-if="currentLink === 'general'" :user="{...this.user}"/>
              <user-page-bonuses v-if="currentLink === 'bonuses'" :bonuses="Number(user.bonuses)"/>
              <!--  передать пропс bonuses  -->
              <user-page-favorites v-if="currentLink === 'favorites'" :user="{...this.user}"/>
              <user-page-history v-if="currentLink === 'history'" :user="{...this.user}" />
              <user-page-mailing v-if="currentLink === 'mailing'" :user="{...this.user}" />
              <user-page-feedback v-if="currentLink === 'feedback'" :user="{...this.user}" />
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
import UserPageMailing from "@/components/user-page/userPageMailing.vue"
import UserPageFeedback from "@/components/user-page/userPageFeedback.vue"


export default {
  name: "UserPageComponent.vue",
  components: {
    UserPageFeedback,
    UserPageMailing,
    UserPageHistory,
    UserPageFavorites, UserPageBonuses, userPageAboutForm, UiSidebarUserPage, UiBreadcrumbs, UiMainBanner},
  props: {
    id: String,
  },
	data() {
		return {
      show: false,
			user: {},
      currentLink: ''
		}
	},
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),
    async getUser() {
      const result = await axios.get(`/user`);
      if (!result) {
        console.log('no requested result')
        return
      }

      this.setIsAuthorizedInfo(true)
			this.user = await result.data.user[0]
      this.$router.push(`/user_page/${this.user._id}`);
      return this.user
    }
  },

  async created() {
    await this.getUser()
    this.currentLink = 'general'
    this.show = true;
  }

}
</script>

<style scoped lang="sass">

</style>
