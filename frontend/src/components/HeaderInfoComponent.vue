<template>
	<section class="header__contacts">
		<div class="container">
			<ui-contacts :custom-class="'header__contacts-list'"/>
		</div>
	</section>
</template>

<script>
import UiContacts from "@/components/UI/uiContacts.vue";

export default {
	name: "HeaderInfoComponent",
  components: { UiContacts },
}
</script>
