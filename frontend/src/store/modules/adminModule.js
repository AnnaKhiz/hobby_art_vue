import { fetchData } from "@/services/api";

export const adminModule = {
	namespaced: true,
	state: () => ({
		admin: ''
	}),
	action: {
		async logInAdmin() {
			let result = null;
			try {
				result = await fetchData('admin');
			} catch (error) {
				console.error('Error log in admin:', error);
			}
			return result.result;
		}
	}
}
