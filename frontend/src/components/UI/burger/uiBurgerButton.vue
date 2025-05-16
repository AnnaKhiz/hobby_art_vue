<template>
	<div
		class="menu__btn"
		id="callBurger"
		:class="{'active': isShow}"
		@click="isShow = !isShow"
	>
		<span></span>
		<span></span>
		<span></span>
	</div>

	<teleport to="body">
		<ui-modal-window
			v-if="isShow"
			@close="setDisplayDialogState(false)"
		>
			<template #default>
				<ui-burger-body @update-is-show="isShow = $event" />
			</template>
		</ui-modal-window>
	</teleport>
</template>

<script>
import UiBurgerBody from "@/components/UI/burger/uiBurgerBody.vue";
import UiModalWindow from "@/components/UI/modal/uiModalWindow.vue";
import { mapMutations } from "vuex";

export default {
	name: "uiBurgerButton.vue",
	components: {UiModalWindow, UiBurgerBody},
	data() {
		return {
			isShow: false,
		}
	},
	methods: {
		...mapMutations({
			setDisplayDialogState: 'dialog/setDisplayDialogState',
		}),
	}
}
</script>
