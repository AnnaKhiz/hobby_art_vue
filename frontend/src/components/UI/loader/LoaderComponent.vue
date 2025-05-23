<template>
	<div
		class="w-100 h-100 d-flex justify-center align-start pt-10 bg-transparent"
	>
		<div class="w-33 d-flex justify-center align-center flex-column ga-6">
			<p>Пожалуйста, подождите... </p>
			<v-progress-linear
				color="#976464"
				indeterminate
				:height="6"
				rounded
			/>
		</div>
	</div>
</template>

<script>
import { VProgressLinear } from "vuetify/components";
export default {
	name: "LoaderComponent.vue",
	components: { VProgressLinear },
}
</script>

