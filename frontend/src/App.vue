<template>
  <div :class=" [{ fixed: getDisplayDialogState}, { 'bg-white' : ($router.currentRoute.value.name === 'product-page-details' || $router.currentRoute.value.name === 'basket')}] ">
    <header-component
      v-if="!$route.path.match(/^\/admin($|\/.*)/)"
    />
    <router-view />
    <footer-component
      v-if="!$route.path.match(/^\/admin($|\/.*)/) && !loading"
    />
  </div>

</template>

<script>


import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
		FooterComponent,
		HeaderComponent
	},
  computed: {
    ...mapGetters({
      getDisplayDialogState: 'dialog/getDisplayDialogState',
			isLoading: 'items/isLoading'
    }),
		loading() {
			return this.isLoading;
		}
  },
}
</script>

<style lang="sass">
@import "./sass/style.sass"
</style>
