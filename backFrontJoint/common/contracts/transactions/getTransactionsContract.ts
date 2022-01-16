import {CurrencyId} from '@prisma/client'
import {StandardError} from '../../errors'

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