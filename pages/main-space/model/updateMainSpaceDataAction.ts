import {declareAloneAction} from '../../../commonClient/declareAloneAction'
import {updateChartDataAction} from '../categoriesSection/view/transactionsChart/model/externalActions'
import {updateBankAccountsAction} from './bankAccountsAtom'
import {updateCategoriesAction} from './categoriesAtom'
import {selectedPeriodAtom} from './selectedPeriodAtom'
import {updateTransactionsAction} from './transactionsAtom'

type MainSpaceDataType = 'categories'|'transactions'|'chart'|'bankAccounts'
type UpdateMainSpaceDataPayload = Array<MainSpaceDataType>

export const updateMainSpaceDataAction = declareAloneAction<UpdateMainSpaceDataPayload|void>(async (
	store,
	types,
) => {
	const typesSet: Set<MainSpaceDataType> = new Set(types || ['categories', 'transactions', 'chart', 'bankAccounts'])
	const selectedPeriod = store.getState(selectedPeriodAtom)
	await Promise.all([
		typesSet.has('categories') && updateCategoriesAction(store),
		typesSet.has('transactions') && updateTransactionsAction(store),
		typesSet.has('chart') && updateChartDataAction(store, { selectedPeriod }),
		typesSet.has('bankAccounts') && updateBankAccountsAction(store),
	])
})