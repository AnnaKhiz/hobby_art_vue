
const apiBaseUrl = process.env.VUE_APP_API_URL;
export async function fetchData(url, method = 'GET', pathParams = {}, body = null) {
	let data = null;
	try {
		let processedUrl = url;
		for (const key in pathParams) {
			processedUrl = processedUrl.replace(`:${key}`, encodeURIComponent(pathParams[key]));
		}
		const result = await fetch(`${apiBaseUrl}/api/${processedUrl}`, {
			method,
			credentials: 'include',
			headers: { "Content-Type": "application/json"},
			...(body && method !== 'GET' && { body: JSON.stringify(body) }),
		})
		data = await result.json();
	} catch (e) {
		console.log(e)
	}
	return data;
}
