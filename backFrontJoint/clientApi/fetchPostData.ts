//TODO:Either Перенести в clientApi
export async function fetchPostData<DATA>(url: string, data: DATA): Promise<Response> {
	const result = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			data,
		}),
	})
	return result
}