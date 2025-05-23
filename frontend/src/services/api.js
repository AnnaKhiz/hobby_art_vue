const apiBaseUrl = process.env.VUE_APP_API_URL;
const headersDefault = { "Content-Type": "application/json" };
export async function fetchData(
	url,
	method = 'GET',
	pathParams = {},
	body = null,
	headers = headersDefault
) {
	let data = null;
	try {
		let processedUrl = url;
		for (const key in pathParams) {
			processedUrl = processedUrl.replace(`:${key}`, encodeURIComponent(pathParams[key]));
		}
		const isFormData = body instanceof FormData;
		const fetchHeaders = isFormData ? {} : headers;

		const result = await fetch(`${apiBaseUrl}/${processedUrl}`, {
			method,
			credentials: 'include',
			headers: fetchHeaders,
			...(body && method !== 'GET' && { body: isFormData ? body : JSON.stringify(body) }),
		})
		data = await result.json();
	} catch (e) {
		console.log('Fetch request error:', e);
	}
	return data;
}
