<template>
	<GMapMap
		:center="coordinatesKiev"
		:zoom="12"
		class="map-view"
	>
		<GMapMarker :position="coordinatesKiev" />
	</GMapMap>
</template>

<script>
export default {
	name: "uiGoogleMapItem.vue",
	data() {
		return {
			coordinatesKiev: {
				lat: 50.4501,
				lng: 30.5234,
			}
		}
	}
}
</script>

<style scoped lang="sass">
.map-view
	width: 100%
	height: 400px
	border-radius: 12px
</style>
