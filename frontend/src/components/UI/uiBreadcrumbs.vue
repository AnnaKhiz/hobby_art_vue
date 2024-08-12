<template>
  <div class="main__delivery__page-breadcrumbs">
    <ul class="main__delivery__page-breadcrumbs-list">
      <li><a @click="$router.push('/')" style="cursor: pointer">Главная</a></li>
      <li><span class="arrow-symbol">&#8594;</span></li>
      <li v-if="product"><a @click="`${$router.push('/#catalog')}`" style="cursor: pointer">Каталог</a></li>
      <li v-if="product"><span class="arrow-symbol">&#8594;</span></li>
      <li>{{ product ? changeLinkValueSidebarToText : changeLinkValueToText }}</li>
    </ul>
  </div>
</template>

<script>


import {mapGetters} from "vuex";

export default {
  name: "uiBreadcrumbs",
  props: {
    link: {
      type: String,
      default: ''
    },
    product: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      getNavMenuLinks: 'links/getNavMenuLinks',
      getSidebarGeneralItems: 'links/getSidebarGeneralItems'
    }),

    changeLinkValueToText() {
      const links = [...this.getNavMenuLinks];
      const item = links.find(el => el.url === this.link);
      if (!item) {
        return
      }
      return item.text
    },
    changeLinkValueSidebarToText() {
      const links = [...this.getSidebarGeneralItems];
      const curLink = this.$router.currentRoute.value.href
      const item = links.find(el => curLink.includes(el.value));
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
