export const userSidebarModule = {
	namespaced: true,
	state: () => ({
		userSidebarItems: [
			{ text: 'Мои данные', value: 'general', url: '' },
			{ text: 'Бонусный счет', value: 'bonuses', url: '' },
			{ text: 'Избранные товары', value: 'favorites', url: '' },
			{ text: 'История заказов', value: 'history', url: '' },
			{ text: 'Рассылка', value: 'mailing', url: '' },
			{ text: 'Отзывы', value: 'feedback', url: '' },
		]
	}),
	getters: {
		userSidebarItems: state => state.userSidebarItems,
	}
}
