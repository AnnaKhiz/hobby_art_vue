<template>
	<div id="burger" class="burger show">
		<div class="burger__container">
			<ul class="burger__list-menu">
				<li
					v-for="link in links"
					:key="link.url"
				>
					<span @click="openMenuPage(link.url, link.value)">{{ link.text }} </span>
				</li>
				<li class="burger__item address-block">
					<a href="tel:+88009503398">8 800 950-33-98</a>
					<a href="mailto:mail@gmail.com">mail@gmail.com</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
	name: "uiBurger.vue",
	emits: ['updateIsShow'],
	computed: {
		...mapGetters({
			getNavMenuLinks: 'links/getNavMenuLinks',
		}),
		links() {
			return  this.getNavMenuLinks.filter(el => el.value !== 'contacts');
		}
	},
	methods: {
		...mapMutations({
			setDisplayDialogState: 'dialog/setDisplayDialogState',
		}),
		...mapMutations({
			setCheckedHeaderLink: 'links/setCheckedHeaderLink',
		}),
		openMenuPage(link, value) {
			if (link) {
				this.$router.push({ name: link, hash: value === 'catalog' ? '#catalog' : false });
			} else {
				const height = window.outerHeight * 100;
				window.scrollTo({  top: height, behavior: 'smooth' });
			}
			this.setCheckedHeaderLink(value);
			this.setDisplayDialogState(false);
			this.$emit('updateIsShow', false);
		},
	}
}
</script>
