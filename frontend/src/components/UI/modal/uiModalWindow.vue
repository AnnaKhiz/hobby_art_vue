<template>
  <div class="modal" id="modal" :class="{ scroll : getDisplayDialogState }">
    <div class="modal__login">
      <div class="modal__registration-block login">
        <ui-close-icon @close="$emit('close')" />
        <div class="scroll_on" id="scroll-on-content">
          <slot name="default"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import UiCloseIcon from "@/components/UI/icons/uiCloseIcon.vue";

export default {
  name: "uiModalWindow",
  components: { UiCloseIcon },
  // props: {
  //   display: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  computed: {
    ...mapGetters({
      getDisplayDialogState: 'dialog/getDisplayDialogState'
    })
  },
  // beforeRouteEnter(to, from, next) {
  //   if (to.path) {
  //     console.log('1111111')
  //   }
  //   next()
  //   // this.$store.commit('setDisplayDialogState', true);
  // }

}
</script>

<style scoped lang="sass">

</style>
