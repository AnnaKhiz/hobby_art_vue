export const linksModule = {
  namespaced: true,
  state: () => ({
    headerLink: '',
    navMenuLinks: [
      { text: 'Каталог', value: 'catalog', url: '/#catalog' },
      { text: 'Оплата и доставка', value: 'delivery', url: 'delivery' },
      { text: 'Бонусная программа', value: 'bonuses', url: 'bonuses' },
      { text: 'О компании', value: 'about', url: 'about' },
      { text: 'Контакты', value: 'contacts', url: `` },
      { text: 'Личный кабинет', value: 'user', url: `user/${localStorage.getItem('id')}` }
    ],
    sidebarGeneralItems: [
      { id: 1, text: 'Макраме', value: 'makrame', price: '250', link: '', image: 'catalog-img-pink.png' },
      { id: 2, text: 'Вязание', value: 'knitting', price: '250', link: '', image: 'catalog-img-violet.png' },
      { id: 3, text: 'Вышивка', value: 'crosstich', price: '250', link: '', image: 'catalog-img-pink-shadow.png' },
      { id: 4,text: 'Лепка', value: 'modeling', price: '250', link: '', image: 'catalog-img-pink-shadow.png' },
      { id: 5, text: 'Инструменты', value: 'tools', price: '250', link: '', image: 'catalog-img-pink.png' },
      { id: 6, text: 'Упаковка', value: 'package', price: '250', link: '', image: 'catalog-img-violet.png' },
      { id: 7, text: 'Товары для творчества', value: 'art-supplies', price: '250', link: '', image: 'catalog-img-pink-shadow.png' },
      { id: 8, text: 'Книги', value: 'books', price: '250', link: '', image: 'catalog-img-pink-shadow.png' },
    ],
  }),
  getters: {
    getCheckedHeaderLink(state) {
      return state.headerLink
    },
    getNavMenuLinks(state) {
      return state.navMenuLinks
    },
    getSidebarGeneralItems(state) {
      return state.sidebarGeneralItems
    },
  },
  mutations: {
    setCheckedHeaderLink(state, payload) {
      state.headerLink = payload
    },
  }
}
