export const linksModule = {
  namespaced: true,
  state: () => ({
    headerLink: '',
    navMenuLinks: [
      { text: 'Каталог', value: 'catalog', url: 'HobbyArt' },
      { text: 'Оплата и доставка', value: 'delivery', url: 'delivery' },
      { text: 'Бонусная программа', value: 'bonuses', url: 'bonuses' },
      { text: 'О компании', value: 'about', url: 'about' },
      { text: 'Контакты', value: 'contacts', url: `` },
    ],
    sidebarGeneralItems: [
      { id: 1, text: 'Макраме', value: 'makrame', price: '250', link: `/product-page`, image: 'catalog-img-pink.png' },
      { id: 2, text: 'Вязание', value: 'knitting', price: '250', link: '/product-page', image: 'catalog-img-violet.png' },
      { id: 3, text: 'Вышивка', value: 'crosstich', price: '250', link: '/product-page', image: 'catalog-img-pink-shadow.png' },
      { id: 4, text: 'Лепка', value: 'modeling', price: '250', link: '/product-page', image: 'catalog-img-pink-shadow.png' },
      { id: 5, text: 'Инструменты', value: 'tools', price: '250', link: '/product-page', image: 'catalog-img-pink.png' },
      { id: 6, text: 'Упаковка', value: 'package', price: '250', link: '/product-page', image: 'catalog-img-violet.png' },
      { id: 7, text: 'Товары для творчества', value: 'art-supplies', price: '250', link: '/product-page', image: 'catalog-img-pink-shadow.png' },
      { id: 8, text: 'Книги', value: 'books', price: '250', link: '/product-page', image: 'catalog-img-pink-shadow.png' },
    ],
		footerNavigationMenu: [
			{ text: 'Каталог', value: 'catalog', url: 'HobbyArt' },
			{ text: 'Акции', value: 'sale', url: 'HobbyArt' },
			{ text: 'Новинки', value: 'new-products', url: 'HobbyArt' },
			{ text: 'Популярное', value: 'popular', url: 'HobbyArt' },
			{ text: 'Гарантия и возврат', value: 'guarantee', url: 'delivery' },
			{ text: 'Оплата и доставка', value: 'delivery', url: 'delivery' },
			{ text: 'Бонусная программа', value: 'bonuses', url: 'bonuses' },
			{ text: 'О компании', value: 'about', url: 'about' },
			{ text: 'Преимущества', value: 'benefits', url: 'about' },
			{ text: 'Личный кабинет', value: 'account', url: '' },
		]
  }),
  getters: {
    getCheckedHeaderLink: state => state.headerLink,
    getNavMenuLinks: state => state.navMenuLinks,
    getSidebarGeneralItems: state => state.sidebarGeneralItems,
		footerNavigationMenu: state => state.footerNavigationMenu
  },
  mutations: {
    setCheckedHeaderLink(state, payload) {
      state.headerLink = payload;
    },
  },
}


