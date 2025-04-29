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
							:user="{...user}"
						/>

            <div class="main__user-page-content-block second-block main__user-page-content">
              <UserPageAboutForm
                v-if="currentLink === 'general'"
                :user="{...user}"
              />
              <UserPageBonuses
                v-if="currentLink === 'bonuses'"
                :bonuses="Number(user.bonuses)"
              />
              <UserPageFavorites
                v-if="currentLink === 'favorites'"
                :user="{...user}"
              />
              <UserPageHistory
                v-if="currentLink === 'history'"
                :user="{...user}"
              />
              <UserPageMailing
                v-if="currentLink === 'mailing'"
                :mailing="user.mailing"
                @mail="user.mailing = $event"
              />
              <UserPageFeedback
                v-if="currentLink === 'feedback'"
                :user="{...user}"
              />
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
import {mapActions, mapGetters, mapMutations} from "vuex";
import UserPageAboutForm from "@/components/user-page/UserPageAboutForm.vue"
import UserPageBonuses from "@/components/user-page/UserPageBonuses.vue"
import UserPageFavorites from "@/components/user-page/UserPageFavorites.vue"
import UserPageHistory from "@/components/user-page/UserPageHistory.vue"
import UserPageMailing from "@/components/user-page/UserPageMailing.vue"
import UserPageFeedback from "@/components/user-page/UserPageFeedback.vue"


export default {
  name: "UserPageComponent",
  components: {
    UserPageFeedback,
    UserPageMailing,
    UserPageHistory,
    UserPageFavorites,
		UserPageBonuses,
		UserPageAboutForm,
		UiSidebarUserPage,
		UiBreadcrumbs,
		UiMainBanner
	},
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
	computed: {
		...mapGetters({
			userInfo: 'user/userInfo',
		}),
	},
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo',
    }),
		...mapActions('user', ['getAuthUser']),

    async getUser() {
			const result = await this.getAuthUser();

      if (!result) {
        this.$router.back();
      } else {
        this.setIsAuthorizedInfo(true);
        this.user = this.userInfo;
        this.$router.push(`/user/page/${this.user._id}`);
      }

			this.currentLink = 'general';
			this.show = true;

    },

  },

  async created() {
    await this.getUser();
  }

}
</script>

<style scoped lang="sass">

</style>
