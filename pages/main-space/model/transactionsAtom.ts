import {CurrencyId} from '@prisma/client'
import {createPrimitiveAtom} from '@reatom/core/primitives'
import {getClientApi, processStandardError} from '../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../../commonClient/declareAloneAction'
import {selectedPeriodAtom} from './selectedPeriodAtom'

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
//Транзакции, которые отображаются в разделе "История"
export const transactionsAtom = createPrimitiveAtom<Array<TransactionData>>([])

export const updateTransactionsAction = declareAloneAction(async store => {
	const selectedPeriod = store.getState(selectedPeriodAtom)
	const either = await getClientApi().transactions.getTransactions(selectedPeriod)
	either
		.mapRight(transactions => store.dispatch(transactionsAtom.set(transactions)))
		.mapLeft(processStandardError)
})