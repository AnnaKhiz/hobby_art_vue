<template>
	<router-link :to="{ name: 'HobbyArt' }" class="header__menu-logo">
		<img :src="logoIcon" alt="logo">
	</router-link>
</template>

<script>
import logoIcon from "@/assets/img/logo.png"
export default {
	name: "uiLogo.vue",
	data() {
		return {
			logoIcon
		}
	}
}
</script>
