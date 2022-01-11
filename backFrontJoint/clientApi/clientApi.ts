import {categoriesClientApi} from './categories/categoriesApi'

export function getClientApi() {
	return {
		categories: categoriesClientApi,
	}
}

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

export function processStandardError(error: unknown) {
	//TODO:toast
	console.log('Error', error)
}