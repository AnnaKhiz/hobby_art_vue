<template>
	<form @submit.prevent="submit" enctype="multipart/form-data">
		<div>{{ message }}</div>
		<input type="file" @change="handleFileChange" name="file"/>
		<button type="submit" >Отправить</button>
	</form>
</template>

<script>
import {mapActions} from "vuex";

export default {
	name: "uiUploadImage.vue",
	data() {
		return {
			file: {},
			message: ''
		}
	},
	methods: {
		...mapActions({
			sendFile: 'uploadFile/sendFile',
		}),
		async submit() {
			if (!this.file) {
				this.message = 'Файл не выбран!';
				return;
			}
			const formData = new FormData();
			formData.append('file', this.file);
			console.log('file', this.file)
			console.log('form data', formData)
			for (const [key, value] of formData.entries()) {
				console.log(key, value);
			}

			await this.sendFile(formData)
		},
		handleFileChange(event) {
			this.file = event.target.files[0];
		}
	}
}
</script>



<style scoped lang="sass">

</style>
