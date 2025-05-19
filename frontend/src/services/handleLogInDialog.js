import router from "@/router";
import store from "@/store";
export async function checkFunction() {
	if (!store.getters["user/isAuthorized"]) {
		openDialog();
		return;
	}
	await getUser();
	return { isFavorite: false }
}
export async function getUser(isFavorite = false) {

	const result = await store.dispatch('user/getAuthUser');

	if (!result.result) {
		router.back();
		store.commit('user/setIsAuthorizedInfo', false);

	} else {
		store.commit('user/setIsAuthorizedInfo', true);

		router.push(
			{
				name: 'User',
				params: {
					id: result.user[0]._id,
				},
				query: {
					link: isFavorite ? 'favorites' : 'general',
				}
			})
	}
}
function openDialog() {
	store.commit('dialog/setDisplayDialogState', true)
	store.commit('user/setIsRegisteredInfo', true);
	router.push({ name: 'user-login'});
}
