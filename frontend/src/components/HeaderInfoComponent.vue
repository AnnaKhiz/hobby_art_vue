<template>
	<section class="header__contacts">
		<div class="container">
			<ul class="header__contacts-list">
        <ui-contacts
          :contacts="contacts"
        />
			</ul>

		</div>
	</section>

</template>

<script>
import UiContacts from "@/components/UI/uiContacts.vue";

export default {
	name: "HeaderInfoComponent",
  components: {UiContacts},
	data() {
		return {
			contacts: [
				{ text: '+38 (044) 123 45 67', value: 'phone', href: 'tel:+380441234567', isLink: true },
				{ text: 'г. Киев, ул. Шевченко, д. 6', value: 'address', isLink: false },
				{ text: 'Ежедневно с 10:00 до 19:00', value: 'schedule', isLink: false },
			]
		}
	}
}
</script>

<style scoped lang="sass">

</style>
