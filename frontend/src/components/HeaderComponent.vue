<template>
	<header class="header">
		<header-info-component />
		<section class="header__menu">
			<div class="container">
				<div class="header__menu-container">
					<ui-header-navigation />
					<ui-logo />
					<ui-header-sub-navigation
						@update-user="updateUser($event)"
					/>
				</div>
			</div>
		</section>

    <teleport to="body" >
      <ui-modal-window
				v-if="getDisplayDialogState"
				@close="setDisplayDialogState(false)"
			>
        <template #default>
					<AuthenticationForm />
        </template>
      </ui-modal-window>
    </teleport>
	</header>
</template>
<script>
import HeaderInfoComponent from "@/components/HeaderInfoComponent.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import UiModalWindow from "@/components/UI/modal/uiModalWindow.vue";
import UiHeaderNavigation from "@/components/UI/header/uiHeaderNavigation.vue";
import UiHeaderSubNavigation from "@/components/UI/header/uiHeaderSubNavigation.vue";
import UiLogo from "@/components/UI/uiLogo.vue";
import AuthenticationForm from "@/components/UI/forms/AuthenticationForm.vue";

export default {
	name: "HeaderComponent",
	components: {
		AuthenticationForm,
		UiLogo,
		UiHeaderSubNavigation,
		UiHeaderNavigation,
		UiModalWindow,
		HeaderInfoComponent
	},
	data() {
		return {
      user: {},
		}
	},
  computed: {
    ...mapGetters({
      getDisplayDialogState: 'dialog/getDisplayDialogState',
    }),
  },
  methods: {
		...mapMutations({
			setDisplayDialogState: 'dialog/setDisplayDialogState',
			setIsAuthorizedInfo: 'user/setIsAuthorizedInfo',
		}),
		...mapActions('user', ['getAuthUser']),
		updateUser(data) {
			this.user = data;
		}
  },
	async mounted() {
		if (localStorage.getItem('auth') === 'true') {
			await this.getAuthUser();
			this.setIsAuthorizedInfo(true);
		}
	}
}
</script>

