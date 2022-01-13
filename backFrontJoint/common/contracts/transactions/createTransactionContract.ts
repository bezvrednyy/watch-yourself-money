import {CurrencyId} from '@prisma/client'
import {NextApiRequest} from 'next'
import {TextErrorResponse, TypeErrorResponse} from '../../errors'

//TODO:clientApi CurrencyId идёт из prisma. А она не должна использоваться на фронте.
export type CreateTransactionRequestData = {
	id: string
	categoryId: string
	bankAccountId: string
	currencyId: CurrencyId
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
	|'NOT_ENOUGH_RIGHTS'

export type CreateTransactionRightData = void
export type CreateTransactionLeftData = TypeErrorResponse<CreateTransactionErrorType> | TextErrorResponse