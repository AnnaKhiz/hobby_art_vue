<template>
  <main class="main">
    <ui-main-banner />
    <section class="main__delivery__page">
      <div class="container">
        <ui-breadcrumbs :link="getCheckedHeaderLink" />
        <section class="main__delivery__page-container">
          <ui-sidebar-general />
          <div class="main__content" id="main-content">
            <div class="main__delivery__page-content" >
              <div class="main__delivery__page-content-block">
                <h2 class="main__delivery__page-content-label">
                  О компании
                </h2>
                <div class="main__delivery__page-content-text-block">
                  <div class="main__delivery__page-content-photo">
                    <img src="@/assets/img/photo-about.png" alt="photo about">
                  </div>
                  <p class="main__delivery__page-content-text">Доброго времени! Рады видеть вас на нашем сайте!</p>
                  <p class="main__delivery__page-content-text">Наш магазин работает с 2012 года.</p>
                  <p class="main__delivery__page-content-text"> как многие, были увлечены различными видами творчества, любили пробовать
                    создавать, что-то новое, но вот выбора материалов тогда нашем городе  было. тогда  остановились, наши увлечения
                    к творчеству и рукоделию переросли в любимое дело и мы открыли небольшой магазинчик.</p>
                  <p class="main__delivery__page-content-text">Мы постарались создать уютное и удобное место, где каждый из вас сможет найти для
                    себя нужные материалы и инструменты для воплощения своих задумок и идей.
                    Каждый день мы находимся в поисках новых и качественных товаров для вас.</p>
                  <p class="main__delivery__page-content-text">И вот, в 2021 году, мы запускаем наш сайт, чтобы вам было ещё удобнее совершать покупки невыходя из дома.</p>
                  <p class="main__delivery__page-content-text">Мы продолжаем расти и развиваться.</p>
                  <p class="main__delivery__page-content-text">Спасибо, что вы с нами!</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

    </section>
  </main>
</template>

<script>
import {mapGetters} from "vuex";
import UiMainBanner from "@/components/UI/sliders/uiMainBanner.vue";
import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue";
import UiSidebarGeneral from "@/components/UI/sidebars/uiSidebarGeneral.vue";

export default {
  name: "AboutComponent",
  components: {UiSidebarGeneral, UiBreadcrumbs, UiMainBanner},
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
    }),
  },
}
</script>


<style scoped lang="sass">

</style>
