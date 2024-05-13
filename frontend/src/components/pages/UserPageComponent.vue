<template>
  <main class="main">
    <ui-main-banner />
    <section class="main__user-page">
      <div class="container">
        <ui-breadcrumbs link="Личный кабинет"/>
        <section class="main__user-page-container">
          <h2 class="main__user-page-content-label">Личный кабинет</h2>

          <div class="main__user-page-content">
            <ui-sidebar-user-page />

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
  methods: {
    async getUser() {
      const result = await axios('http://localhost:5000/user/:id');
      if (!result) {
        console.log('no requested result')
      }
      console.log(result)
    }
  },
  mounted() {
    // this.getUser()
  }

}
</script>

<style scoped lang="sass">

</style>