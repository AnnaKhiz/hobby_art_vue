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
							:user="user"
						/>

            <div class="main__user-page-content-block second-block main__user-page-content" id="user-page-date-block"></div>
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

export default {
  name: "UserPageComponent.vue",
  components: {UiSidebarUserPage, UiBreadcrumbs, UiMainBanner},
	data() {
		return {
			user: {}
		}
	},
	computed: {
		userId() {
			return this.$route.params.id
		}
	},
  methods: {
    async getUser() {
			const token = localStorage.getItem('token')
      const result = await axios(`http://localhost:5000/user/${token}`);
      if (!result) {
        console.log('no requested result')
      }
			this.user = result.data.user[0]
      console.log(this.user)
    }
  },
  mounted() {
    this.getUser()
  }

}
</script>

<style scoped lang="sass">

</style>