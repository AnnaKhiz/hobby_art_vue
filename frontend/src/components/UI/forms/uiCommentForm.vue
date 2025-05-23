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
			<ui-rating-stars
				@update-rating="feedback.rating = $event"
				class="align-self-start"
			/>
		</div>
		<div class="error-message">{{ infoMessage }}</div>
		<button
			class="popup-button align-self-center"
			@click.prevent="submit"
		>
			Отправить
		</button>
	</form>

</template>

<script>
import {
	mapActions,
	mapGetters,
	mapMutations
} from "vuex";
import UiRatingStars from "@/components/UI/rating-stars/uiRatingStars.vue";

export default {
	name: "uiCommentForm.vue",
	components: {UiRatingStars},
	data() {
		return {
			feedback: {
				text: '',
				name: '',
				rating: 0
			},
			length: 130,
			infoMessage: ''
		}
	},
	computed: {
		...mapGetters({
			user: 'user/userInfo',
		}),
		maxLength() {
			return this.length - this.feedback.text.length;
		}
	},
	methods: {
		...mapMutations({
			setDisplayDialogState: 'dialog/setDisplayDialogState',
		}),
		...mapActions({
			addFeedback: 'feedback/addFeedback',
		}),
		async submit() {
			const { text, name } = this.feedback;

			if (!text && !name) {
				this.infoMessage = 'Заполните все поля!';
				return;
			}
			this.infoMessage = 'Ваш отзыв успешно отправлен!';

			if (this.user._id) {
				this.feedback.user = this.user;
			}

			const result = await this.addFeedback(this.feedback);

			if (!result.result) {
				this.infoMessage = 'Отзыв не опубликован! Приносим извинения за неудобства!';
				return;
			}

			setTimeout(() => {
				this.infoMessage = '';
				this.setDisplayDialogState(false);
			}, 1500);
		}
	},
	mounted() {
		if (this.user._id) {
			this.feedback.name = `${this.user.lastName} ${this.user.name}`;
		}
	}
}
</script>

<style scoped lang="sass">
.border
	box-shadow: 1px 1px 4px rgba(66, 66, 66, 0.4)
</style>
