<template>
	<div>
		<button
			@click="toggleForm"
			class="main__slider-popular-switcher-label small"
		>
			{{ isFormShow ? 'Все отзывы' : 'Оставить отзыв' }}
		</button>
		<ui-comment-form v-if="isFormShow" />
		<ui-feedback-list v-else />
	</div>
</template>

<script>
import UiCommentForm from "@/components/UI/forms/uiCommentForm.vue";
import UiFeedbackList from "@/components/UI/feedback/uiFeedbackList.vue";

export default {
	name: "FeedbackTemplateDialog.vue",
	components: { UiFeedbackList, UiCommentForm },
	emits: ['updateIsBigForm'],
	data() {
		return {
			isFormShow: true
		}
	},
	methods: {
		toggleForm() {
			this.isFormShow = !this.isFormShow;
			this.$emit('updateIsBigForm', !this.isFormShow);
		}
	},
}
</script>
