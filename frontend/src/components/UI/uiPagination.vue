<template>
	<div>
			<span
				v-for="page in pages"
				:key="page"
				@click="handlePaginationCount(page)"
				class="pagination-item"
				:class="{ 'checked': currentPage === page}"
			>
				{{page}}
			</span>
	</div>
</template>

<script>
export default {
	name: "uiPagination.vue",
	props: {
		pages: {
			type: Number,
			default: 1
		},
	},
	data() {
		return {
			itemsPerPage: 10,
			currentPage: 1,
			lastIndex: 10,
			startIndex: 0
		}
	},
	emits: ['updateLastIndex', 'updateStartIndex'],
	methods: {
		handlePaginationCount(value) {
			this.currentPage = value;
			this.lastIndex = this.currentPage * this.itemsPerPage;
			this.$emit('updateLastIndex', this.lastIndex);
			this.$emit('updateStartIndex', this.lastIndex - this.itemsPerPage);
		}
	},
}
</script>

<style scoped lang="sass">
.pagination-item
	cursor: pointer
	margin-right: 10px
	background-color: var(--colorTextButton)
	padding: 10px
	box-shadow: 1px 1px 2px #ece1e1, inset -1px -1px 2px #818080
	border-radius: 4px
	&:hover
		color: var(--colorTextButton)
		background-color: var(--grayLinkColor)
	&.checked
		color: #976464
		background-color: var(--colorLineBasket)
		box-shadow: inset 1px 1px 2px #ece1e1, -1px -1px 2px #818080
</style>
