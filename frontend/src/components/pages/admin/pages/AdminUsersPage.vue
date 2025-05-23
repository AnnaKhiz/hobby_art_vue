<template>
	<div
		v-for="item in usersList"
		:key=item._id
		class="items-container__item"
	>
			<div class="content">
				<p>Имя: <span>{{ `${item.lastName || ''} ${item.name || ''} ${item.surName || ''}`}}</span></p>
				<p>Дата рождения: <span>{{item.birthDate}}</span></p>
				<p>Телефон: <span>{{item.phone}}</span></p>
				<p>Email: <span>{{item.email}}</span></p>
				<p>Логин: <span>{{item.login}}</span></p>
				<p>Рассылка: <span>{{item.mailing}}</span></p>
				<p>Бонусы: <span>{{item.bonuses}}</span></p>
				<p>Адресс: <span>{{ `г. ${item.address?.city || 'не указан'}, ул. ${item.address?.street || 'не указан'}, № ${item.address?.house || 'не указан'}` }}</span></p>
			</div>

			<div class="select-block">
				<select
					v-if="item.orders.length"
					name="orders"
				>
					<option disabled selected>Список заказов</option>
					<option
						v-for="order in item.orders"
						:key="order._id"
						:value="order._id"
					>
						Заказ от {{order._id?.date}}
					</option>
				</select>

				<select
					v-if="item.favorites.filter(el => el.isLiked).length"
					name="orders"
				>
					<option disabled selected>Избранные товары</option>
					<option
						v-for="fav in item.favorites.filter(el => el.isLiked)"
						:key="fav._id"
						:value="fav._id"
					>
						{{fav._id?.name}} ({{fav._id?.color.map(e => e.text).join(', ')}})
					</option>
				</select>

			</div>
			<button @click.stop="removeUser(item)" class="action-style w-50">Удалить</button>
		</div>
</template>

<script>
import {
	mapActions,
	mapGetters
} from "vuex";

export default {
  name: "AdminUsersPage.vue",
	computed: {
		...mapGetters({
			usersList: 'user/usersList',
		})
	},
	methods: {
		...mapActions({
			getUsersList: 'user/getUsersList',
			removeUserByIdAdmin: 'user/removeUserByIdAdmin',
		}),
		async removeUser(item) {
			const result = await this.removeUserByIdAdmin(item._id);

			if (!result.result) return;

			const updatedUsersList = this.usersList.filter(e => e._id !== result.users._id);
			this.$store.commit('user/setUsersList', updatedUsersList);
		}
	},
	async mounted() {
		await this.getUsersList();
	}
}
</script>

<style scoped lang="sass">
.items-container
	&__item
		display: flex
		flex-direction: column
		background: #E8E8E8
		border-radius: 12px
		width: 45%
		padding: 15px
		height: 350px
		@media screen and (max-width: 768px)
			margin-bottom: 10px
			width: 100%
			height: fit-content
		& .info
			flex-grow: 1
		& > .actions
			display: flex
			align-items: center
			justify-content: start
			gap: 20px
			margin-top: 15px
.content
	display: flex
	flex-direction: column
	gap: 5px
	flex-grow: 1
	@media screen and (max-width: 768px)
		margin-bottom: 20px
.select-block
	display: flex
	flex-direction: column
	gap: 5px
	margin-bottom: 20px

</style>
