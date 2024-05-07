<template>
  <div :class=" { fixed: getDisplayDialogState }">
    <header-component />
    <router-view />
    <footer-component />
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
  }

}
</script>

<style lang="sass">
@import "./sass/style.sass"
</style>
