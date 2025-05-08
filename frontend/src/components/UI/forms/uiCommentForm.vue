<template>

	<form class="popup-form w-100 d-flex flex-column ga-4 align-start">
		<p class="popup-text align-self-center">Оставить отзыв</p>
		<p>Имя</p>
		<input
			class="popup-textarea border"
			v-model="feedback.name"
			placeholder="Введите ваше имя..."
		/>
		<p>Отзыв</p>
		<div>
			<textarea
				v-model="feedback.text"
				class="popup-textarea border"
				rows="6"
				cols="50"
				name="comment-text"
				placeholder="Введите текст..."
				autofocus
				:maxlength="length"
			/>

			<div
				class="popup-message-window"
			>
				{{ feedback.text.length }} /
				<span :style="`color: ${maxLength === 0 ? 'red' : '#BDBDBD'}`">
				{{ maxLength }}
			</span>
			</div>
		</div>
{{feedback}}
		<button
			class="popup-button align-self-center"
			@click="submit"
		>
			Отправить
		</button>
	</form>

</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "uiCommentForm.vue",
	data() {
		return {
			feedback: {
				text: '',
				name: ''
			},
			length: 130
		}
	},
	computed: {
		...mapGetters({
			user: 'user/userInfo'
		}),
		maxLength() {
			return this.length - this.feedback.text.length
		}
	},
	methods: {
		submit() {

		}
	},
	mounted() {
		if (!this.user._id) {
			console.log('unregistered user')
		} else {
			console.log(this.user)
			this.feedback.name = `${this.user.lastName} ${this.user.name}`;
		}
	}
}
</script>

<style scoped lang="sass">
.border
	box-shadow: 1px 1px 4px rgba(66, 66, 66, 0.4)
</style>
