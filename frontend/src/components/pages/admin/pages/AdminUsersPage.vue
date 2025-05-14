<template>
	<div v-if="usersList.length" class="d-flex justify-start align-stretch ga-6 w-100">
		<div v-for="item in usersList" :key=item._id class="items-container__item w-50 d-flex flex-column justify-space-between">
			<div class="d-flex flex-column ga-3">
				<p>Имя: <span>{{ `${item.lastName || ''} ${item.name || ''} ${item.surName || ''}`}}</span></p>
				<p>Дата рождения: <span>{{item.birthDate}}</span></p>
				<p>Телефон: <span>{{item.phone}}</span></p>
				<p>Email: <span>{{item.email}}</span></p>
				<p>Логин: <span>{{item.login}}</span></p>
				<p>Рассылка: <span>{{item.mailing}}</span></p>
				<p>Бонусы: <span>{{item.bonuses}}</span></p>
				<p>Адресс: <span>{{ `г. ${item.address?.city || 'не указан'}, ул. ${item.address?.street || 'не указан'}, № ${item.address?.house || 'не указан'}` }}</span></p>
			</div>
			<div class="d-flex flex-column ga-3">
				<select v-if="item.orders.length" name="orders" id="">
					<option disabled selected>Список заказов</option>
					<option v-for="order in item.orders" :key="order._id" label="" :value="order._id" >Заказ от {{order._id?.date}}</option>
				</select>
				<select v-if="item.favorites.length" name="orders" id="">
					<option disabled selected>Избранные товары</option>
					<option v-for="fav in item.favorites" :key="fav._id" label="" :value="fav._id" >{{fav._id?.name}} ({{fav._id?.color.map(e => e.text).join(', ')}})</option>
				</select>
			</div>
		</div>
	</div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AdminUsersPage.vue",
	data() {
		return {
			users: []
		}
	},
	computed: {
		...mapGetters({
			usersList: 'user/usersList',
		})
	},
	methods: {
		...mapActions({
			getUsersList: 'user/getUsersList',
		})
	},
	async mounted() {
		await this.getUsersList();
		console.log('component users list', this.usersList)
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
		width: 30%
		padding: 15px
		height: 350px
		& .info
			flex-grow: 1
		& > .actions
			display: flex
			align-items: center
			justify-content: start
			gap: 20px
			margin-top: 15px
</style>
