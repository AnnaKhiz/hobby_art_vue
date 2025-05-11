<template>
	<form @submit.prevent="submit">
		<div>{{ message }}</div>
		<input type="file" @change="handleFileChange"/>
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

			await this.sendFile(this.file)
		},
		handleFileChange(event) {
			this.file = event.target.files[0];
			console.log(this.file)
		}
	}
}
</script>



<style scoped lang="sass">

</style>
