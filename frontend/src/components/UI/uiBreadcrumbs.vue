<template>
  <div class="main__delivery__page-breadcrumbs">
    <ul class="main__delivery__page-breadcrumbs-list">
      <li><a href="/">Главная</a></li>
      <li><span class="arrow-symbol">&#8594;</span></li>
      <li>{{ changeLinkValueToText }}</li>
    </ul>
  </div>
</template>

<script>


import {mapGetters} from "vuex";

export default {
  name: "uiBreadcrumbs.vue",
  props: {
    link: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      getNavMenuLinks: 'links/getNavMenuLinks'
    }),

    changeLinkValueToText() {
      const links = [...this.getNavMenuLinks];
      const item = links.find(el => el.url === this.link);
      if (!item) {
        return
      }
      return item.text
    }
  },

}
</script>

<style scoped lang="sass">

</style>