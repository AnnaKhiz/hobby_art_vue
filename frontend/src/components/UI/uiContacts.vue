<template>
	<ul class="header__contacts-list">
		<li
				v-for="item in contacts"
				:key="item.value"
		>
			<a v-if="item.isLink" :href="`${item.href}`" class="header__contacts-tel" >{{ item.text }}</a>
			<span v-else>{{ item.text }}</span>
		</li>
	</ul>
</template>

<script>
export default {
  name: "uiContacts",
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
