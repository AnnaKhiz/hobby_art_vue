<template>
	<div>
		<p class="feedback-text mb-4">{{ item.text }}</p>
		<div class="feedback-about" :class="{ 'mb-6' : admin}">
			<p class="feedback-author">{{ item.name }}</p>
			<p class="feedback-author">{{ item.date }}</p>
		</div>
		<slot name="actions" />
	</div>
</template>

<script>
export default {
	name: "uiFeedbackItem.vue",
	props: {
		item: {
			type: Object,
			default: () => {}
		},
		admin: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped lang="sass">
.feedback
	&-text
		font-size: 0.9rem
		color: #424242
	&-author
		font-size: 0.7rem
		color: #5E5C5A
		opacity: 0.6
	&-about
		width: 100%
		display: flex
		justify-content: space-between
		align-items: center
</style>
