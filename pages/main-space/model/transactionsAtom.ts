import {CurrencyId} from '@prisma/client'
import {createPrimitiveAtom} from '@reatom/core/primitives'
import {getClientApi, processStandardError} from '../../../backFrontJoint/clientApi/clientApi'
import {declareAsyncAction} from '../../../commonClient/declareAsyncAction'

export type TransactionData = {
	id: string
	categoryId: string
	bankAccountId: string
	currencyId: CurrencyId
	comment?: string
	money: number,
	timestamp: number
}

//TODO:transactions. Реализовать lazyLoad
export const transactionsAtom = createPrimitiveAtom<Array<TransactionData>>([])

export const updateTransactionsAction = declareAsyncAction(async store => {
	const either = await getClientApi().transactions.getTransactions()

	either
		.mapRight(transactions => store.dispatch(transactionsAtom.set(transactions)))
		.mapLeft(processStandardError)
})