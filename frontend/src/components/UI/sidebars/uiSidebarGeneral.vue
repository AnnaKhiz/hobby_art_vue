<template>
  <div class="main__delivery__page-sidebar">
    <h3 class="main__delivery__page-label" @click="isShow = !isShow">
      Каталог
    </h3>
    <ul :class="{ 'hidden': !isShow && hidden }" >
      <li
          v-for="(item, index) in sidebarGeneralItems"
          :key="index"
      >
        <a href="#" >
          {{ item.text }}
          <img class="link-image" :src="require(`@/assets/img/catalog-img-link${item.id}.png`)" alt="link image">
        </a></li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "uiSidebarGeneral",
  data() {
    return {
			isShow: false,
    }
  },
  computed: {
    ...mapGetters({
      sidebarGeneralItems: 'links/getSidebarGeneralItems'
    }),
		hidden() {
			return window.innerWidth <= '765';
		}
  }
}
</script>

<style scoped lang="sass">
.link-image
	position: absolute
	top: 0
	right: 0
	@media screen and (max-width: 920px)
		display: none
.hidden
	display: none
</style>
