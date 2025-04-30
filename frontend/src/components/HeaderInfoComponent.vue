<template>
	<section class="header__contacts">
		<div class="container">
			<ui-contacts />
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
