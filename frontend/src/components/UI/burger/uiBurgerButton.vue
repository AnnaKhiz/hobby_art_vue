<template>
	<div
		class="menu__btn"
		id="callBurger"
		:class="[{'active': isShow}, {'user-info': user}]"
		@click="isShow = !isShow"
	>
		<span></span>
		<span ></span>
		<span></span>
	</div>

	<ui-burger-user-page
		v-if="user && isShow"
		:userData="userData"
		:is-show="isShow"
		:parent="parentRef"
		@update-is-show="isShow = $event"
	/>

	<teleport to="body" v-else >
		<ui-modal-window
			v-if="isShow && !user"
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
import UiBurgerUserPage from "@/components/UI/burger/uiBurgerUserPage.vue";

export default {
	name: "uiBurgerButton.vue",
	components: {UiBurgerUserPage, UiModalWindow, UiBurgerBody},
	props: {
		user: {
			type: Boolean,
			default: false
		},
		userData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			isShow: false,
			parentRef: null
		}
	},
	methods: {
		...mapMutations({
			setDisplayDialogState: 'dialog/setDisplayDialogState',
		}),
	},
	mounted() {
		this.parentRef = this.$refs.burgerButton;
	}
}
</script>
<style scoped lang="sass">
.user-info
	top: 20px
	& > span
		background-color: black
	&.active span:nth-of-type(2),
	&.active span:nth-of-type(3)
		background-color: black
</style>
