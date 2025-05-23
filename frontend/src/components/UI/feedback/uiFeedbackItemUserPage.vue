<template>
	<div class="main__user-page-content-review-block rating-block">
		<ui-rating-stars
			v-if="item.rating"
			:saved-rating="item.rating"
			no-actions
		/>

		<p class="main__user-page-content-review-data">
			{{ item.date }}
		</p>
	</div>
	<div class="main__user-page-content-review-block info-block">
		<div class="main__user-page-content-review-info">
			<p>{{ item.name }}</p>
			<p>Комментарий: <span>{{ item.text }}</span></p>
		</div>
		<div class="action-style mr-0">
			<button @click.prevent="removeFeedback(item._id, index)">Удалить отзыв</button>
		</div>
	</div>
</template>

<script>
import UiRatingStars from "@/components/UI/rating-stars/uiRatingStars.vue";
import {mapActions} from "vuex";

export default {
	name: "uiFeedbackItemUserPage.vue",
	components: {UiRatingStars},
	props: {
		item: {
			type: Object,
			default: () => {}
		},
		index: {
			type: Number,
			default: 0
		}
	},
	emits: ['remove'],
	methods: {
		...mapActions({
			deleteFeedbackById: 'feedback/deleteFeedbackById'
		}),
		async removeFeedback(id, index) {
			const result = await this.deleteFeedbackById(id);
			if (!result) return;
			this.$emit('remove', index);
		}
	}
}
</script>

