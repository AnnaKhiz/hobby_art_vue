<template>
	<form enctype="multipart/form-data">
		<input type="file" @change="handleFileChange" name="file" style="width: 100%"/>
	</form>
</template>

<script>
export default {
	name: "uiUploadImage.vue",
	emits: ['updateFile'],
	methods: {
		handleFileChange(event) {
			this.$emit('updateFile', event.target.files[0]);
		},
	}
}
</script>

