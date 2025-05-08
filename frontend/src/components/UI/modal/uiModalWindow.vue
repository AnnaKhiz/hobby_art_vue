<template>
  <div
		class="modal"
		:class="[{ 'scroll' : getDisplayDialogState }]"
	>
    <div class="modal__login">
      <div class="modal__registration-block login" :class="{'w-75' : full }">
        <ui-close-icon @close="handleClose" />
        <div class="scroll_on">
          <slot name="default"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UiCloseIcon from "@/components/UI/icons/uiCloseIcon.vue";

export default {
  name: "uiModalWindow",
  components: { UiCloseIcon },
	props: {
		full: {
			type: Boolean,
			default: false
		}
	},
	emits: ['close'],
  computed: {
    ...mapGetters({
      getDisplayDialogState: 'dialog/getDisplayDialogState'
    })
  },
	methods: {
		handleClose() {
			this.$emit('close');
			this.$router.push({ name: 'HobbyArt'});
		}
	}
}
</script>
