import {toast} from 'react-hot-toast'
import {checkNever} from '../../common/utils/checkNever'
import {getEnvType} from '../../commonClient/environment/clientEnv'
import {StandardError} from '../common/errors'
import {bankAccountsApi} from './bankAccountsApi'
import {categoriesClientApi} from './categories/categoriesApi'
import {chartClientApi} from './chartApi'
import {envClientApi} from './envApi'
import {transactionsClientApi} from './transactionsApi'

export function getClientApi() {
	return {
		categories: categoriesClientApi,
		env: envClientApi,
		transactions: transactionsClientApi,
		chart: chartClientApi,
		bankAccounts: bankAccountsApi,
	}
}

export async function fetchPostData<DATA>(url: string, data: DATA): Promise<Response> {
	if (getEnvType() === 'development') {
		console.log(url, data)
	}
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
		case 'BAD_REQUEST':
			toast.error('Неверный запрос.')
			break
		default:
			checkNever(error.type, `Unknown error type, ${error.type}`)
	}
	if (error.meta) {
		console.error(error.meta)
	}
}