<template>
	<section class="header__contacts">
		<div class="container">
			<ui-contacts :custom-class="'header__contacts-list'">
				<template #burger >
					<ui-burger-button />
				</template>
			</ui-contacts>
		</div>
	</section>
</template>

<script>
import UiContacts from "@/components/UI/uiContacts.vue";
import UiBurgerButton from "@/components/UI/burger/uiBurgerButton.vue";

export default {
	name: "HeaderInfoComponent",
  components: { UiBurgerButton, UiContacts },
}
</script>
