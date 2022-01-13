import {toast} from 'react-hot-toast'
import {ServerError} from '../common/errors'
import {categoriesClientApi} from './categories/categoriesApi'
import {envClientApi} from './envApi'
import {transactionsClientApi} from './transactionsApi'

export function getClientApi() {
	return {
		categories: categoriesClientApi,
		env: envClientApi,
		transactions: transactionsClientApi,
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

export function processStandardError(error: ServerError) {
	toast.error('Произошла ошибка сервера.')
	console.error(error.meta)
}