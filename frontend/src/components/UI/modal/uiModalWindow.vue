<template>
  <div class="modal" id="modal" :class="{ scroll : getDisplayDialogState }">
    <div class="modal__login">
      <div class="modal__registration-block login">
        <a href="#" id="closeModal" class="modal__registration-closeLink link-style login" @click.stop="$emit('close')">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 7L25 25" stroke="#EC6F5D" stroke-width="2"></path>
            <path d="M25 7L7 25" stroke="#EC6F5D" stroke-width="2"></path>
          </svg>
        </a>
        <div class="scroll_on" id="scroll-on-content">
          <slot name="default"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "uiModalWindow.vue",
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
}
</script>

<style scoped lang="sass">

</style>