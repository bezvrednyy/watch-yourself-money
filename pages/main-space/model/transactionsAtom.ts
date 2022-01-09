import {CurrencyId} from '@prisma/client'
import {createPrimitiveAtom} from '@reatom/core/primitives'

export type TransactionData = {
	id: string
	categoryId: string
	bankAccountId: string
	currencyId: CurrencyId
	comment?: string
	money: number,
	timestamp: number
}

export const transactionsAtom = createPrimitiveAtom<Array<TransactionData>>([])