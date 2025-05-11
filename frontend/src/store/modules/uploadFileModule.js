import { fetchData } from "@/services/api";

export const uploadFileModule = {
	namespaced: true,
	state: () => ({
		file: {}
	}),
	actions: {
		async sendFile({commit}, body) {
			try {
				const result = await fetchData('api/file/upload', 'POST', {}, body);
				console.log('Upload file result: ', result)
				console.log(commit)
			} catch (error) {
				console.error('Error sending file: ', error)
			}
		}
	}
}
