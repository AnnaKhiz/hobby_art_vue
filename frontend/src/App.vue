<template>
  <div :class=" [{ fixed: getDisplayDialogState}, { 'bg-white' : $router.currentRoute.value.name === 'product-page-details'}] ">
    <header-component
      v-if="$router.currentRoute.value.href !== '/admin' && $router.currentRoute.value.href !== '/admin/login'"

    />
    <router-view />
    <footer-component
      v-if="$router.currentRoute.value.href !== '/admin' && $router.currentRoute.value.href !== '/admin/login'"
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
      getDisplayDialogState: 'dialog/getDisplayDialogState'
    })
  },
  // data() {
  //   return {
  //     active: false
  //   }
  // },
  methods: {
    // getModalActive(value) {
    //   this.active = value
    // }
  },
  mounted() {
    console.log(this.$router)
  }

}
</script>

<style lang="sass">
@import "./sass/style.sass"
</style>
