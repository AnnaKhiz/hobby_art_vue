import { fetchData } from "@/services/api";

export const usersModule = {
  namespaced: true,
  state: () => ({
    isRegistered: true,
    isAuthorized: false,
		isLoading: true,
		favoritesCount: 0,
		usersList: [],
    user: {},
		userAboutLabelsList: [
			{ text: 'Имя:', value: 'name', idLabel: 'user-name', isReadable: false },
			{ text: 'Фамилия:', value: 'lastName', idLabel: 'user-surname', isReadable: false},
			{ text: 'Отчество:', value: 'surName', idLabel: 'user-surname-2', isReadable: false },
			{ text: 'Дата рождения:', value: 'birthDate', idLabel: 'user-birth-date', isReadable: false },
			{ text: 'Номер телефона:', value: 'phone', idLabel: 'user-phone', isReadable: false },
			{ text: 'E-mail:', value: 'email', idLabel: 'user-email', isReadable: false },
			{ text: 'Город:', value: 'address.city', idLabel: 'user-city', isReadable: true },
			{ text: 'Улица:', value: 'address.street', idLabel: 'user-street', isReadable: true },
			{ text: 'Дом:', value: 'address.house', idLabel: 'user-house', isReadable: true },
			{ text: 'Квартира:', value: 'address.apartment', idLabel: 'user-apartment', isReadable: true },
			{ text: 'Индекс:', value: 'address.zipCode', idLabel: 'user-code', isReadable: true },
			{ text: 'Сменить пароль:', value: 'password', idLabel: 'user-password', isReadable: false },
		]
  }),
  getters: {
		isLoading: state => state.isLoading,
		favoritesCount: state => state.favoritesCount,
		userInfo: state => state.user,
		userAboutLabelsList: state => state.userAboutLabelsList,
		isAuthorized: state => state.isAuthorized,
		usersList: state => state.usersList,
    getIsRegisteredInfo(state) {
      return state.isRegistered;
    },
    getIsAuthorizedInfo(state) {
      return state.isAuthorized;
    },
    getUserInfo(state) {
      return state.user;
    }
  },
  mutations: {
		updateIsLoading(state, payload) {
			state.isLoading = payload;
		},
		updateFavoritesCount(state, payload) {
			state.favoritesCount = payload;
		},
    setIsRegisteredInfo(state, payload) {
      state.isRegistered = payload;
    },
		setUsersList(state, payload) {
			state.usersList = payload;
		},
    setIsAuthorizedInfo(state, payload) {
      state.isAuthorized = payload;
    },
    setUserInfo(state, payload) {
			const favorites = addSelectedOption(payload.favorites)
			console.log('payload', payload)
      state.user = {
				...payload,
				favorites
			};

			console.log('update state', state.user)
    },
		updateIsSelectedItem(state, { id, payload}) {
			const index = state.user.favorites.findIndex(el => el._id._id === id);
			if(index === -1) return;
			return state.user.favorites[index]._id.isSelectedItem = payload;
		}
  },
	actions: {
		// USER
		async getAuthUser({ commit }) {
			let result = null;
			try {
				result = await fetchData('user');
				console.log('get user', result)
				commit('setUserInfo', result.user[0]);
				commit('updateFavoritesCount', result.user[0].favorites.filter(el => el.isLiked).length);
				commit('updateIsLoading', false);
			} catch (error) {
				console.error('Error getting auth user:', error);
			}
			return result;
		},

		async getUsersList({ commit }) {
			let result = null;
			try {
				result = await fetchData('admin/users');
				console.log('get users list', result)
				commit('setUsersList', result.users);
				commit('updateIsLoading', false);
			} catch (error) {
				console.error('Error getting users list:', error);
			}
			return result;
		},

		async userLogIn({ commit }, body) {
			let result = null;
			try {
				result = await fetchData('user/login', 'POST', {}, body);
				commit('setUserInfo', result.user);
			} catch (error) {
				console.error('Error log in user:', error);
			}
			return result;
		},
		async userRegister({ commit }, body) {
			let result = null;
			try {
				result = await fetchData('register', 'POST', {}, body);
				commit('setUserInfo', result.user);
			} catch (error) {
				console.error('Error register user:', error);
			}
			return result;
		},
		async logOutUser() {
			let result = null;
			try {
				result = await fetchData('user/logout');
			} catch (error) {
				console.error('Error log out user:', error);
			}
			return result;
		},
		async userInfoUpdate({ commit }, body) {
			let result = null;
			try {
				result = await fetchData('user/edit', 'PATCH', {}, body);
				commit('setUserInfo', result.result);
			} catch (error) {
				console.error('Error log out user:', error);
			}
			return result;
		},
		async userAddFavorite({ commit }, body) {
			let result = null;
			try {
				result = await fetchData('user/favorite', 'PATCH', {}, body);
				console.log('update result', result)
				commit('setUserInfo', result.data);
				commit('updateFavoritesCount', result.data.favorites.filter(el => el.isLiked).length);
			} catch (error) {
				console.error('Error log out user:', error);
			}
			return result;
		}
	}
}

function addSelectedOption(list) {
	if (!list.length) return;
	return list.map(el => ({...el, _id: { ...el._id, isSelectedItem: false } }));
}
