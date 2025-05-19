<template>
	<div class="main__delivery__page-content-photo">
		<ui-google-map-item />
	</div>
</template>

<script>
import UiGoogleMapItem from "@/components/UI/google-map/uiGoogleMapItem.vue";

export default {
	name: "uiGoogleMapContainer.vue",
	components: { UiGoogleMapItem }
}
</script>
