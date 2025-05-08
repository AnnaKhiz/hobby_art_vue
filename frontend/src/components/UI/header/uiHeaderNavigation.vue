<template>
	<nav class="header__menu-nav">
		<ul>
			<li
				v-for="link in getNavMenuLinks"
				:key="link.url"
			>
				<span @click="openMenuPage(link.url, link.value)">{{ link.text }} </span>
			</li>
		</ul>
	</nav>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
	name: "uiHeaderNavigation.vue",
	computed: {
		...mapGetters({
			getNavMenuLinks: 'links/getNavMenuLinks',
		}),
	},
	methods: {
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
		},
	}
}
</script>
