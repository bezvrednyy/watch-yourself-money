import {declareAloneAction} from '../../common/declareAloneAction'
import {updateChartDataAction} from '../categoriesSection/view/transactionsChart/model/externalActions'
import {updateBankAccountsAction} from './bankAccountsAtom'
import {updateCategoriesAction} from './categoriesAtom'
import {updateTransactionsAction} from './transactionsAtom'

type MainSpaceDataType = 'categories'|'transactions'|'chart'|'bankAccounts'
type UpdateMainSpaceDataPayload = Array<MainSpaceDataType>

export const updateMainSpaceDataAction = declareAloneAction<UpdateMainSpaceDataPayload|void>(async (
	store,
	types,
) => {
	const typesSet: Set<MainSpaceDataType> = new Set(types || ['categories', 'transactions', 'chart', 'bankAccounts'])
	await Promise.all([
		typesSet.has('categories') && updateCategoriesAction(store),
		typesSet.has('transactions') && updateTransactionsAction(store),
		typesSet.has('chart') && updateChartDataAction(store),
		typesSet.has('bankAccounts') && updateBankAccountsAction(store),
	])
})