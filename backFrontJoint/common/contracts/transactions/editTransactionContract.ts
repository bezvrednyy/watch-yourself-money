import {NextApiRequest} from 'next'
import {StandardError, TypeErrorResponse} from '../../errors'

export type EditTransactionRequestData = {
	id: string
	categoryId: string
	bankAccountId: string
	currencyId: 'RUBLE'|'DOLLAR'
	comment: string|null
	money: number
	date: Date
}

export interface EditTransactionRequest extends NextApiRequest {
	body: { data: EditTransactionRequestData },
}


export type EditTransactionErrorType = 'TRANSACTION_NOT_FOUND'

export type EditTransactionRightData = void
export type EditTransactionLeftData = TypeErrorResponse<EditTransactionErrorType> | StandardError
