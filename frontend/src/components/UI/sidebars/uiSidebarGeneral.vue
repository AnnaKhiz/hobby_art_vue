<template>
  <div class="main__delivery__page-sidebar" id="sidebar-catalog">
    <h3 class="main__delivery__page-label" id="sidebar">
      Каталог
    </h3>
    <ul id="sidebar-menu">
      <li
          v-for="(item, index) in sidebarGeneralItems"
          :key="index"
      >
        <a href="#" >
          {{ item.text }}
          <img style="position: absolute; top: 0; right: 0" :src="require(`@/assets/img/catalog-img-link${item.id}.png`)" alt="link image">
        </a></li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "uiSidebarGeneral.vue",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      sidebarGeneralItems: 'links/getSidebarGeneralItems'
    }),
  }
}
</script>

<style scoped lang="sass">

</style>