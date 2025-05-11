import { fetchData } from "@/services/api";

export const uploadFileModule = {
	namespaced: true,
	state: () => ({
		file: {}
	}),
	actions: {
		async sendFile(body) {
			try {
				const result = await fetchData('api/file/upload', 'POST', {}, body);
				console.log('Upload file: ', result)
			} catch (error) {
				console.error('Error sending file: ', error)
			}
		}
	}
}
