import {CurrencyId} from '@prisma/client'
import {NextApiRequest} from 'next'
import {StandardError} from '../../errors'

export type GetTransactionsRequestData = {
	startDate: Date,
	endDate: Date,
}

export interface GetTransactionsRequest extends NextApiRequest {
	body: { data: GetTransactionsRequestData },
}


export type GetTransactionsTransactionData = {
	id: string
	categoryId: string
	bankAccountId: string
	currencyId: CurrencyId
	comment?: string
	money: number,
	timestamp: number
}

export type GetTransactionsRightData = Array<GetTransactionsTransactionData>
export type GetTransactionsLeftData = StandardError