import {NextApiRequest} from 'next'
import {StandardError, TypeErrorResponse} from '../../errors'

export type CreateTransactionRequestData = {
	id: string
	categoryId: string
	bankAccountId: string
	currencyId: 'RUBLE'|'DOLLAR'
	comment: string|null
	money: number
	date: Date
}

export interface CreateTransactionRequest extends NextApiRequest {
	body: {
		data: CreateTransactionRequestData,
	},
}


export type CreateTransactionErrorType = 'CATEGORY_NOT_FOUND'

export type CreateTransactionRightData = void
export type CreateTransactionLeftData = TypeErrorResponse<CreateTransactionErrorType> | StandardError