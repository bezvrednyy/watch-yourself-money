import {toast} from 'react-hot-toast'
import {checkNever} from '../../common/utils/checkNever'
import {StandardError} from '../common/errors'
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

export function processStandardError(error: StandardError) {
	switch (error.type) {
		case 'SERVER_ERROR':
			toast.error('Произошла ошибка сервера.')
			break
		case 'FORBIDDEN':
			toast.error('У вас недостаточно прав.')
			break
		default:
			checkNever(error.type, `Unknown error type, ${error.type}`)
	}
	if (error.meta) {
		console.error(error.meta)
	}
}