<template>
	<header-component />
  <router-view />
	<footer-component />
</template>

<script>


import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: 'App',
  components: {
		FooterComponent,
		HeaderComponent

	}
}
</script>

<style lang="sass">
@import "./sass/style.sass"
</style>
