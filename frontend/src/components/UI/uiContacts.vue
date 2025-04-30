<template>
	<ul :class="customClass">
		<li
				v-for="item in contactsList"
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
				{ text: '@hobbyart_dv', value: 'mail', href: 'mailto:@hobbyart_dv', isLink: true },
			]
		}
	},
	props: {
		customClass: {
			type: String,
			default: ''
		},
		isMailing: {
			type: Boolean,
			default: false,
		}
	},
	computed: {
		contactsList() {
			return !this.isMailing ? this.contacts.filter(el => el.value !== 'mail') : this.contacts;
		}
	}
}
</script>
