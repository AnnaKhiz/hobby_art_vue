<template>
	<section class="header__contacts">
		<div class="container">
			<ul class="header__contacts-list">
        <ui-contacts
            :contacts="contacts"
        />
<!--				<li-->
<!--					v-for="item in contacts"-->
<!--					:key="item.value"-->
<!--				>-->
<!--					<a v-if="item.isLink" :href="`${item.href}`" class="header__contacts-tel">{{ item.text }}</a>-->
<!--					<span v-else>{{ item.text }}</span>-->
<!--				</li>-->
			</ul>

		</div>
	</section>

</template>

<script>
import UiContacts from "@/components/UI/uiContacts.vue";

export default {
	name: "HeaderInfoComponent.vue",
  components: {UiContacts},
	data() {
		return {
			contacts: [
				{ text: '+7 (924) 765 28 20', value: 'phone', href: 'tel:+79247652820', isLink: true },
				{ text: 'г. Якутск, ул. Петра Алексеева, д. 6, ТЦ “Олонхо”', value: 'address', isLink: false },
				{ text: 'Ежедневно с 10:00 до 19:00', value: 'schedule', isLink: false },
			]
		}
	}
}
</script>

<style scoped lang="sass">

</style>