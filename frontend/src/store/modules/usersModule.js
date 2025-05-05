import { fetchData } from "@/services/api";

export const usersModule = {
  namespaced: true,
  state: () => ({
    isRegistered: true,
    isAuthorized: false,
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
		userInfo: state => state.user,
		userAboutLabelsList: state => state.userAboutLabelsList,
		isAuthorized: state => state.isAuthorized,
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
    setIsRegisteredInfo(state, payload) {
      state.isRegistered = payload;
    },
    setIsAuthorizedInfo(state, payload) {
      state.isAuthorized = payload;
    },
    setUserInfo(state, payload) {
      state.user = payload;
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
			} catch (error) {
				console.error('Error getting auth user:', error);
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
		}
	}
}
